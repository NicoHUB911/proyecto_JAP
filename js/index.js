document.addEventListener("DOMContentLoaded", function(){

    if (localStorage.getItem("log") === null && sessionStorage.getItem("log") === null) { // compruebo si esta logeado.
        window.location = "login.html"; // lo mando al login.
    }
    
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });
});

//localStorage.clear();    - Para borrar los localStorage