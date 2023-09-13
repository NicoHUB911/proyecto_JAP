const PRODUCT_ID = localStorage.getItem("IdProducto");
const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${PRODUCT_ID}.json`;
const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${PRODUCT_ID}.json`;
const UI_SUBMIT_BUTTON = document.getElementById("btnSubmit");
let apiData;


//se rehízo el fetch para poder usarlo en otras funciones
async function fetchData(_url){
    try{
        const request = await fetch(_url)
        const resp = await request.json()
        return resp
    }catch(e){
        console.log('error' + e)
    }

};

// muestra la informacion del producto y crea un modal de bootsrap para poder mostrar las imagenes más grandes si el usuario hace click en la imagen principal
async function showProductInfo() {
    const objectProduct = await fetchData(PRODUCT_URL);
    apiData = objectProduct;
	const modalContainer = document.getElementById("img-modal");
    const container = document.getElementById("product__info");
	
	modalContainer.innerHTML = `
	    <div class="modal-header">
			<h1 class="modal-title fs-5">${objectProduct.name} \> imágenes</h1>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
		</div>
		<div class="modal-body">
			<div class="d-flex flex-wrap" >
				<div class="col-md-2">
					<div class="row g-0">
						<div class="col-3 col-md-12">
							<img onclick="changeModalImg(0)" class="img-thumbnail" src="${objectProduct.images[0]}" alt="primer imagen del producto">
						</div>
						<div class="col-3 col-md-12">
							<img onclick="changeModalImg(1)" class="img-thumbnail" src="${objectProduct.images[1]}" alt="segunda imagen del producto">
						</div>
						<div class="col-3 col-md-12">
							<img onclick="changeModalImg(2)" class="img-thumbnail" src="${objectProduct.images[2]}" alt="tercera imagen del producto">
						</div>
						<div class="col-3 col-md-12">
							<img onclick="changeModalImg(3)" class="img-thumbnail" src="${objectProduct.images[3]}" alt="cuarta imagen del producto">
						</div>
					</div>
				</div>
				<div class="col-12 col-md-10">
					<img id="main-modal-img" style="max-width:100%;"src="${objectProduct.images[0]}" alt="imagen principal del producto">
				</div>
			</div>
		</div>
	`
	
    container.innerHTML = 
    `
	<div class="producto_info__contenedor d-flex">
		<div class="producto_info__contenedor__imgCont">		
			<div class="producto_info__contenedor__imgCont__imgprincipal">
				<img data-bs-toggle="modal" data-bs-target="#fs-modal" id="imgPrincipal" src="${objectProduct.images[0]}" alt="imagen principal del producto">
			</div>
			<div class="producto_info__contenedor__imgCont__imgElegibles d-flex pt-2">
				<img onclick="changeImg(0)" src="${objectProduct.images[0]}" alt="primer imagen del producto">
				<img onclick="changeImg(1)" src="${objectProduct.images[1]}" alt="segunda imagen del producto">
				<img onclick="changeImg(2)" src="${objectProduct.images[2]}" alt="tercera imagen del producto">
				<img onclick="changeImg(3)" src="${objectProduct.images[3]}" alt="cuarta imagen del producto">
			</div>
		</div>

        <div class="producto_info__contenedor__informacion ms-5 p-3">
            <h1 class="producto_info__contenedor__informacion__titulo">${objectProduct.name}</h1>
            <h2 class="producto_info__contenedor__informacion__precio"><span>${objectProduct.currency}:</span> ${objectProduct.cost}</h2>
            <p class="producto_info__contenedor__informacion__descripcion"><b>Descripcion: </b>${objectProduct.description}</p>
            <p class="producto_info__contenedor__informacion__otros"><small>Categoria: <a href="products.html">${objectProduct.category}</a></small><small>Vendidos: ${objectProduct.soldCount}</small></p>
        </div>
	</div>

    `
	

    displayComments()
}

