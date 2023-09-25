const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const nav_btn_responsive = document.getElementById("btn_nav_responsive");
const nav_contenedor_general = document.getElementById("nav_tag");

let estado_nav = false;

document.addEventListener("DOMContentLoaded", function(){
  if (localStorage.getItem("log") === null && sessionStorage.getItem("log") === null) { // compruebo si esta logeado.
    window.location = "login.html"; // lo mando al login.
  }
});


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// para el boton del nav movile
nav_btn_responsive.addEventListener("click", ()=>{
  if (estado_nav) {
    estado_nav = false;
    nav_contenedor_general.style.height = "50px";
  } else {
    estado_nav = true;
    nav_contenedor_general.style.height = "450px";
  }
});

// para solucionar un bug con el nav movile, a la hora de cambiar la medida de la ventana
// y tener abierto el nav movile al mismo tiempo.
window.addEventListener("resize", ()=>{
  if (window.innerWidth > 630) {
    nav_contenedor_general.style.height = "50px";
  }
})



document.addEventListener("DOMContentLoaded", () => {
// obtenemos el nombre de usuario que está en localStorage
	const userName = localStorage.getItem("usuario");


// obtenemos el div al que le vamos a agregar los tres botones (icono de perfil, nombre de usuario y carrito)
// como el metodo getElementsByClassName devuelve una lista espicificamos que vamos a trabajar solo con el primer elemento [0]
	const parentDivs = document.getElementsByClassName("navegador__menu_2")[0];
 

// usando innerHTML con Template strings (tipo ${}) le ponemos el usuario (nav) ya contenido de toda la sección con formato html.
	parentDivs.innerHTML = `
      <div class="navegador__menu_2__link" onclick="showMenuNav()"><span id="data">${userName}</span></div>
      <img class="d-flex align-items-center rounded-circle" onclick="showMenuNav()" id="img_user" src="img/user-Icon.png" alt="logo de usuario (menu de usuario)">
      <a href="cart.html" class="navegador__menu_2__link_carrito navegador__menu_2__press"><img class="h-100" src="img/carrito.png" alt="carrito de compras icon">Mi carrito</a>
      <a href="#" class="navegador__menu_2__link_modo navegador__menu_2__press"><input type="checkbox" id="modoNav" class="d-none"><label for="modoNav" onclick="selectMode()" class="navegador__menu_2__link_modo__check"></label><label for="modoNav" onclick="selectMode()" class="navegador__menu_2__link_modo__check__text">Modo</label></a>
      <a href="my-profile.html" class="navegador__menu_2__link_user navegador__menu_2__press"><img class="h-100" src="img/user-icon-naranja.png" alt="user icon">Mi perfil</a>
      <a href="#" class="navegador__menu_2__link_cerrarS navegador__menu_2__press" onclick="logOut()"><img class="h-100" src="img/cerrarSesion-icon.png" alt="cerrar sesion icon">Cerrar sesión</a>
	`;
});

function showMenuNav() {
  const menuItem = document.querySelectorAll(".navegador__menu_2__press");
  if (menuItem[0].style.transform === 'translateX(-170px)') {
    for (const item of menuItem) {
      item.style.transform = "translateX(170px)";
    }
  } else {
    for (const item of menuItem) {
      item.style.transform = "translateX(-170px)";
    }
  }
}

function selectMode() {
  const htmltag = document.getElementsByTagName("html")[0];
  htmltag.classList.toggle("modeDark");
  /*if (document.getElementById("modoNav").checked) {

  } else {

  }*/
}

function logOut() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("contraseña");
  localStorage.removeItem("usuario");
  localStorage.removeItem("log");
  sessionStorage.removeItem("log");
  window.location = "login.html";
}
/*================================================================MANDAR_AL_PRODUCTO_SELECCIONADO================================================================*/

function goToProductInfo(id) {
  localStorage.setItem("IdProducto", id);
  window.location = "product-info.html";
}