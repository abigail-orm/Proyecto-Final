var form = document.getElementById("myForm");

function llenarCampos(e){
    e.preventDefault()
    var pas1 = document.getElementById("password").value;
    var mail = document.getElementById('email').value;

    if (pas1.length > 0 && mail.length > 0){
        window.location.pathname = '/home.html';
    } else{
        
    }
}

form.addEventListener('submit', llenarCampos);
