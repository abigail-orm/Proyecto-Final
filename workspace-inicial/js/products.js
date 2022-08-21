const requestURL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

const request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();
let products = [];

request.onload = function() {
    products = request.response.products;
    showProductsList();
}


  function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < products.length; i++){
        let product = products[i];

            htmlContentToAppend += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted">${product.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        //}
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }

  }