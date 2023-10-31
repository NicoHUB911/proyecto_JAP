

const inpNameOne = document.getElementById("inpName1");
const inpSurnameOne = document.getElementById("inpSurname1");
const inpEmail = document.getElementById("inpEmail");
const userName = document.getElementById("inpNameUser");

const form = document.getElementById("formMyPorfile");

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("log") === null && sessionStorage.getItem("log") === null) { // compruebo si esta logeado.
      window.location = "login.html"; // lo mando al login.
    }
  });




document.addEventListener("DOMContentLoaded" ,()=>{
    userName.value = localStorage.getItem("userName");
    inpNameOne.value = localStorage.getItem("name1");
    inpSurnameOne.value = localStorage.getItem("surName1");
    inpEmail.value = localStorage.getItem("email");
});



form.addEventListener("submit", (event)=>{
    event.preventDefault()
    event.stopPropagation()

    form.classList.add("was-validated");
    form.classList.remove("needs-validation");
    Validar();
});

function Validar() {
    if (inpNameOne.value !== "" && inpSurnameOne.value !== "" && inpEmail.value !== "" && userName.value !== "") {

        localStorage.setItem("userName", `${userName.value}`);
        localStorage.setItem("name1", `${inpNameOne.value}`);
        localStorage.setItem("surName1", `${inpSurnameOne.value}`);
        localStorage.setItem("email", `${inpEmail.value}`);
        displayMessage("Se han guardado sus datos correctamente", "success");
    }
}


//    form.classList.add("was-validated");
//form.classList.remove("needs-validation");
