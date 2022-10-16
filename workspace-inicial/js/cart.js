const requestURL = 'https://japceibal.github.io/emercado-api/user_cart/' + "25801" + '.json';

const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

function calcSubtotal(event, id, cost){
    document.getElementById(id.toString()).innerHTML = event.target.value * cost
}

request.onload = function() {
    let data = request.response;

    data.articles.forEach(e => {
        let subtotal = e.count * e.unitCost

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
}