const inpNameOne = document.getElementById("inpName1");
const inpNameTwo = document.getElementById("inpName2");
const inpSurnameOne = document.getElementById("inpSurname1");
const inpSurnameTwo = document.getElementById("inpSurname2");
const inpEmail = document.getElementById("inpEmail");
const inpPhone = document.getElementById("inpPhone");
const userName = document.getElementById("inpNameUser");

const form = document.getElementById("formMyPorfile");

// document.addEventListener("DOMContentLoaded", function () {
  // });




document.addEventListener("DOMContentLoaded" ,()=>{
	if (localStorage.getItem("log") === null && sessionStorage.getItem("log") === null) { // compruebo si esta logeado.
		window.location = "login.html"; // lo mando al login.
		localStorage.setItem("redirectedFrom", "my-profile.html"); // guardo la página para redireccionar desde el Login.
    }
	userName.value = localStorage.getItem("userName");
    inpNameOne.value = localStorage.getItem("name1");
    inpNameTwo.value = localStorage.getItem("name2");
    inpSurnameOne.value = localStorage.getItem("surName1");
    inpSurnameTwo.value = localStorage.getItem("surName2");
    inpEmail.value = localStorage.getItem("email");
    inpPhone.value = localStorage.getItem("phone");
	
	// si hay una imágen en localStorage la muestra en el apartado correspondiente
	if (localStorage.hasOwnProperty("userImage"))
		document.getElementById("img").src = localStorage.userImage;
});



form.addEventListener("submit", (event)=>{
    event.preventDefault()
    event.stopPropagation()

    form.classList.add("was-validated");
    form.classList.remove("needs-validation");
    validate();
});


// revisa si los campos requeridos no están vaciós.
function validate() {
    if (inpNameOne.value !== "" && inpSurnameOne.value !== "" && inpEmail.value !== "" && userName.value !== "") {

        // localStorage.setItem("userName", userName.value); // no se permite cambiar el nombre de usuario
        localStorage.setItem("name1", inpNameOne.value);
        localStorage.setItem("name2", inpNameTwo.value);
        localStorage.setItem("surName1", inpSurnameOne.value);
        localStorage.setItem("surName2", inpSurnameTwo.value);
        localStorage.setItem("email", inpEmail.value);
        localStorage.setItem("phone", inpPhone.value);
        displayMessage("Se han guardado sus datos correctamente", "success");
    }
}


// Cuando el usuario selecciona una imagen, esta se guarda y se muestra en el apartado correspondiente
function showImg(){
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(archivo);
      reader.onloadend = function() {
        document.getElementById("img").src = reader.result;
		localStorage.setItem("userImage", reader.result);
      }
    }
  }


//    form.classList.add("was-validated");
//form.classList.remove("needs-validation");
