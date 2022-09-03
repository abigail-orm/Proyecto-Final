if (localStorage.getItem('email')) {
    let newEmail = localStorage.getItem('email')
    document.getElementById('email').innerHTML = newEmail;
}