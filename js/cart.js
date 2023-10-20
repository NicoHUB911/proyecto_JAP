const CART_TABLE = document.getElementById("cart-table-body");

/* Currencies Prices */
let uyu
/* ------------------ */

function displayCartItems() {

	listOfArticles = loadCart();

	CART_TABLE.innerHTML = "";
	CART_TABLE.parentElement.getElementsByTagName("caption")[0].innerHTML = `Hay ${listOfArticles.length} producto${listOfArticles.length != 1 ? "s " : " "}en su carrito.`;
	// se modifica la etiqueta "caption" de la tabla para mostrar el total de articulos en el carrito
	// show the total amount of different articles as table caption

	for (const article of listOfArticles) {
		/* ver si es pesos y si es cambiarlo a dolares con la fetch */
		let newPriceInUSD
		if (article.currency === "UYU") {
			newPriceInUSD = article.unitCost / uyu
		} else {
			newPriceInUSD = article.unitCost
		}

		CART_TABLE.innerHTML += `
		<tr class="align-middle change calculateCosts" id="${article.id}">
			<th scope="row" class="col-1"><img src="${article.image}" onclick="goToProductInfo(${article.id})" class="img-fluid cart__table__img" alt="${article.name}"></td>
			<td onclick="goToProductInfo(${article.id})">${article.name}</td>
			<td>${article.currency + " " + article.unitCost}</td>
			<td class="col-1"><input id="UI_amount" type="number" value="${article.count}" class="form-control" onchange="changeCount(${JSON.stringify(article).replaceAll('"', "'")})"  min=1></td>
			<td class="text-end"> USD <span class="subtotal">${newPriceInUSD.toFixed(2)}</span></td>
			<td class="col-1 text-center align-middle"><a href="#" title="Quitar este articulo del carrito." onclick="removeFromCart(${article.id})">&#10060;</a></td>
		</tr>
		`;
	};
	/* The api takes a few seconds to bring all the comments, so we put this here to make sure all the comments are loaded to change their class to dark */
	if (JSON.parse(localStorage.getItem('dark-light'))) {
		const divs = document.getElementsByClassName('change')
		for (const div of divs) {
			div.classList.add('dark-light')
		}
	}
};



/* on document load, calls function getJSONData() from init.js with the API URL which returns a promise, then calls displayCartItems() passing an object with the userID and a list of products in their cart.
Al cargar el documento html se llama a la funcion getJSONData() que fue declarada en init.js, se le pasa la URL de la API dada por JaP, y tomando la promesa que devuelve se llama a displayCartItems() con un objecto que contiene la id del usuario y un array con objetos (los productos en su carrito)
*/
document.addEventListener("DOMContentLoaded", async function () {
	await bringPeso();/* this bring the price of the dolar in pesos UYU */
	displayCartItems();
	calculateCosts();
});

const changeCount = (a) => {
	let item = document.getElementById(a.id)
	let newCount = item.querySelectorAll('input')[0].value
	let divSubtotal = item.querySelectorAll('.subtotal')[0]
	let newPriceInUSD
	if (a.currency === "UYU") {
		newPriceInUSD = a.unitCost / uyu
	} else {
		newPriceInUSD = a.unitCost
	}
	divSubtotal.innerHTML = `${(newPriceInUSD * newCount).toFixed(2)}`


	calculateCosts()
	updateItemCount(a.id, newCount);
}

function updateItemCount(_id, _count) {
	let localCart = loadCart();
	let i = localCart.findIndex((el) => el.id == _id);
	localCart[i].count = _count;
	localStorage.setItem('cart', JSON.stringify(localCart));
}


//Loads the cart 
function loadCart() {
	return cart = JSON.parse(localStorage.getItem('cart')) ?? [];
}


function removeFromCart(id) {
	if (id == '*') {
		localStorage.removeItem('cart')
		displayMessage("Se ha vaciado su carrito correctamente", "success");
	}
	else {
		let localCart = loadCart();
		let newCart = localCart.filter(function (el) { return el.id != id; });
		localStorage.setItem('cart', JSON.stringify(newCart));
		displayMessage("Se ha eliminado el producto del carrito.", "success");
	}
	displayCartItems();

}


// al hacer click en aquí se muestra el campo de observaciones y al al hacer click en en cancelar se oculta
const mostrarEnlace = document.getElementById("mostrarObservaciones");
const campoObservaciones = document.getElementById("campoObservaciones");
const parrafoObservaciones = document.getElementById("parrafoObservaciones");
const guardarBoton = document.getElementById("guardarObservaciones");
const cancelarTexto = document.getElementById("cancelarObservaciones");

// Agrega un evento de clic al enlace de "aqui" para mostrar el campo de observaciones y ocultar el parrafo
mostrarEnlace.addEventListener("click", function (event) {
	event.preventDefault();
	campoObservaciones.style.display = "block";
	parrafoObservaciones.style.display = "none";
});

