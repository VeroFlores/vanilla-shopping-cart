// const cartContainer=document.querySelector('.cart-container');
// const buttonCart=document.querySelector('.cart-btn');
// const closeButton=document.querySelector('.icon-btn');
// console.log(buttonCart);
// buttonCart.addEventListener('click',()=>{
//     cartContainer.style.display='block';
//     const selectedMovies=JSON.parse(localStorage.getItem('products'));
//     console.log(selectedMovies);
//     selectedMovies.forEach((product)=>{
//         const viewItemModal=`
//         <img class="modal-img" src = "${product.imgSrc}" alt = "product image">
//         <div class = "cart-item-info">
//             <h3 class = "cart-item-name">${product.name}</h3>
//             <span class = "cart-item-price">${product.price}</span>
//         </div>
//         <button type = "button" value="${product.id}" class = "icon-btn trash">
//         <i class="far fa-trash-alt" ></i>
//         </button>
//     `;
//     const cartItem=document.createElement('div');
//     cartItem.classList.add('cart-item');
//     cartItem.innerHTML=viewItemModal;
//     cartContainer.appendChild(cartItem);
//     const deleteMovie=cartItem.querySelector('.trash');
//     console.log(deleteMovie);
//     const deleteSelectedMovie=(e)=>{
//         const deletedMovie=String(e.target.value);
//         console.log(e.target.tagName);
//         let cartItem;
//         if(e.target.tagName === "BUTTON"){
//             cartItem = e.target.parentElement;
//             cartItem.remove(); // this removes from the DOM only
//         } else if(e.target.tagName === "I"){
//             cartItem = e.target.parentElement.parentElement;
//             cartItem.remove(); // this removes from the DOM only
//         }
//         let updatedProducts = selectedMovies.filter((filteredMovies)=>(filteredMovies.id!==deletedMovie))
//         console.log(updatedProducts)
//         localStorage.setItem('products', JSON.stringify(updatedProducts));
//     }
//     deleteMovie.addEventListener('click',deleteSelectedMovie)
//     })
    
// })
// closeButton.addEventListener('click',()=>{
//     cartContainer.style.display='none';
// })