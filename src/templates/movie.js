export const movieCard=(product)=>{
    const itemCard=`
    <div class = "product-item">
        <div class = "product-img">
            <img src = "${product.Poster}" alt = "product image">
        </div>
        <div class = "product-content">
            <h3 class = "product-name color">${product.Title}</h3>
            <span class = "product-category color">${product.Year}</span>
            <div class="price-detail">
                <p>$</p>
                <p class = "product-price color">10</p>
            </div>
            <p class="product-code color">${product.imdbID}</p>
        </div>
        <input type = "button" class = "btn add-to-cart" value="Add to cart">
    </div>
    `;
    return itemCard;
}