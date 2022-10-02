const prodID  = localStorage.getItem('prodID')
const requestURL = 'https://japceibal.github.io/emercado-api/products/' + prodID.toString() + '.json';
const requestURLComments = 'https://japceibal.github.io/emercado-api/products_comments/' + prodID.toString() + '.json';

const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    let product = request.response;

    document.getElementById('name').innerHTML = product.name
    document.getElementById('precio').innerHTML = product.cost
    document.getElementById('descripcion').innerHTML = product.description
    document.getElementById('categoria').innerHTML = product.category
    document.getElementById('cant').innerHTML = product.soldCount
    imagesToAppend = ``
    product.images.forEach(e => {
        document.getElementById('imageContainer').innerHTML += `<img src="${e}" class="img-thumbnail" style="width: 200px;">`
    });
    console.log(product)
    product.relatedProducts.forEach(p => {
        document.getElementById('relatedProducts').innerHTML += `
            <div onclick="setProdID(${p.id})">
                <img src="${p.image}" class="img-thumbnail" style="width: 200px;">
                <p>${p.name}</p>
            </div>
        `
    })
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

const requestComments = new XMLHttpRequest();
requestComments.open('GET', requestURLComments);
requestComments.responseType = 'json';
requestComments.send();

requestComments.onload = function() {
    let comments = requestComments.response;
    scoreText = ""
    comments.forEach(e => {
        for (let i = 1; i <= 5; i++) {
            if (i <= e.score) {
                scoreText += `<span class="fa fa-star checked"></span>`
            }else{
                scoreText += `<span class="fa fa-star"></span>`
            }
        }
        document.getElementById('commentContainer').innerHTML += `
        <div>
            <h6>${e.user}</h6>
            ${scoreText}
            <h6>${e.dateTime}</h6>
            <p>${e.description}</p>
        </div>
        `
        scoreText = ""
    });
}
   