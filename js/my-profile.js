const inpNameOne = document.getElementById("inpName1");
const inpNameTwo = document.getElementById("inpName2");
const inpSurnameOne = document.getElementById("inpSurname1");
const inpSurnameTwo = document.getElementById("inpSurname2");
const inpEmail = document.getElementById("inpEmail");
const inpPhone = document.getElementById("inpPhone");
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
    inpNameTwo.value = localStorage.getItem("name2");
    inpSurnameOne.value = localStorage.getItem("surName1");
    inpSurnameTwo.value = localStorage.getItem("surName2");
    inpEmail.value = localStorage.getItem("email");
    inpPhone.value = localStorage.getItem("phone");
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
        localStorage.setItem("name2", `${inpNameTwo.value}`);
        localStorage.setItem("surName1", `${inpSurnameOne.value}`);
        localStorage.setItem("surName2", `${inpSurnameTwo.value}`);
        localStorage.setItem("email", `${inpEmail.value}`);
        localStorage.setItem("phone", `${inpPhone.value}`);
        displayMessage("Se han guardado sus datos correctamente", "success");
    }
}

function showImg(){
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();
    if (archivo) {
      reader.readAsDataURL(archivo);
      reader.onloadend = function() {
        document.getElementById("img").src = reader.result;
        localStorage.setItem('img',reader.result)
      }
    }
  }
  
  if(localStorage.getItem('img')){
    document.getElementById("img").src = localStorage.getItem('img')
  }


//    form.classList.add("was-validated");
//form.classList.remove("needs-validation");


