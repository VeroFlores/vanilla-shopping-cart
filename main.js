const productList = document.querySelector('.items-container');
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
                    </div>
                    <input type = "button" class = "btn add-to-cart" value="Add to cart">
                </div>
            `;
        });
        productList.innerHTML = html;
        const clickedProduct=document.getElementsByName('.btn add-to-cart');
        console.log(clickedProduct);
        clickedProduct.addEventListener('click',()=>{

        })
    })
.catch(err => console.log(err))
