document.addEventListener("DOMContentLoaded", function() {
  try {
    document.querySelector(".main_productos__contenedor__carta").addEventListener("click",()=>{
  
      window.location = "product-info.html";
    })    
  } catch (error) {
    
  }

  
  
  
  const catID = localStorage.getItem("catID"); // Obtener el catID del localStorage
  if (catID) {
    const URL_PRODUCTOS = `http://localhost:3000/api/category/${catID}`; // link del json con el catID especifico
    

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
        handleData(data); // llamamos a prosesarDatos(datos) para manipular los datos.
      })
      .catch(error => {
        console.error('Hubo un error:', error);
    });
  }
});

/*==========================================================================FILTROS==========================================================================*/

 /* traido de HTML */

/* input Filtro */
  let minPrice = document.getElementById('minPrice')
  let maxPrice = document.getElementById('maxPrice')
  let maxProductPrice = 0

  /* input rango */
  let minRange = document.getElementById('rangoMin')
  let maxRange = document.getElementById('rangoMax')
  /* Botones Filtro y Limpiar filtro */
  let filterBTN = document.getElementById('boton_Filtrar')
  let clearBTN = document.getElementById('boton_Limpiar')
  /* Botones otros Filtros */
  let sortAscBTN = document.getElementById('boton_menorAMayor')
  let sortDescBTN = document.getElementById('boton_mayorAMenor')
  let sortFeatured = document.getElementById('boton_relevancia')

localStorage.removeItem('prods')

  /* Cuando se cambia el input slider minimo se pone el valor en el input number  de arriba*/
  minRange.addEventListener('input',(e)=>{
    minPrice.value=e.target.value
  })
  /* Cuando se cambia el input slider maxProductPrice se pone el valor en el input number de arriba */
  maxRange.addEventListener('input',(e)=>{
      maxPrice.value= Math.floor(((100-e.target.value)*maxProductPrice)/100)
  })

  /* Cuando se hace clic en filtrar, corre esta evento  y filtra por el rango de los input slider se guarda en el
   localstorage para usarlo despues y se manda a hacer re-render*/
  filterBTN.addEventListener('click', () =>{
    let filteredProductList = JSON.parse(localStorage.getItem('prods')).filter((product) => product.cost >= minPrice.value && product.cost <= maxPrice.value);
    localStorage.setItem('filteredProducts', JSON.stringify(filteredProductList))
    handleData(filteredProductList)
  })

  /* Limpia todos los filtros, pone el rango max y min en 0 y limpia local storage productos filtrados y hace re-render */
  clearBTN.addEventListener('click', () =>{
    minRange.value = 0
    maxRange.value = 0
    maxPrice.value = maxProductPrice
    minPrice.value = 0
    searchField.value = "";
    localStorage.removeItem('filteredProducts')
    handleData(JSON.parse(localStorage.getItem('prods')))
  })

  /* ordena de mayor a menor con los productos filtrados o no filtrados si esta en el localstorage*/
  sortDescBTN.addEventListener('click',()=>{
    let newprods = JSON.parse(localStorage.getItem('prods')).sort((a,b) => {return a.cost - b.cost});
    
    if(JSON.parse(localStorage.getItem('filteredProducts'))){
      let newprods2 = JSON.parse(localStorage.getItem('filteredProducts')).sort((a,b) => {return a.cost - b.cost});
      handleData(newprods2)
      
    }else{
      handleData(newprods)
    }
  })
  /* ordena de menor a mayor con los productos filtrados o no filtrados si esta en el localstorage*/
  sortAscBTN.addEventListener('click',()=>{
    let newprods = JSON.parse(localStorage.getItem('prods')).sort((a,b) => {return b.cost - a.cost});
    if(JSON.parse(localStorage.getItem('filteredProducts'))){
      let newprods2 = JSON.parse(localStorage.getItem('filteredProducts')).sort((a,b) => {return b.cost - a.cost});
      handleData(newprods2)
      
    }else{
      handleData(newprods)
    }

  })
  /* ordena por relevancia (mas comprados) si esta en el localstorage, se filtra ese, sino, todos */
  sortFeatured.addEventListener('click',()=>{
    let newprods = JSON.parse(localStorage.getItem('prods')).sort((a,b) => {return b.soldCount - a.soldCount});
    if(JSON.parse(localStorage.getItem('filteredProducts'))){
      let newprods2 = JSON.parse(localStorage.getItem('filteredProducts')).sort((a,b) => {return b.soldCount - a.soldCount});
      handleData(newprods2)
      
    }else{
      handleData(newprods)
    }

  })

