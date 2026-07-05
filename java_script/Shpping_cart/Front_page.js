import { products } from "./data/product.js";

let productHtml = '';
products.map((product) => {
  productHtml = productHtml + `
    <article class="product-card" data-product-id="${product.id}">
          <div class="product-card__image-wrap">
            <img class="product-image"
              src="${product.image}">
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
                $${product.price / 100}
                <span class="product-card__price-original">$99.99</span>
              </span>
              <button type="button" class="btn btn-add-cart" data-product-id='${product.id}'>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Add
              </button>
            </div>
          </div>
        </article>

    `
})

document.querySelector('.js-products-grid').innerHTML = productHtml;

const cart = []
let cartQuantity = 0;
document.querySelectorAll('.btn-add-cart')
  .forEach((button) => {
    const { productId } = button.dataset
    const productid = Number(productId)
    button.addEventListener("click", () => {
      document.querySelector('.js-cart-quantity').innerHTML = ++cartQuantity;
      let matchingItem;
      let matchingProdt;
      for (const product of products) {
        if (product.id === productid) {
          matchingProdt = product;
          cart.forEach((cartItem)=>{
            if(productid === cartItem.id){
              matchingItem = cartItem
            }
          })
        }
      }
      if(matchingItem){
        matchingItem.quantity++;
      }else{
        cart.push({ ...matchingProdt, quantity: 1 })
      }

      console.log(cart)
    })
  })

