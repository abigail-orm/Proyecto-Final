var form = document.getElementById("myForm");

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function comprobarClave(e){
    e.preventDefault()
    var pas1 = document.getElementById("password1").value;
    var pas2 = document.getElementById("password2").value;

    if (pas1 == pas2){
        showAlertSuccess()
    } else{
        showAlertError()
    }
}

form.addEventListener('submit', comprobarClave);
