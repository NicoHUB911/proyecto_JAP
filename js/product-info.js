const url = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("IdProducto")}.json`;
const UrlComments = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("IdProducto")}.json`
let datosGenerales;
const btnSubmit=document.getElementById("btnSubmit");


//rehicimos el fetch para poder usarlo en funciones XD
async function fetchData(url){
    try{
        const request = await fetch(url)
        const resp = await request.json()
        return resp
    }catch(e){
        console.log('error' + e)
    }

};

// muestra la "informacion del producto"
async function showProducto() {
    const datos = await fetchData(url)
    datosGenerales = datos

    const container = document.getElementById("producto__info");
    container.innerHTML = 
    `
    <div class="producto_info__contenedor d-flex">
        <div class="producto_info__contenedor__imgCont">
            <div class="producto_info__contenedor__imgCont__imgprincipal">
                <img id="imgPrincipal" src="${datos.images[0]}" alt="imagen principal del producto">
            </div>
            <div class="producto_info__contenedor__imgCont__imgElegibles d-flex pt-2">
                <img onclick="changeImg(0)" src="${datos.images[0]}" alt="primer imagen del auto">
                <img onclick="changeImg(1)" src="${datos.images[1]}" alt="segunda imagen del auto">
                <img onclick="changeImg(2)" src="${datos.images[2]}" alt="tercera imagen del auto">
                <img onclick="changeImg(3)" src="${datos.images[3]}" alt="cuarta imagen del auto">
            </div>
        </div>
        <div class="producto_info__contenedor__informacion ms-5 p-3">
            <h1 class="producto_info__contenedor__informacion__titulo">${datos.name}</h1>
            <h2 class="producto_info__contenedor__informacion__precio">${datos.cost}<span>${datos.currency}</span></h2>
            <p class="producto_info__contenedor__informacion__descripcion"><b>Descripcion: </b>${datos.description}</p>
            <p class="producto_info__contenedor__informacion__otros"><small>Categoria: ${datos.category}</small><small>Vendidos: ${datos.soldCount}</small></p>
        </div>
    </div>
    `
    showComentarios()
}

// muestra los comentarios del producto, y las estrellas  llama a la funcion fetch y le hace un foreach y muestra todo, despues en el foreach llama a la funcion para mostrar las estrellas
async function showComentarios() {
    const divOpinion = document.getElementById('opiniones')
    const comments = await fetchData(UrlComments)
    comments.forEach(comment => {
        divOpinion.innerHTML += `
        <li class="list-group-item my-1" style="background-color:rgb(255,255,255,0);">
            <p><span class='fw-bold'>${comment.user} </span> - <span>${comment.dateTime}</span> - <span>${mostrarEstrellas(comment.score)}</span></p>
            <p><span>${comment.description}</p>
        </li>
        `
    });
}
// esta funcion repite las estrellas el numero de valoraciones que hay y si no hay 5 estrellas pone las vacias
function mostrarEstrellas(estrellas){
    const niceStars =  '<span class="fa fa-star checked"></span>'.repeat(estrellas) 
    const badStars = '<span class="fa fa-star"></span>'.repeat(5 - estrellas )
    return niceStars + badStars
}

// muestra los productos relacionados
function showRelacionados(datos) {
    // para proximas entregas
}

// cambia la imagen principal del producto
function changeImg(indice) {
    const img = document.getElementById("imgPrincipal");
    img.src = `${datosGenerales.images[indice]}`;
}

btnSubmit.addEventListener('click',()=>{
    const commentText=document.getElementById("UI_comment");
    const estrellas = document.getElementsByName("rating3"); // Traemos todos los radio button de las estrellas
    let estrellasSeleccionadas = ""; //Variable donde se va a guardar la cantidad de estrellas
    for (let i = 0; i < estrellas.length; i++) { // se recorre el arreglo de estrellas que se trajo para encontrar la seleccionada
        if (estrellas[i].checked) {
            estrellasSeleccionadas = estrellas[i].value;
          break; // Salir del bucle si se encuentra una seleccionado
        } 
    }
    uploadComment(commentText.value,estrellasSeleccionadas) // Se llama a la funcion encargada de cargar y mostrar el comentario y se le envian los datos recibidos.
    commentText.value=""
});

function uploadComment(comentario,estrellas){
/*Hola vicky como estas acordate que hay que ponerle tambien al comentario la fecha actual,
 creo que hay una forma facil de hacerlo pero no quise seguir avanzando para no acaparte mas */
 console.log(comentario,estrellas); // te deje un console log para que veas como te llegan los datos
}

showProducto()