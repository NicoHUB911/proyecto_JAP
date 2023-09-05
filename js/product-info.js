const url = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("IdProducto")}.json`;
let datosGenerales;

fetch(url)
    .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json(); // Convierte la respuesta en formato JSON.
    })
    .then(data => {
        datosGenerales = data; // para que se pueda acceder a los datos desde todas partes
        showProducto(data)
    })
    .catch(error => {
        console.error('Hubo un error:', error);
    }
);


// muestra la "informacion del producto"
function showProducto(datos) {
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
}

// muestra los comentarios del producto
function showComentarios(datos) {
    
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
