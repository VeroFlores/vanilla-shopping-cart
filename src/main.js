import {cardView} from './templates/modal.js';
import {movieCard} from './templates/movie.js';
console.log(cardView);
const productList = document.querySelector('.items-container');
const cartContainer=document.querySelector('.modal-container');
const moviesSelected=document.querySelector('.movie-selected-list');
const addToCartButton=document.querySelector('.add-to-cart');
const buttonCart=document.querySelector('.cart-btn');
const closeButton=document.querySelector('.icon-btn');

fetch('http://www.omdbapi.com/?s=batman&apikey=ec1cdb39')
.then(res => res.json())
 .then(data =>{
        let html = '';
        data.Search.forEach(product => {
            html += movieCard(product);
        });
        productList.innerHTML = html;

        /*add to cart_*/
        
    })
.catch(err => console.log(err));

const purchaseProduct=(e)=>{
    if(e.target.classList.contains('add-to-cart')){
        let product = e.target.parentElement;
        getProductInfo(product);
    }
}
productList.addEventListener('click', purchaseProduct);

    /*get movie info after click movie card*/ 
const getProductInfo=(product)=>{
    const productInfo = {
        id: product.querySelector('.product-code').textContent,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price:parseInt( product.querySelector('.product-price').textContent)
    }
    saveProductInStorage(productInfo);
    modalCart(productInfo);
}

const saveProductInStorage=(item)=>{
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCart();
};
const getProductFromStorage=()=>{
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
}

const updateCart=()=>{
    const quantityCart=document.querySelector('.quantity-cart');
    console.log(quantityCart);
    const productsInCart=getProductFromStorage().length;
    console.log(updateCart);
    quantityCart.textContent=productsInCart;
    console.log(quantityCart);
}
const sumProducts=()=>{
    const sum=getProductFromStorage().reduce((acc,selectedMovie)=>acc+selectedMovie.price,0);
const payment=document.querySelector('.total-payment');
payment.textContent=sum;
}
console.log(sumProducts());
const modalCart=()=>{
getProductFromStorage().forEach((product)=>{
    const cartItem=document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML=cardView(product);
    moviesSelected.appendChild(cartItem);

})}
modalCart();
const deleteMovie=document.querySelector('.trash');
console.log(deleteMovie);

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
        let updatedProducts = getProductFromStorage().filter((filteredMovies)=>(filteredMovies.id!==deletedMovie))
        console.log(updatedProducts)
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        updateCart();
        sumProducts();
    }
        moviesSelected.addEventListener('click',deleteSelectedMovie);
buttonCart.addEventListener('click',()=>{
    cartContainer.style.display='block';
})
closeButton.addEventListener('click',()=>{
    cartContainer.style.display='none';
})
updateCart();