/* muestra los comentarios del producto incluyendo las estrellas, llama a la funcion fetch dentro de un bloque try
Si hay error muestra en el espacio de los comentarios que no se pudieron cargar los mismos.
En caso contrario, ordena el array de mas reciente a mas antiguo y le hace un foreach para mostrar todos,
con template strings se llama a la funcion displayRating para mostrar las estrellas
*/
async function displayComments() {
    const divOpinion = document.getElementById('opiniones');
	divOpinion.innerHTML= "";	
	let APIcomments = [];
	
	try { 
		APIcomments = await fetchData(COMMENTS_URL); 
	}
	catch (e) {console.log("Error cargando comentarios: ", e)};
	
    let comments = (JSON.parse(localStorage.getItem(`${PRODUCT_ID}_user_comments`))) || [];
	
	if(APIcomments) {
		comments = comments.concat(APIcomments.sort((a, b) => {return new Date(b.dateTime) - new Date(a.dateTime)}));
		comments.forEach(comment => {
			divOpinion.innerHTML += `
			<li class="list-group-item" style="background-color:rgb(255,255,255,0);">
				<p><span class='fw-bold'>${comment.user} </span> - <span>${comment.dateTime}</span> - <span class="text-nowrap">${displayRating(comment.score)}</span></p>
				<p class="text-break"><span>${comment.description}</p>
			</li>
			`
		});
	} else {
		divOpinion.innerHTML += `
			<li class="list-group-item" style="background-color:#ff6054;">
			<h2>Hubo un error cargando los commentarios.</h2></li>
		`;
	}
}

// esta funcion repite las estrellas el numero de valoraciones que hay y si no hay 5 estrellas pone las vacias
function displayRating(rating){
    const checkedStars =  '<span class="fa fa-star checked"></span>'.repeat(rating) ;
    const uncheckedStars = '<span class="fa fa-star"></span>'.repeat(5 - rating );
    return checkedStars + uncheckedStars;
}

// muestra los productos relacionados
function showRelated(_param) {
    // para proximas entregas
}

// cambia la imagen principal del producto
function changeImg(i) {
    const img = document.getElementById("imgPrincipal");
    img.src = `${apiData.images[i]}`;
}

// cambia la imagen del modal
function changeModalImg(i) {
    const img = document.getElementById("main-modal-img");
    img.src = `${apiData.images[i]}`;
}


UI_SUBMIT_BUTTON.addEventListener('click',()=>{
    const commentText=document.getElementById("UI_comment");
    const starsNumber = document.getElementsByName("rating3"); // Traemos todos los radio button de las estrellas
    let selectedStars = ""; //Variable donde se va a guardar la cantidad de estrellas
    for (let i = 0; i < starsNumber.length; i++) { // se recorre el arreglo de estrellas que se trajo para encontrar la seleccionada
        if (starsNumber[i].checked) {
            selectedStars = starsNumber[i].value;
          break; // Salir del bucle si se encuentra una seleccionado
        } 
    }
    uploadComment(commentText.value, selectedStars) // Se llama a la funcion encargada de cargar y mostrar el comentario y se le envian los objectProduct recibidos.
    commentText.value="";
    starsNumber[0].checked=true; //Se resetean las estrellas y el textarea del comentario
});

function uploadComment(message, rating){
	
  // se obtiene fecha actual y se le da el formato que tienen los demás comentarios. Se usa la función padStart para asegurarnos que tengan 2 digitos.
  const uploadDate = new Date();
  
  const formattedDate = `
		${uploadDate.getFullYear()}-${(uploadDate.getMonth() +1).toString().padStart(2, "0")}-${uploadDate.getDate().toString().padStart(2, "0")}
		${uploadDate.getHours().toString().padStart(2, "0")}:${uploadDate.getMinutes().toString().padStart(2, "0")}:${uploadDate.getSeconds().toString().padStart(2, "0")}
  `

  // Nuevo comentario HTML
   
  const commentObject = {
	product: PRODUCT_ID,
    user: localStorage.getItem("usuario"),
    dateTime: formattedDate,
    description: message,
    score: rating,
  };

  // Obtenemos comentarios del storage o lo incializamos vacio si no hay comentarios guardados
  const storedComments = JSON.parse(localStorage.getItem(`${PRODUCT_ID}_user_comments`)) || [];

  // Agregamos el nuevo comentario a los existentes, se usa unshift para que se agrege al principio y queden todos los comentarios ordenados por fecha
  storedComments.unshift(commentObject);

  // Guardamos en el localStorage
  localStorage.setItem(`${PRODUCT_ID}_user_comments`, JSON.stringify(storedComments));

 
  displayComments();
}

showProductInfo();