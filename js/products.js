const URL_PRODUCTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(URL_PRODUCTOS)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json(); // Convierte la respuesta en formato JSON.
  })
  .then(data => {
    // Aquí tienes acceso a los datos JSON en la variable "data".
    //console.log(data);  Muestra los datos en la consola para verificar.
    procesarDatos(data); // llamamos a prosesarDatos(datos) para manipular los datos.
  })
  .catch(error => {
    console.error('Hubo un error:', error);
});

function procesarDatos(data) {
    const productos = data.products; // accedemos dentro de data, al array de objetos que se llama products (los productos/objetos con todas sus propiedades).
    let contenido = "";
    // Aquí ponemos los datos en una variable string (con codigo html).
    for (const producto of productos) { // recorremos el array que tiene los productos (productos es el array y producto el objeto por el que esta pasando (algo asi como el indice: [n] )).
        contenido += `
                    <div onclick="setCatID(${data.catID})" class="main_productos__contenedor__carta">
                    <a class="main_productos__contenedor__carta__link" href="#">
                        <div class="main_productos__contenedor__carta__contenedorimg"><img src="${producto.image}" alt="${producto.name}" class="main_productos__contenedor__carta__contenedorimg__img"></div>
                        <div class="main_productos__contenedor__carta__contenido">
                            <h4 class="main_productos__contenedor__carta__contenido__titulo">${producto.name}</h4>    
                            <p class="main_productos__contenedor__carta__contenido__descripcion">${producto.description}</p>
                            <div class="main_productos__contenedor__carta__contenido__informacion">
                                <div class="main_productos__contenedor__carta__contenido__informacion__datos1">
                                    <small class="main_productos__contenedor__carta__contenido__informacion__datos__texto">${producto.cost} ${producto.currency}</small>
                                </div>
                                <div class="main_productos__contenedor__carta__contenido__informacion__datos2">
                                  <small class="main_productos__contenedor__carta__contenido__informacion__datos__texto">${producto.soldCount} Vendidos</small>
                                </div>
                            </div>
                        </div>
                      </a>
                    </div>
                    `
        document.getElementById("contenedor_productos").innerHTML = contenido; // aqui ponemos ese codigo html dentro del contenedor al que hacemos referencia.
    }
}