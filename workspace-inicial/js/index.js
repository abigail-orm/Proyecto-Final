if (localStorage.getItem('email')) {
    let newEmail = localStorage.getItem('email')
    document.getElementById('email').innerHTML = newEmail;
}

function cerrarSesion(e) {
    localStorage.removeItem('email');
    window.location = "index.html"
}
