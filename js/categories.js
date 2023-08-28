const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


function setCatID(id) { // establece el catID para poder mostrar en productos los... de la categoria que se desea
    localStorage.setItem("catID", id);
    window.location = "products.html"  // lo mandas al products.html
}

/*________________________________________________para_abajo_estan_el_tema_de_los_filtros________________________________________________*/

// funcion que te verifica si esta activado el filtro de mincount
// y maxcount ( y lo filtra ). Lo termina mostrando en el contenedor cat-list-container.
function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}


function showSearchedCategoriesList(categories){

    let htmlContentToAppend = "";
    for(let i = 0; i < categories.length; i++){
        let category = categories[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}
function Buscar(valorDeBusqueda){
    if (valorDeBusqueda){
    const SearchedCategoriesArray=currentCategoriesArray.filter(categoria=>{
        const terminoDeBusqueda = valorDeBusqueda.toLowerCase();
        const nombre=categoria.name.toLowerCase();
        const descripcion=categoria.description.toLowerCase();
        /*Se pasa el valor de busqueda, asi como la descripcion y el nombre de la categoria 
        correspondiente a minisculas y se devuelven solo los articulos que coinciden */
        return nombre.includes(terminoDeBusqueda) || descripcion.includes(terminoDeBusqueda);
    });
    showSearchedCategoriesList(SearchedCategoriesArray); // se llama a una funcion para mostrar la busqueda en tiempo real.
} else{
    showCategoriesList(); // si no hay criterio de busqueda se muestran todas las categorias.
}
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
    const Buscador=this.getElementById("buscador");
    Buscador.addEventListener('input', ()=>{
        const Valor=Buscador.value.trim();
        Buscar(Valor);
    }); 

    document.getElementById("sortAsc").addEventListener("click", function(){ // si apretan el filtro de orden alfabetico...
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){ // si apretan el filtro alfabetico (alreves)...
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){ // si apretan el filtro de cantidad de productos...
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){ // limpia los campos de filtro
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){ // cuando le haga click al boton de filtrar...
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount); // transformo en valor numerico el minCount
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount); // transformo en valor numerico el maxCount
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});


// funcion para los filtros de cant de stock, 
// alfabetico y alfabetico alreves.
function sortCategories(criteria, array){ // recibe un criterio para ordenar y un array
    let result = []; // para guardar el resultado
    if (criteria === ORDER_ASC_BY_NAME){ // si el criterio es ordenarlos alfabeticamente...
        result = array.sort(function(a, b) { // lo guarda ordenado en result
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){ // si el criterio es ordenarlos alreves (del alfabeto)...
        result = array.sort(function(a, b) { // lo guarda ordenado en result
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){ // si el criterio es por la cantidad de stock...
        result = array.sort(function(a, b) {  // lo guarda ordenado en result
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result; // la funcion returna el result con el criterio con el que se haya ordenado.
}


// funcion para llamar a la funcion que ordena por los filtros 
//de cant de stock, alfabetico y alfabetico alreves.
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria; // guardamos el criterio para ordenar el array (categorias)

    if(categoriesArray != undefined){ // si categoriesArray (el array que nos pasan como parametro) no tiene valor
        currentCategoriesArray = categoriesArray; // currentCategoriesArray es un array bacio que definimos arriva del todo :)
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray); // usamos el array vacio dos veces (para pasarselo a la funcion que ordena todo)
                                                                                            // y para igualar el resultado que nos devuelve la funcion a el (currentCategoriesArray)
    //Muestro las categorías ordenadas
    showCategoriesList();
}