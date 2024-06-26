let productNameInput = document.getElementById('productName')
let productCategoryInput = document.getElementById('productCategory')
let productPriceInput = document.getElementById('productPrice')
let productDescInput = document.getElementById('productDesc')
let productImgInput = document.getElementById('productImg')
let products = []

if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'))
    displayProduct()
}
function addProduct() {
    let product = {
        name: productNameInput.value,
        category: productCategoryInput.value,
        price: productPriceInput.value,
        desc: productDescInput.value,
        img: productImgInput.files[0]?.name
    }
    products.push(product)

    localStorage.setItem('products', JSON.stringify(products))
    displayProduct()
}
function displayProduct() {

    let cartona = ""
    for (let i = 0; i < products.length; i++) {
        cartona += `
         <div class="col-md-3 gy-5">
                <div class="prod-img">
                    <img src="images/${products[i].img}" class="w-100" alt="">
                </div>
                <div class="prod-content">
                    <h6>${products[i].category}</h6>
                    <h5>${products[i].name}</h5>
                    <span>price:${products[i].price}</span>
                    <p>${products[i].desc}</p>
                    <button onclick="setValues(${i})" class="w-100 btn btn-outline-success my-2">update</button>
                    <button onclick="deleteItem(${i})" class="w-100 btn btn-outline-danger">Delete</button>
                    
                </div>
            </div>
            `


    }


    document.getElementById('demo').innerHTML = cartona
}

function deleteItem(index) {
    products.splice(index, 1)
    localStorage.setItem('products', JSON.stringify(products))
    displayProduct()
}
let superInder;
function setValues(index) {
    superIndex = index;
    document.getElementById('updateBtn').style.display = 'block'
    document.getElementById('addBtn').style.display = 'none'


    productNameInput.value = products[index].name
    productCategoryInput.value = products[index].category
    productPriceInput.value = products[index].price
    productDescInput.value = products[index].desc

}
function updateProduct() {

    document.getElementById('updateBtn').style.display = 'none'
    document.getElementById('addBtn').style.display = 'block'

    products[superIndex].name = productNameInput.value
    products[superIndex].category = productCategoryInput.value
    products[superIndex].price = productPriceInput.value
    products[superIndex].desc = productDescInput.value
    displayProduct()

    localStorage.setItem('products', JSON.stringify(products))

}

function search(inputValue) {
    let cartona = ""
    for (let i = 0; i < products.length; i++) {
        // if (products[i].name.toLowerCase().startwith(inputValue.toLowerCase()))
        if (products[i].name.toLowerCase().includes(inputValue.toLowerCase())) {
            cartona += `
        <div class="col-md-3 gy-5">
               <div class="prod-img">
                   <img src="images/${products[i].img}" class="w-100" alt="">
               </div>
               <div class="prod-content">
                   <h6>${products[i].category}</h6>
                   <h5>${products[i].name.toLowerCase().replace(inputValue, `<span>${inputValue}</span>`)}</h5>
                   <span>price:${products[i].price}</span>
                   <p>${products[i].desc}</p>
                   <button onclick="setValues(${i})" class="w-100 btn btn-outline-success my-2">update</button>
                   <button onclick="deleteItem(${i})" class="w-100 btn btn-outline-danger">Delete</button>
                   
               </div>
           </div>
           `
        }
    }
    document.getElementById('demo').innerHTML = cartona
}