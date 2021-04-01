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
        console.log(getProductFromStorage());
        // const clickedProduct=document.getElementsByName('.btn add-to-cart');
        // console.log(clickedProduct);
        // clickedProduct.addEventListener('click',()=>{
        // })
        // const listItems=document.createElement('div');
        // listItems.classList.add('items-container');
        // listItems.innerHTML=
    })
.catch(err => console.log(err));
const cartContainer=document.querySelector('.cart-container');
console.log(cartContainer);
// const cartModal=(product)=>{
//    const viewItemModal=`
//         <img src = "${product.imgSrc}" alt = "product image">
//         <div class = "cart-item-info">
//             <h3 class = "cart-item-name">${product.name}</h3>
//             <span class = "cart-item-category">${product.category}</span>
//             <span class = "cart-item-price">${product.price}</span>
//         </div>
//         <button type = "button" class = "cart-item-del-btn">
//             <i class = "fas fa-times"></i>
//         </button>
//     `;
//     const cartItem=document.createElement('div');
//     cartItem.innerHTML=viewItemModal;
//     cartContainer.appendChild(cartItem);


// }
const buttonCart=document.querySelector('.cart-btn');
const closeButton=document.querySelector('.icon-btn');
console.log(buttonCart);
buttonCart.addEventListener('click',()=>{
    cartContainer.style.display='block';
    const selectedMovies=JSON.parse(localStorage.getItem('products'));
    console.log(selectedMovies);
    selectedMovies.forEach((product)=>{
        const viewItemModal=`
        <img class="modal-img" src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-price">${product.price}</span>
        </div>
        <button type = "button" value="${product.id}" class = "icon-btn trash">
        <i class="far fa-trash-alt" ></i>
        </button>
    `;
    const cartItem=document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML=viewItemModal;
    cartContainer.appendChild(cartItem);
    const deleteMovie=cartItem.querySelector('.trash');
    console.log(deleteMovie);
    const deleteSelectedMovie=(e)=>{
        const deletedMovie=String(e.target.value);
        console.log(e.target.tagName);
        let cartItem;
        if(e.target.tagName === "BUTTON"){
            cartItem = e.target.parentElement;
            cartItem.remove(); // this removes from the DOM only
        } else if(e.target.tagName === "I"){
            cartItem = e.target.parentElement.parentElement;
            cartItem.remove(); // this removes from the DOM only
        }
        let updatedProducts = selectedMovies.filter((filteredMovies)=>(filteredMovies.id!==deletedMovie))
        console.log(updatedProducts)
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
    deleteMovie.addEventListener('click',deleteSelectedMovie)
    })
    
})
closeButton.addEventListener('click',()=>{
    cartContainer.style.display='none';
})