// Agrega un evento de clic a "Cancelar" para ocultar el campo de observaciones y mostrar muevamente el parrafo
cancelarTexto.addEventListener("click", function (event) {
	event.preventDefault();
	campoObservaciones.style.display = "none";
	parrafoObservaciones.style.display = "block";
});


/*
//  guardar los datos cuando se haga clic en "Guardar" 
guardarBoton.addEventListener("click", function(event) {
  event.preventDefault(); 
  // lógica para guardar las observaciones
});

*/

function goToProductInfo(id) {
	localStorage.setItem("IdProducto", id);
	window.location = "product-info.html";
}
async function bringPeso() {
	const datatest = await getJSONData('https://open.er-api.com/v6/latest/USD')
	if (data.status = 'ok') {
		uyu = datatest.data.rates['UYU']
	}
}

//This function calculate the total of products and shippment


const calculateCosts = () => {
	let calculateCosts = document.getElementsByClassName('calculateCosts')
	let subtotal = document.getElementById('showSubtotal')
	let shipment = document.getElementById('ShowShipment')
	let total = document.getElementById('showTotal')

	/* Calculate subtotal */
	let priceWithUSD = 0
	for (const subtotales of calculateCosts) {
		priceWithUSD += Number(subtotales.querySelector('.subtotal').innerHTML)
	}
	/* Calculate Shipment */


	subtotal.innerHTML = "USD " + priceWithUSD.toFixed(2)

	let checkeds = document.querySelectorAll("[name=tipoEnvio]");
	let Shipping
	checkeds.forEach(e => {
		if (e.checked) {

			Shipping = (priceWithUSD * Number(e.value)).toFixed(2)
			shipment.innerHTML = "USD " + Shipping
		}
	})

	total.innerHTML = "USD " + (Number(Shipping) + Number(priceWithUSD)).toFixed(2)


}


//oculta el parrafo, deshabilita los campos dependiendo el metodo de pago seleccionado y lo muestra en la página

const creditCardRadio = document.getElementById("tarjetaCredito");
const bankTransferRadio = document.getElementById("transferencia");
const creditCard = document.getElementById("tarjetaPago");
const bankTransfer = document.getElementById("transferenciaPago");
const paragraph = document.getElementById("seleccionarPago");
const inputBankTransfer = [document.getElementById("numeroCuenta")];
const inputCreditCard = [document.getElementById("numTarjeta"), document.getElementById("codigoSeg"), document.getElementById("vencimiento")];
const buttonConfirm = document.getElementById("buttonform");
const formBuy = document.getElementById("formBuy"); // Se trae el formulario que embarca todos los inputs
let paymentMethod = true; //Se crea una variable para saber si esta cliqueado el radiobutton de creditCard del modal 
formBuy.addEventListener('submit', (e) => {
	e.preventDefault();
	e.stopPropagation();
	validate();
});
// Funcion para validar los campos del modal y del formulario en general 
function validate() {
	formBuy.classList.add("was-validated");
	formBuy.classList.remove("needs-validation");
	if (paymentMethod) {
		const errorMessage = document.getElementsByClassName("creditCard"); // Se traen los mensajes ocultos de error del modal

		for (let x = 0; x <= inputCreditCard.length - 1; x++) {


			if (inputCreditCard[x].value == null || inputCreditCard[x].value == "") { // si hay algun valor vacio dentro de la seccion selecionada:
				errorMessage[x].classList.remove("d-none");
				inputCreditCard[x].style.border = "1px solid red";
				paragraph.style.color = "red";

			}
		}
	} else if (!paymentMethod) {

	}
};

creditCardRadio.addEventListener("change", function () {
	creditCard.style.display = "block";
	bankTransfer.style.display = "none";
	paragraph.style.display = "none";
	for (const iterator of inputCreditCard) {
		iterator.setAttribute("required", "true");
	}
	inputBankTransfer[0].removeAttribute("required");
	paymentMethod = true;
});

bankTransferRadio.addEventListener("change", function () {
	creditCard.style.display = "none";
	bankTransfer.style.display = "block";
	paragraph.style.display = "none";
	paymentMethod = false;
	inputBankTransfer[0].setAttribute("required", "true");
	for (const iterator of inputCreditCard) {
		iterator.removeAttribute("required");
	}
});




// Habilitar campos desde el principio
inputCreditCard.forEach(campo => campo.disabled = false);
inputBankTransfer.forEach(campo => campo.disabled = true);

creditCardRadio.addEventListener("change", function () {
	inputCreditCard.forEach(campo => campo.disabled = false);
	inputBankTransfer.forEach(campo => campo.disabled = true);
});

bankTransferRadio.addEventListener("change", function () {
	inputCreditCard.forEach(campo => campo.disabled = true);
	inputBankTransfer.forEach(campo => campo.disabled = false);
});
