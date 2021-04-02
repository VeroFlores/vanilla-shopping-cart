export const cardView=(product)=>{
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
    return viewItemModal;
}