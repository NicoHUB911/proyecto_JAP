//mock user (to be replaced later)
//usuario provisto por JaP 
// const USER_CART = CART_INFO_URL + "25801" + EXT_TYPE;
const CART_TABLE = document.getElementById("cart-table-body");


// function displayCartItems(a){
function displayCartItems(a){
	/*
	let listOfArticles = a.articles;
	if (loadCart().length > 0){
		listOfArticles = listOfArticles.concat(loadCart());
	} */
	
	listOfArticles = loadCart() ?? [];

	CART_TABLE.innerHTML = "";
	CART_TABLE.parentElement.getElementsByTagName("caption")[0].innerHTML = `Hay ${listOfArticles.length} producto${listOfArticles.length != 1? "s " : " "}en su carrito.`;
	// se modifica la etiqueta "caption" de la tabla para mostrar el total de articulos en el carrito
	// show the total amount of different articles as table caption
	
	for (const article of listOfArticles){
		CART_TABLE.innerHTML += `
		<tr class="align-middle change" id="${article.id}">
			<th scope="row" class="col-1"><img src="${article.image}" onclick="goToProductInfo(${article.id})" class="img-fluid cart__table__img" alt="${article.name}"></td>
			<td onclick="goToProductInfo(${article.id})">${article.name}</td>
			<td>${article.currency + " " + article.unitCost}</td>
			<td class="col-1"><input id="UI_amount" type="number" value="${article.count}" class="form-control" onchange="changeCount(${JSON.stringify(article).replaceAll('"', "'")})"  min=1></td>
			<td class="text-end">${article.currency + " "} <span class="subtotal">${article.unitCost * article.count}</span></td>
			<td class="col-1 text-center align-middle"><a href="#" title="Quitar este articulo del carrito." onclick="removeFromCart(${article.id})">&#10060;</a></td>
		</tr>
		`;
	};
	/* The api takes a few seconds to bring all the comments, so we put this here to make sure all the comments are loaded to change their class to dark */
	if(JSON.parse(localStorage.getItem('dark-light'))){
		const divs = document.getElementsByClassName('change')
		for (const div of divs) {
		  div.classList.add('dark-light')
		}
	  }
	  };



/* on document load, calls function getJSONData() from init.js with the API URL which returns a promise, then calls displayCartItems() passing an object with the userID and a list of products in their cart.
Al cargar el documento html se llama a la funcion getJSONData() que fue declarada en init.js, se le pasa la URL de la API dada por JaP, y tomando la promesa que devuelve se llama a displayCartItems() con un objecto que contiene la id del usuario y un array con objetos (los productos en su carrito)
*/
document.addEventListener("DOMContentLoaded", function reload() {
    /*
	getJSONData(USER_CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            displayCartItems(resultObj.data)
        }
    }); */
	
	displayCartItems();
  });
  
const changeCount = (a) =>{
  let item = document.getElementById(a.id)
  let newCount = item.querySelectorAll('input')[0].value
  let divSubtotal = item.querySelectorAll('.subtotal')[0]
  divSubtotal.innerHTML = `${a.unitCost * newCount}`
}


//Loads the cart 
function loadCart() {
  return cart = JSON.parse(localStorage.getItem('cart')) ?? [];
  }


function removeFromCart(id){
	if (id=='*'){
		localStorage.removeItem('cart')
		displayMessage("Se ha vaciado su carrito correctamente", "success");
		}
	else {
		let localCart = loadCart();
		newCart = localCart.filter(function(el) { return el.id != id; });
		localStorage.setItem('cart',JSON.stringify(newCart));
		displayMessage("Se ha eliminado el producto del carrito.", "success");
	}
	window.document.dispatchEvent(new Event("DOMContentLoaded", {
		bubbles: true,
	}));
	
}

// //Remove item from cart
// obj.removeItemFromCart = function(name) {
// 	for(var item in cart) {
// 	  if(cart[item].name === name) {
// 		cart[item].count --;
// 		if(cart[item].count === 0) {
// 		  cart.splice(item, 1);
// 		}
// 		break;
// 	  }
//   }
//   saveCart();
// }

// //Remove all items from cart
// obj.removeItemFromCartAll = function(name) {
//     for(var item in cart) {
//       if(cart[item].name === name) {
//         cart.splice(item, 1);
//         break;
//       }
//     }
//     saveCart();
//   }


//   // Count cart 
//   obj.totalCount = function() {
//     var totalCount = 0;
//     for(var item in cart) {
//       totalCount += cart[item].count;
//     }
//     return totalCount;
//   }



//   // Total cart
//   obj.totalCart = function() {
//     var totalCart = 0;
//     for(var item in cart) {
//       totalCart += cart[item].price * cart[item].count;
//     }
//     return Number(totalCart.toFixed(2));
//   }

//   $('.show-cart').on("change", ".text-end", function(event) {
// 	var name = $(this).data('name');
// 	var count = Number($(this).val());
//    shoppingCart.setCountForItem(name, count);
//    displayCart();
//  });
 
//  displayCart();

// al hacer click en aquí se muestra el campo de observaciones y al al hacer click en en cancelar se oculta
const mostrarEnlace = document.getElementById("mostrarObservaciones");
const campoObservaciones = document.getElementById("campoObservaciones");
const parrafoObservaciones = document.getElementById("parrafoObservaciones");
const guardarBoton = document.getElementById("guardarObservaciones");
const cancelarTexto = document.getElementById("cancelarObservaciones");

// Agrega un evento de clic al enlace de "aqui" para mostrar el campo de observaciones y ocultar el parrafo
mostrarEnlace.addEventListener("click", function(event) {
  event.preventDefault(); 
  campoObservaciones.style.display = "block"; 
  parrafoObservaciones.style.display = "none"; 
});

// Agrega un evento de clic a "Cancelar" para ocultar el campo de observaciones y mostrar muevamente el parrafo
cancelarTexto.addEventListener("click", function(event) {
  event.preventDefault(); 
  campoObservaciones.style.display = "none"; 
  parrafoObservaciones.style.display = "block"; 
});


/*
//  guardar los datos cuando se haga clic en "Guardar" 
guardarBoton.addEventListener("click", function(event) {
  event.preventDefault(); 
  // aquí va la lógica para guardar las observaciones
});

*/

function goToProductInfo(id) {
  localStorage.setItem("IdProducto", id);
  window.location = "product-info.html";
}