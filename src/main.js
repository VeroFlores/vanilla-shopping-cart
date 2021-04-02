import {cardView} from './templates/modal.js';
import {movieCard} from './templates/movie.js';
console.log(cardView);
const productList = document.querySelector('.items-container');

fetch('http://www.omdbapi.com/?s=batman&apikey=ec1cdb39')
.then(res => res.json())
 .then(data =>{
        let html = '';
        data.Search.forEach(product => {
            html += movieCard(product);
        });
        productList.innerHTML = html;
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
console.log(buttonCart);
buttonCart.addEventListener('click',()=>{
    cartContainer.style.display='block';
    const selectedMovies=JSON.parse(localStorage.getItem('products'));
    selectedMovies.forEach((product)=>{

    const cartItem=document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML=cardView(product);
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