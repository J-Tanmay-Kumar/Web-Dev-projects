import { products } from "./data/product.js";

let productHtml = '';
 products.map((product)=>{
    productHtml  = productHtml+`
    <article class="product-card" data-product-id="sample-001">
          <div class="product-card__image-wrap">
            <span class="product-card__badge">New</span>
            <div class="product-card__image-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <span>Image</span>
            </div>
          </div>

          <div class="product-card__body">
            <span class="product-card__category">Audio</span>
            <h2 class="product-card__name">${product.name}</h2>

            <div class="product-card__rating">
              <span class="product-card__stars" aria-label="Rated 4.5 out of 5">★★★★☆</span>
              <span class="product-card__rating-count">(128)</span>
            </div>

            <div class="product-card__footer">
              <span class="product-card__price">
                ${product.price}
                <span class="product-card__price-original">$99.99</span>
              </span>
              <button type="button" class="btn btn-add-cart" data-add-to-cart>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Add
              </button>
            </div>
          </div>
        </article>

    `
    console.log(product.price)
 })

 document.querySelector('.js-products-grid').innerHTML=productHtml;