/*===============================================================================BUSCADOR===============================================================================*/

const searchField = document.getElementById('buscador');

// agregamos un evento input al campo de búsqueda que se activa cada vez que se introduce o se borra texto en el campo.
searchField.addEventListener('input', () => {
const searchTerm = searchField.value.toLowerCase().trim(); // Término de e búsquedan minúsculas sin espacios al principio y al final

let filteredArray = JSON.parse(localStorage.getItem('prods')); // Obtener todos los productos

// obtenemos los valores de los filtros de precio
const minPriceValue = minPrice.value !== '' ? parseFloat(minPrice.value) : 0;
const maxPriceValue = maxPrice.value !== '' ? parseFloat(maxPrice.value) : Infinity;

// filtramos por rango de precios
filteredArray = filteredArray.filter((product) => {
  return product.cost >= minPriceValue && product.cost <= maxPriceValue;
});

// Si hay término de búsqueda, filtramos por búsqueda
if (searchTerm) {
  filteredArray = filteredArray.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
  });
}

// llamamos a la funcion para mostrar los productos filtrados
handleData(filteredArray);
});

/*=======================================================================MOSTRAR_PRODUCTOS=======================================================================*/

function handleData(data) {
  /* Si esta funcion viene del fetch, trae data.prodcuts y se guarda en productos, si viene de otro lado,(otro evento) viene sin el products y se guarda en productos */
  let products  // accedemos dentro de data, al array de objetos que se llama products (los productos/objetos con todas sus propiedades).
  if(data.products){
    products = data.products;
	document.title = data.catName + " - eMercado";
  }else{
    products = data;
  }
  /* Si no estan los productos en el localstorage, se guardan en el localstorage */
    if(!localStorage.getItem('prods'))localStorage.setItem('prods', JSON.stringify(products))
    
  // Ordenar los productos por precio
  // let newprods = productos.sort((a,b) => {return a.cost -b.cost});
    let content = "";
    // Aquí ponemos los datos en una variable string (con codigo html).
    for (const product of products) { // recorremos el array que tiene los products (products es el array y product el objeto por el que esta pasando (algo asi como el indice: [n] )).
        content += `
                    <div onclick="goToProductInfo(${product.id})" class="main_productos__contenedor__carta change">
                    <a class="main_productos__contenedor__carta__link" href="#">
                        <div class="main_productos__contenedor__carta__contenedorimg"><img src="${convertToWebp(product.image)}" alt="${product.name}" class="main_productos__contenedor__carta__contenedorimg__img"></div>
                        <div class="main_productos__contenedor__carta__contenido change">
                            <h4 class="main_productos__contenedor__carta__contenido__titulo">${product.name}</h4>    
                            <p class="main_productos__contenedor__carta__contenido__descripcion change">${product.description}</p>
                            <div class="main_productos__contenedor__carta__contenido__informacion">
                                <div class="main_productos__contenedor__carta__contenido__informacion__datos1 ">
                                    <small class="main_productos__contenedor__carta__contenido__informacion__datos__texto ">${product.cost} ${product.currency}</small>
                                </div>
                                <div class="main_productos__contenedor__carta__contenido__informacion__datos2 ">
                                  <small class="main_productos__contenedor__carta__contenido__informacion__datos__texto">${product.soldCount} Vendidos</small>
                                </div>
                            </div>
                        </div>
                      </a>
                    </div>
                    `
      /* guarda el precio maxProductPrice de todos los productos */
      if(product.cost > maxProductPrice) {
        maxProductPrice = product.cost
        maxPrice.value = maxProductPrice
        maxRange.value =0
        minRange.max = maxProductPrice
      }
      document.getElementById("contenedor_productos").innerHTML = content; // aqui ponemos ese codigo html dentro del contenedor al que hacemos referencia.                  
    }
  /* Si no hay prods, se muestra que no hay prods */
  if(products.length === 0)document.getElementById("contenedor_productos").innerHTML = "<h3 class='my-5'>No hay productos</h3>"
}

/*================================================================MANDAR_AL_PRODUCTO_SELECCIONADO================================================================*/

function goToProductInfo(id) {
  localStorage.setItem("productId", id);
  window.location = "product-info.html";
}