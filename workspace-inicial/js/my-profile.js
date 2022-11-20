let profileForm = document.getElementById("profile-form")

if (localStorage.getItem('email')) {
    let newEmail = localStorage.getItem('email')
    document.getElementById('mail').value = newEmail;

    if (localStorage.getItem('profileValues')){
        let profileValues = JSON.parse(localStorage.getItem('profileValues'))
        document.getElementById('name').value = profileValues.name;
        document.getElementById('secName').value = profileValues.secName;
        document.getElementById('lastname').value = profileValues.lastname;
        document.getElementById('secLastname').value = profileValues.secLastname;
        document.getElementById('number').value = profileValues.number;        
    }

}else{
    window.location = "index.html"
}

function saveValues() {
    let name = document.getElementById("name").value
    let secName = document.getElementById("secName").value
    let lastname = document.getElementById("lastname").value
    let secLastname = document.getElementById("secLastname").value
    let number = document.getElementById("number").value

    let profileValues = {
        name,
        secName,
        lastname,
        secLastname,
        number,
    }
    window.localStorage.setItem("profileValues", JSON.stringify(profileValues));
    
}

profileForm.addEventListener('submit', saveValues);