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
			<th scope="row" class="col-1"><img src="${convertToWebp(article.image)}" onclick="goToProductInfo(${article.id})" class="img-fluid cart__table__img" alt="${article.name}"></td>
			<td onclick="goToProductInfo(${article.id})">${article.name}</td>
			<td>${article.currency + " " + article.unitCost}</td>
			<td class="col-1"><input id="UI_amount" type="number" value="${article.count}" class="form-control" onchange="changeCount(${JSON.stringify(article).replaceAll('"', "'")})"  min=1></td>
			<td class="text-end"> USD <span class="subtotal">${newPriceInUSD.toFixed(2)}</span></td>
			<td class="col-1 text-center align-middle"><button class="border-1 rounded-1 border-danger d-flex p-2 ms-3" href="#" title="Quitar este articulo del carrito." onclick="removeFromCart(${article.id})"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#9b2222}</style><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button></td>
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
	document.getElementById("currency-placeholder").innerHTML = `Cotización del dólar: $ ${uyu.toFixed(2)}`;
};



/* on document load, calls function getJSONData() from init.js with the API URL which returns a promise, then calls displayCartItems() passing an object with the userID and a list of products in their cart.
Al cargar el documento html se llama a la funcion getJSONData() que fue declarada en init.js, se le pasa la URL de la API dada por JaP, y tomando la promesa que devuelve se llama a displayCartItems() con un objecto que contiene la id del usuario y un array con objetos (los productos en su carrito)
*/
document.addEventListener("DOMContentLoaded", async function () {
	if (localStorage.getItem("log") === null && sessionStorage.getItem("log") === null) { // compruebo si esta logeado.
		window.location = "login.html"; // lo mando al login.
		localStorage.setItem("redirectedFrom", "/cart.html")
    }
	UIRemark.value = localStorage.getItem("userRemark") ?? "";
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
	calculateCosts();
}

function clearForm() {
	localStorage.removeItem('cart');
	document.querySelectorAll("form").forEach(form => {
		form.classList.add("needs-validation");
		form.classList.remove("was-validated");
		form.reset()});
	displayCartItems();
	calculateCosts();
}


// al hacer click en aquí se muestra el campo de observaciones y al al hacer click en en cancelar se oculta
const showLink = document.getElementById("mostrarObservaciones");
const commentField = document.getElementById("campoObservaciones");
const UIRemark= document.getElementById("observaciones");
const commentParagraph = document.getElementById("parrafoObservaciones");
const saveBtn = document.getElementById("guardarObservaciones");
const cancelTxt = document.getElementById("cancelarObservaciones");

// Agrega un evento de clic al enlace de "aqui" para mostrar el campo de observaciones y ocultar el parrafo
showLink.addEventListener("click", function (event) {
	event.preventDefault();
	commentField.style.display = "block";
	commentParagraph.style.display = "none";
});

// Agrega un evento de clic a "Cancelar" para ocultar el campo de observaciones y mostrar muevamente el parrafo
cancelTxt.addEventListener("click", function (event) {
	event.preventDefault();
	commentField.style.display = "none";
	commentParagraph.style.display = "block";
});



//  guardar los datos cuando se haga clic en "Guardar" 
saveBtn.addEventListener("click", function(event) {
  event.preventDefault(); 
  localStorage.setItem("userRemark", UIRemark.value);
});



function goToProductInfo(id) {
	localStorage.setItem("productId", id);
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
const streetField = document.getElementById("calle");
const addressField = document.getElementById("numero");
const street2Field = document.getElementById("esquina");
const formBuy = document.getElementsByTagName("form"); // Se trae el formulario que embarca todos los inputs
let paymentMethod = true; //Se crea una variable para saber si esta cliqueado el radiobutton de creditCard del modal 
formBuy[0].addEventListener('submit', (e) => {
	e.preventDefault();
	e.stopPropagation();
	validate();
});
// Funcion para validar los campos del modal y del formulario en general 
function validate() {
	for (const iterator of formBuy) {
		iterator.classList.add("was-validated");
		iterator.classList.remove("needs-validation");
	}
	let requiredFields = streetField.value != "" && street2Field.value != "" && addressField.value != "";
	if(bankTransferRadio.checked || creditCardRadio.checked){
		paragraph.style.color="black"
		if (loadCart().length == 0){
			displayMessage("Debe tener un articulo en el carrito","danger");
		} else {
			if(requiredFields && bankTransferRadio.checked && inputBankTransfer.value !=""){
				displayMessage("Tu compra fue realizada con exito","success");
				clearForm();
			} else if (requiredFields && creditCardRadio.checked && inputCreditCard[0].value != "" && inputCreditCard[1].value != "" && inputCreditCard[2].value != ""){
				displayMessage("Tu compra fue realizada con exito","success");
				clearForm();
			} else {
				displayMessage("Hay campos que no pueden estar vacios","danger");
			}
		}
	} else {
		paragraph.style.color="red"
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
inputCreditCard.forEach(field => field.disabled = true);
inputBankTransfer.forEach(field => field.disabled = true);

creditCardRadio.addEventListener("change", function () {
	inputCreditCard.forEach(field => field.disabled = false);
	inputBankTransfer.forEach(field => field.disabled = true);
});

bankTransferRadio.addEventListener("change", function () {
	inputCreditCard.forEach(field => field.disabled = true);
	inputBankTransfer.forEach(field => field.disabled = false);
});
