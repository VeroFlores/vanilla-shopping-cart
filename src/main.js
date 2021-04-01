const productList = document.querySelector('.items-container');


fetch('https://www.omdbapi.com/?s=batman&apikey=ec1cdb39')
.then(res => res.json())
 .then(data =>{
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
        const purchaseProduct=(e)=>{
            if(e.target.classList.contains('add-to-cart')){
                let product = e.target.parentElement;

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
            saveProductInStorage(productInfo);
        }
        const saveProductInStorage=(item)=>{
            let products = getProductFromStorage();
            products.push(item);
            localStorage.setItem('products', JSON.stringify(products));
        };
        const getProductFromStorage=()=>{
            return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
        }

        const quantityCart=document.createElement('p');
        const cartDetail=document.querySelector('.cart-detail');
        cartDetail.appendChild(quantityCart);
        quantityCart.textContent=getProductFromStorage().length;
    })
.catch(err => console.log(err));
const cartContainer=document.querySelector('.cart-container');

const buttonCart=document.querySelector('.cart-btn');
const closeButton=document.querySelector('.icon-btn');

buttonCart.addEventListener('click',()=>{
    cartContainer.style.display='block';
    const selectedMovies=JSON.parse(localStorage.getItem('products'));
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

    const deleteSelectedMovie=(e)=>{
        const deletedMovie=String(e.target.value);
        console.log(e.target.tagName);
        let cartItem;
        if(e.target.tagName === "BUTTON"){
            cartItem = e.target.parentElement;
            cartItem.remove(); 
        } else if(e.target.tagName === "I"){
            cartItem = e.target.parentElement.parentElement;
            cartItem.remove(); 
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