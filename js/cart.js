//mock user (to be replaced later)
//usuario provisto por JaP 
const USER_CART = CART_INFO_URL + "25801" + EXT_TYPE;
const CART_TABLE = document.getElementById("cart-table-body");


function displayCartItems(a){
	const listOfArticles = a.articles;
	
	CART_TABLE.parentElement.getElementsByTagName("caption")[0].innerHTML = `Hay ${listOfArticles.length} producto${listOfArticles.length > 1? "s " : " "}en su carrito`;
	// se modifica la etiqueta "caption" de la tabla para mostrar el total de articulos en el carrito
	// show the total amount of different articles as table caption
	
	for (const article of listOfArticles){
		CART_TABLE.innerHTML += `
		<tr class="align-middle" id="${article.id}">
			<th scope="row" class="col-1"><img src="${article.image}" class="img-fluid cart__table__img" alt="${article.name}"></td>
			<td>${article.name}</td>
			<td>${article.currency + " " + article.unitCost}</td>
			<td class="col-1"><input id="UI_amount" type="number" value="${article.count}" class="form-control" onchange="changeCount(${JSON.stringify(article).replaceAll('"', "'")})"  min=1></td>
			<td class="text-end">${article.currency + " "} <span class="subtotal">${article.unitCost * article.count}</span></td>
		</tr>
		`;
		
	};
};



/* on document load, calls function getJSONData() from init.js with the API URL which returns a promise, then calls displayCartItems() passing an object with the userID and a list of products in their cart.
Al cargar el documento html se llama a la funcion getJSONData() que fue declarada en init.js, se le pasa la URL de la API dada por JaP, y tomando la promesa que devuelve se llama a displayCartItems() con un objecto que contiene la id del usuario y un array con objetos (los productos en su carrito)
*/
document.addEventListener("DOMContentLoaded", function() {
   // loadCart()

    getJSONData(USER_CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            displayCartItems(resultObj.data)
        }
    });
  });
  
const changeCount = (a) =>{
  let item = document.getElementById(a.id)
  let newCount = item.querySelectorAll('input')[0].value
  let divSubtotal = item.querySelectorAll('.subtotal')[0]
  divSubtotal.innerHTML = `${a.unitCost * newCount}`
}

/* formato del objeto para referencia (usar estas keys cuando se guarde en local storage)

count: 1  (number)
currency: "USD" (string)
id: 50924 (number)
image: "img/prod50924_1.jpg" (string)
name: "Peugeot 208" (string)
unitCost: 15200 (number)


*/

//Loads the cart 
function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart'));
  if (cart.length != 0){
    displayCartItems(cart);
  }
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