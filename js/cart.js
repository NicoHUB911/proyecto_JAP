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
		<tr class="align-middle">
			<th scope="row" class="col-1"><img src="${article.image}" class="img-fluid cart__table__img" alt="${article.name}"></td>
			<td>${article.name}</td>
			<td>${article.currency + " " + article.unitCost}</td>
			<td class="col-1"><input id="UI_amount" type="number" value="${article.count}" class="form-control" min=1></td>
			<td class="text-end">${article.currency + " "} ${article.unitCost * article.count}</td>
		</tr>
		`;
		
	};
};



/* on document load, calls function getJSONData() from init.js with the API URL which returns a promise, then calls displayCartItems() passing an object with the userID and a list of products in their cart.
Al cargar el documento html se llama a la funcion getJSONData() que fue declarada en init.js, se le pasa la URL de la API dada por JaP, y tomando la promesa que devuelve se llama a displayCartItems() con un objecto que contiene la id del usuario y un array con objetos (los productos en su carrito)
*/
document.addEventListener("DOMContentLoaded", function() {
    getJSONData(USER_CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            displayCartItems(resultObj.data)
        }
    });
  });
  
  
  
/* formato del objeto para referencia (usar estas keys cuando se guarde en local storage)

count: 1  (number)
currency: "USD" (string)
id: 50924 (number)
image: "img/prod50924_1.jpg" (string)
name: "Peugeot 208" (string)
unitCost: 15200 (number)


*/


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





