const URL_PRODUCTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(URL_PRODUCTOS)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json(); // Convierte la respuesta en formato JSON
  })
  .then(data => {
    // Aquí tienes acceso a los datos JSON en la variable "data"
    console.log(data); // Muestra los datos en la consola para verificar
    // Puedes llamar a una función para manipular los datos
    procesarDatos(data);
  })
  .catch(error => {
    console.error('Hubo un error:', error);
});

function procesarDatos(data) {
    // Aquí puedes realizar cualquier manipulación que necesites en los datos
    // Por ejemplo, supongamos que el JSON tiene un array llamado "usuarios"
    const productos = data.products;
    let contenido = "";
    
    for (const producto of productos) {
        contenido += `
            <div onclick="setCatID(${data.catID})" class="main_productos__contenedor__carta">
                <div class="main_productos__contenedor__carta__contenedorimg"><a class="" href="#"><img src="${producto.image}" alt="${producto.name}" class="main_productos__contenedor__carta__contenedorimg__img"></a></div>
                <div class="main_productos__contenedor__carta__contenido">
                    <h4 class="main_productos__contenedor__carta__contenido__titulo"><a class="main_productos__contenedor__carta__contenido__titulo__a" href="#">${producto.name}</a></h4>    
                    <p class="main_productos__contenedor__carta__contenido__descripcion">${producto.description}</p>
                    <div class="main_productos__contenedor__carta__contenido__informacion">
                        <div class="main_productos__contenedor__carta__contenido__informacion__datos1">
                            <span class="main_productos__contenedor__carta__contenido__informacion__datos__texto">${producto.cost} ${producto.currency}</span>
                        </div>
                        <div class="main_productos__contenedor__carta__contenido__informacion__datos2">
                            <span class="main_productos__contenedor__carta__contenido__informacion__datos__texto">${producto.soldCount} Vendidos</span>
                        </div>
                    </div>
                </div>
            </div>
            `
        document.getElementById("contenedor").innerHTML = contenido;
    }
}