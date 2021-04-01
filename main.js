const productList = document.querySelector('.items-container');
console.log(productList)
fetch('http://www.omdbapi.com/?s=batman&apikey=ec1cdb39')
.then(res => res.json())
 .then(data =>{
     console.log(data);
        let html = '';
        const price=20;
        data.Search.forEach(product => {
            html += `
                <div class = "product-item">
                    <div class = "product-img">
                        <img src = "${product.Poster}" alt = "product image">
                    </div>
                    <div class = "product-content">
                        <h3 class = "product-name color">${product.Title}</h3>
                        <span class = "product-category color">${product.Year}</span>
                        <p class = "product-price color">$${price}</p>
                        <p class="product-code color">${product.imdbID}</p>
                    </div>
                    <input type = "button" class = "btn add-to-cart" value="Add to cart">
                </div>
            `;
        });
        productList.innerHTML = html;
        const selectedProduct = document.querySelectorAll('.add-to-cart');
        console.log(selectedProduct);
        function purchaseProduct(e){
            if(e.target.classList.contains('add-to-cart')){
                let product = e.target.parentElement;
                console.log(product);
                getProductInfo(product);
            }
        }
        productList.addEventListener('click', purchaseProduct);
        
        const getProductInfo=(product)=>{
            let productInfo = {
                id: product.querySelector('.product-code').textContent,
                imgSrc: product.querySelector('.product-img img').src,
                name: product.querySelector('.product-name').textContent,
                category: product.querySelector('.product-category').textContent,
                price: product.querySelector('.product-price').textContent
            }
            console.log(productInfo);
            saveProductInStorage(productInfo);
        }
        function saveProductInStorage(item){
            let products = getProductFromStorage();
            products.push(item);
            localStorage.setItem('products', JSON.stringify(products));
        }
        
        // get all the products info if there is any in the local storage
        function getProductFromStorage(){
            return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
            // returns empty array if there isn't any product info
        }
        // const clickedProduct=document.getElementsByName('.btn add-to-cart');
        // console.log(clickedProduct);
        // clickedProduct.addEventListener('click',()=>{
        // })
        // const listItems=document.createElement('div');
        // listItems.classList.add('items-container');
        // listItems.innerHTML=
    })
.catch(err => console.log(err))
const selectedProduct = document.querySelector('.btn add-to-cart');
console.log(selectedProduct);
