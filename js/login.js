const user = document.getElementById("userName");
const pass = document.getElementById("contraseña");
const warning1 = document.getElementById("formulario__Aviso_user");
const warning2 = document.getElementById("formulario__Aviso_pass");
const checkboxFrom = document.getElementById("checkboxLogin");
const showPass = document.getElementById("icono2__ver_pass");

document.getElementById("formulario").addEventListener("submit",(e)=>{
    e.preventDefault(); // Evito que cuando se aprete el submit, se borre los textos de los inputs.
    if (user.value !== "" && pass.value !== "") {
        if (checkboxFrom.checked) {// Lo guarda aunque se cierre la ventana.
            localStorage.setItem("userName", `${user.value}`);
            localStorage.setItem("password", `${pass.value}`);
            localStorage.setItem("log", `true`);
        }else{// Lo guarda hasta que se cierre la ventana.
            sessionStorage.setItem("log", `true`);
        }
        window.location = localStorage.redirectedFrom ?? "index.html"// Redirijo al index.html si no hay una página guardada en localStorage
    } else if (user.value !== "") { // en los else siguientes muestro los cartelitos para especificar donde no se relleno.
        warning2.style.opacity = "1";
    }else if (pass.value !== "") {
        warning1.style.opacity = "1";
    }else{
        warning1.style.opacity = "1";
        warning2.style.opacity = "1";
    }
});

showPass.addEventListener("input", ()=>{
    (pass.type === "password") ? pass.type ="text" : pass.type = "password"
});

user.addEventListener("focus",()=>{ // oculto los avisos si se hace click en los inputs.
    warning1.style.opacity = "0";
});
pass.addEventListener("focus",()=>{
    warning2.style.opacity = "0";
});

document.addEventListener("DOMContentLoaded",()=>{
    const sendBTN = document.getElementById("boton");
    sendBTN.addEventListener('click',saveToLocal)
});
function saveToLocal() {
    const input = document.getElementById("userName");
    localStorage.setItem("userName", input.value);
  }