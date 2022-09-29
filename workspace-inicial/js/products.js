const catId = localStorage.getItem('catID')
const requestURL = 'https://japceibal.github.io/emercado-api/cats_products/' + catId.toString() + '.json';

const request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();
let allProducts = [];

request.onload = function() {
    allProducts = request.response.products;
    console.log(allProducts)
    showProductsList(allProducts);
}

function addFilter(){
    let minFilter = document.getElementById("rangeFilterCountMin").value
    let maxFilter = document.getElementById("rangeFilterCountMax").value
    filteredProdcuts = []
    if (minFilter && maxFilter) {
        allProducts.forEach(product => {
            if (product.cost >= minFilter && product.cost <= maxFilter) {
                filteredProdcuts.push(product)
            }
        });
    } else if (minFilter) { 
        allProducts.forEach(product => {
            if (product.cost >= minFilter) {
                filteredProdcuts.push(product)
            }
        });
    } else if (maxFilter) {
        allProducts.forEach(product => {
            if (product.cost <= maxFilter) {
                filteredProdcuts.push(product)
            }
        });
    }else{
        filteredProdcuts = allProducts
    }

    var orders = document.getElementsByName("options");
    var selectedOrder;

    orders.forEach( order => {
        if  (order.checked) {4
            selectedOrder = order.value;
        }
    });

    if (selectedOrder == 'priceDown') {
        filteredProdcuts.sort(function (a, b) {
            if (a.cost > b.cost) {
                return 1;
            }
            if (a.cost < b.cost) {
                return -1;
            }
            return 0;
        });
    } else if (selectedOrder == 'priceUp') {
        filteredProdcuts.sort(function (a, b) {
            if (a.cost > b.cost) {
              return -1;
            }
            if (a.cost < b.cost) {
              return 1;
            }
            return 0;
        })
    } else if (selectedOrder == 'rel') {
        filteredProdcuts.sort(function (a, b) {
            if (a.soldCount > b.soldCount) {
              return -1;
            }
            if (a.soldCount < b.soldCount) {
              return 1;
            }
            return 0;
        })
    }
    
    showProductsList(filteredProdcuts)
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showProductsList(products){
    let htmlContentToAppend = "";
    for(let i = 0; i < products.length; i++){
        let product = products[i];

            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
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

if (localStorage.getItem('catName')) {
    let catName = localStorage.getItem('catName')
    document.getElementById('catName').innerHTML = catName;
}