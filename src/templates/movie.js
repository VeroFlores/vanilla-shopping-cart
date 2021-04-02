export const movieCard=(product)=>{
    const price=20;
    const itemCard=`
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
    return itemCard;
}