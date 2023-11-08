const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const RES_BOT = "responsesBot.json";
const nav_btn_responsive = document.getElementById("btn_nav_responsive");
const nav_main_container = document.getElementById("nav_tag");
let nav_status = false;


let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

// para el boton del nav movile
nav_btn_responsive.addEventListener("click", () => {
  const list = document.querySelector(".navegador__menu_1__lista");
  if (nav_status) {
    nav_status = false;
    list.style.display = "none";
    nav_main_container.style.height = "50px";
  } else {
    nav_status = true;
    list.style.display = "inline";
    nav_main_container.style.height = "260px";
  }
});

// para solucionar un bug con el nav movile, a la hora de cambiar la medida de la ventana
// y tener abierto el nav movile al mismo tiempo.
window.addEventListener("resize", () => {
  const listNav = document.querySelector(".navegador__menu_1__lista");
  if (window.innerWidth > 630) {
    nav_main_container.style.height = "50px";
    listNav.style.display = "flex";
  }else{
    listNav.style.display = "none";
  }
})

document.addEventListener("DOMContentLoaded", () => {
  // obtenemos el nombre de usuario que está en localStorage
  const userName = localStorage.getItem("userName");


  // obtenemos el div al que le vamos a agregar los tres botones (icono de perfil, nombre de usuario y carrito)
  // como el metodo getElementsByClassName devuelve una lista espicificamos que vamos a trabajar solo con el primer elemento [0]
  const parentDivs = document.getElementsByClassName("navegador__menu_2")[0];


  // usando innerHTML con Template strings (tipo ${}) le ponemos el ya contenido de toda la sección con formato html
  // We use bootstrap class to deploy the user menu
  parentDivs.innerHTML = `
  <div class="dropdown nav-item"> 
      <a class="btn btn-sm btn-warning dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><div class="navegador__menu_2__lista__link"><span id="data">${userName}</span></div></a>
      <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
            <li><a class="dropdown-item" style="cursor:pointer;"  id="btn-theme">Dark</a></li> 
            <li><a class="dropdown-item" style="cursor:pointer;" id="btn-logout">Cerrar sesión</a></li> 
      </ul>
  </div>
	`;

  // Logout button.
  const btnLogOut = document.getElementById("btn-logout");
  btnLogOut.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "login.html";
  })

  // Theme Button - Dark/light exchange
  const btnTheme = document.getElementById("btn-theme");
  btnTheme.addEventListener('click', () => {

    localStorage.setItem('dark-light', !JSON.parse(localStorage.getItem('dark-light')))

    themeChanger()
    if (JSON.parse(localStorage.getItem('dark-light'))) {
      document.getElementById('btn-theme').innerText = 'Light'
    } else {
      document.getElementById('btn-theme').innerText = 'Dark'
    }

  })
  // If you enter to another page of the web, this part of the code change the theme to dark or light mode, depends of the user selection.
  if (!localStorage.getItem('dark-light')) {
    localStorage.setItem('dark-light', false)
  }
  /* If in the local storage it's true, then it gets all the divs within that page that has the `change` class, and then changes the color */
  if (JSON.parse(localStorage.getItem('dark-light'))) {
    themeChanger()
  }

});
// This is the change theme function. Is used to toggle between dark and light themes
const themeChanger = () => {
  const divs = document.getElementsByClassName('change')
  for (const div of divs) {
    div.classList.toggle('dark-light')
    if (div.classList.contains('jumbotron') && div.classList.contains('dark-light')) {
      div.style.filter = "invert(90%)"
    } else {
      div.style.filter = "invert(0%)"
    }
    if (div.tagName === 'LI' && div.classList.contains('dark-light')) {
      div.style.border = "solid 1px white"
    } else {
      div.style.border = ""
    }
  }
  if (JSON.parse(localStorage.getItem('dark-light')) == false) {
    const divsToRemove = document.getElementsByClassName('dark-light')
    for (const divs of divsToRemove) {
      divs.classList.remove('dark-light')
    }
  }
}

function displayMessage(message, type) {
  const alertPlaceholder = document.getElementById('alert-placeholder');
  const wrapper = document.createElement('div');
  wrapper.innerHTML =
    `<div class="alert alert-${type} alert-dismissible" role="alert" style="z-index:2000;">
     <div>${message}</div>
     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>`;

  alertPlaceholder.append(wrapper);

  setTimeout(function () {
    alertPlaceholder.innerHTML = "";
  }, 5000);
}
//=======================================_LO_DEL_BOT_=========================================

// para poder mover al asistente/"bot"
const draggable = document.getElementById('draggable');
const botMenu = document.getElementById("respuestasBOT");
const checkBot = document.getElementById("checkMenuBot");
const labelBot = document.querySelector(".draggable__contenedor__label");
let offsetX, offsetY, isDragging = false;

draggable.addEventListener('mousedown', (e) => {
  e.preventDefault();
  offsetX = e.clientX - draggable.getBoundingClientRect().left;
  offsetY = e.clientY - draggable.getBoundingClientRect().top;
  isDragging = true;
  labelBot.style.cursor = 'grabbing';
});

// para poder seguir al mouse (bot)
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;
  draggable.style.left = x + 'px';
  draggable.style.top = y + 'px';
});

// para dejar de seguir al mouse (bot)
document.addEventListener('mouseup', () => {
  isDragging = false;
  labelBot.style.cursor = 'grab';
});

// para obtener las respuestas del bot
function getBotResponses() {
  return fetch("./js/responsesBot.json")
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Hubo un error:', error);
    });
}

// para mostrar las respuestas del bot
async function showBotResponses(idProd) {
  try {
    const data = await getBotResponses();
    const responses = Object.values(data);

    for (const response of responses) {
      if (response.id === idProd) {
        botMenu.innerHTML = `
          <button class="p-1" onclick="showButtonBOT()">←</button><br>
          ${response.response}
        `;
        break; // Termina el bucle una vez que se encuentre la respuesta
      }
    }
  } catch (error) {
    console.error('Hubo un error:', error);
  }
}

// para mostrar los botones del bot
function showButtonBOT() {
  botMenu.innerHTML = `
  <button onclick="showBotResponses(10)">¿Quienes somos?</button>
  <button onclick="showBotResponses(11)">¿Como me registro?</button>
  <button onclick="showBotResponses(12)">¿Algun beneficio para clientes frecuentes?</button>
  <button onclick="showBotResponses(13)">¿Ofrecen garantia en sus productos?</button>
  <button onclick="showBotResponses(14)">¿Cuáles son los costos de envío?</button>
  `
}

checkBot.addEventListener("change",()=>{
  if (botMenu.style.display === "none") {
    botMenu.style.display = "inline"; 
  } else {
    botMenu.style.display = "none";
  }
});

function convertToWebp(fnString){
	newName = fnString.slice(0, -3);
	newName += "webp";
	return newName;
}