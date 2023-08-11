/**/ 
const user = document.getElementById("formulario__usuario");
const pass = document.getElementById("formulario__contraseña");
const aviso1 = document.getElementById("formulario__Aviso_user");
const aviso2 = document.getElementById("formulario__Aviso_pass");

document.getElementById("formulario").addEventListener("submit",(e)=>{
    e.preventDefault();
    if (user.value !== "" && pass.value !== "") {
        window.location = "index.html"
    } else if (user.value !== "") {
        aviso2.style.opacity = "1";
    }else if (pass.value !== "") {
        aviso1.style.opacity = "1";
    }else{
        aviso1.style.opacity = "1";
        aviso2.style.opacity = "1";
    }
});

user.addEventListener("click",()=>{
    aviso1.style.opacity = "0";
});
pass.addEventListener("focus",()=>{
    aviso2.style.opacity = "0";
});