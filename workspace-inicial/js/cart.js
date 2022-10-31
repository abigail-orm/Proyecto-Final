const requestURL = 'https://japceibal.github.io/emercado-api/user_cart/' + "25801" + '.json';
var cartForm = document.getElementById('cartForm');

const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var subTotal = 0;
var valorEnvio = 15;

function calcSubtotal(event, id, cost){
    if (event.target.value < 1) {
        event.target.value = 1
    }
    document.getElementById(id.toString()).innerHTML = event.target.value * cost
    subTotal = event.target.value * cost
    updateTotals()
}

function updateTotals() {
    document.getElementById('subtotal').innerText = 'USD ' + subTotal
    let totalEnvio = subTotal * (valorEnvio / 100)
    document.getElementById('envio').innerText = 'USD ' + totalEnvio
    document.getElementById('total').innerText = 'USD ' + (subTotal + totalEnvio)

}

request.onload = function() {
    let data = request.response;

    data.articles.forEach(e => {
        let subtotal = e.count * e.unitCost
        subTotal += subtotal

        document.getElementById('cartTableBody').innerHTML += `
            <tr>
                <td><img src="${e.image}"></td>
                <td>${e.name}</td>
                <td>${e.unitCost}</td>
                <td><input value=${e.count} oninput="calcSubtotal(event, ${e.id}, ${e.unitCost})"></td>
                <td>${e.currency + " "}<span id="${e.id}">${subtotal}</span></td>
            </tr>
        `
    });
    updateTotals()
}

var tipos = document.cartForm.tipoEnvio;
for(var i = 0; i < tipos.length; i++) {
    tipos[i].onclick = function () {
        valorEnvio = this.value
        updateTotals()
    };
}

var metodosPago = document.metodospago.tipoPago;
for(var i = 0; i < metodosPago.length; i++) {
    metodosPago[i].onclick = function () {
        document.getElementById('numerotarjeta').disabled = this.value == "banco"
        document.getElementById('codigoseg').disabled = this.value == "banco"
        document.getElementById('vencimiento').disabled = this.value == "banco"
        document.getElementById('numerodecuenta').disabled = this.value == "credito"
    };
}

function checkValues(e){
    e.preventDefault()
    let error = false
    if (document.getElementById("tarjetacredito").checked) {
        var val1 = document.getElementById("numerotarjeta").value == '';
        var val2 = document.getElementById("codigoseg").value == '';
        var val3 = document.getElementById('vencimiento').value == '';
        if (val1 && val2 && val3) {
            error = true
        }
    } else if(document.getElementById("transferenciabancaria").checked){
        if (document.getElementById('numerodecuenta').value == '') {
            error = true
        }
    }
    if (error) {
        document.getElementById('methodWarning').classList.remove('d-none')
        document.getElementById('methodWarning').classList.add('d-block')
    } else {
        document.getElementById("alert-success").classList.add("show");
    }
    
}
cartForm.addEventListener('submit', checkValues);

    
  