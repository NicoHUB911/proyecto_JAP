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


nav_btn_responsive.addEventListener("click", ()=>{
  if (estado_nav) {
    estado_nav = false;
    nav_contenedor_general.style.height = "50px";
  } else {
    estado_nav = true;
    nav_contenedor_general.style.height = "260px";
  }
});



document.addEventListener("DOMContentLoaded", () => {
// obtenemos el nombre de usuario que está en localStorage
	const userName = localStorage.getItem("usuario");


// obtenemos el div al que le vamos a agregar los tres botones (icono de perfil, nombre de usuario y carrito)
// como el metodo getElementsByClassName devuelve una lista espicificamos que vamos a trabajar solo con el primer elemento [0]
	const parentDivs = document.getElementsByClassName("navegador__menu_2")[0];
 

// usando innerHTML con Template strings (tipo ${}) le ponemos el ya contenido de toda la sección con formato html
	parentDivs.innerHTML = `
	<a id="img_carrito" class="d-flex align-items-center me-3 rounded-circle" href="#"><img class="h-100" src="img/carrito.png" alt="carrito de compras"></a>
      <a href="my-profile.html"><div class="navegador__menu_2__lista__link"><span id="data">${userName}</span></div></a>
      <a id="img_user" class="d-flex align-items-center rounded-circle" href="my-profile.html"><img class="h-100" src="img/user-Icon.png" alt="logo de usuario (menu de usuario)"></a>
	`;

});