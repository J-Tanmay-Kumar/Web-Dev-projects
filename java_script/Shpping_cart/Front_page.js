import { products } from "./data/product.js";

// --- 1. STATE MANAGEMENT ---
const cart = [];
let cartQuantity = 0;

// --- 2. RENDER PRODUCTS GRID ---
let productHtml = '';
products.map((product) => {
  productHtml = productHtml + `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__image-wrap">
        <img class="product-image" src="${product.image}">
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
            $${(product.price / 100).toFixed(2)}
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
  `;
});
document.querySelector('.js-products-grid').innerHTML = productHtml;

// --- 3. HELPER FUNCTIONS (Calculations) ---
const updateCartQuantity = () => {
  cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
};

// --- 4. RENDER FUNCTIONS ---
const renderCart = () => {
  let cartHtml = '';
  cart.forEach((cartItem) => {
    cartHtml += `
      <div class="cart-line-item" data-cart-item-id="${cartItem.id}">
        <img src="${cartItem.image}" alt="${cartItem.name}" class="cart-line-item__image">
        
        <div class="cart-line-item__details">
          <p class="cart-line-item__name">${cartItem.name}</p>
          <p class="cart-line-item__price" data-cart-item-price>$${(cartItem.price / 100).toFixed(2)}</p>
          
          <div class="cart-line-item__qty-controls">
            <button type="button" class="cart-line-item__qty-btn-sub" data-qty-decrease="${cartItem.id}">−</button>
            <span class="cart-line-item__qty-value" data-cart-item-qty>${cartItem.quantity}</span>
            <button type="button" class="cart-line-item__qty-btn-add" data-qty-increase="${cartItem.id}">+</button>
          </div>
        </div>
        
        <button type="button" class="cart-line-item__remove" data-remove-item="${cartItem.id}" aria-label="Remove ${cartItem.name} from cart">
          ✕
        </button>
      </div>
    `;
  });
  
  document.querySelector('.js-cart-items').innerHTML = cartHtml;
  
  // Re-attach listeners to the fresh DOM nodes
  setupCartListeners();
};

const renderPayment = () => {
  // Calculate total price based on item quantity * item price
  const subtotalCents = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCents = cart.length > 0 ? 0 : 0; // Set flat or conditional shipping rate in cents if needed (e.g., 500 for $5.00)
  const totalCents = subtotalCents + shippingCents;

  // Single layout wrapper block for totals
  const renderPaymentHtml = `
    <div class="cart-summary__row">
      <span>Subtotal</span>
      <span data-cart-subtotal>$${(subtotalCents / 100).toFixed(2)}</span>
    </div>
    <div class="cart-summary__row">
      <span>Shipping</span>
      <span data-cart-shipping>$${(shippingCents / 100).toFixed(2)}</span>
    </div>
    <div class="cart-summary__row cart-summary__row--total">
      <span>Total</span>
      <span data-cart-total>$${(totalCents / 100).toFixed(2)}</span>
    </div>
    <button type="button" class="btn btn-checkout" data-checkout-btn ${cart.length === 0 ? 'disabled' : ''}>
      Proceed to Checkout
    </button>
  `;
          
  document.querySelector('.cart-summary').innerHTML = renderPaymentHtml;
};

// --- 5. INTERACTION & LISTENERS ---

// Product grid setup
document.querySelectorAll('.btn-add-cart').forEach((button) => {
  button.addEventListener("click", () => {
    const productId = Number(button.dataset.productId);
    const productData = products.find(p => p.id === productId);

    if (!productData) return;

    const matchingItem = cart.find(item => item.id === productId);

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      cart.push({ ...productData, quantity: 1 });
    }

    updateCartQuantity();
    renderCart();
    renderPayment();
  });
});

// Cart Controls Setup (called every time cart re-renders)
const setupCartListeners = () => {
  // Add item quantity
  document.querySelectorAll('.cart-line-item__qty-btn-add').forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = Number(button.dataset.qtyIncrease);
      const cartItem = cart.find(item => item.id === targetId);
      if (cartItem) {
        cartItem.quantity++;
        updateCartQuantity();
        renderCart();
        renderPayment();
      }
    });
  });

  // Decrease item quantity
  document.querySelectorAll('.cart-line-item__qty-btn-sub').forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = Number(button.dataset.qtyDecrease);
      const cartItem = cart.find(item => item.id === targetId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          // If drops to 0, remove it entirely
          const index = cart.findIndex(item => item.id === targetId);
          cart.splice(index, 1);
        }
        updateCartQuantity();
        renderCart();
        renderPayment();
      }
    });
  });

  // Remove item completely
  document.querySelectorAll('.cart-line-item__remove').forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = Number(button.dataset.removeItem);
      const index = cart.findIndex(item => item.id === targetId);
      if (index !== -1) {
        cart.splice(index, 1);
        updateCartQuantity();
        renderCart();
        renderPayment();
      }
    });
  });
};

// Initial Summary State load
renderPayment();