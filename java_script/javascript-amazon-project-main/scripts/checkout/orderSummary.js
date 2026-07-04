import { products,getProduct } from "../../data/products.js";
import { cart, removeFromcart, calculateCartQuantity, updatequantity, updatedeliveryOption } from "../../data/cart.js";
import { money } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOption.js";
import  {renderPayment} from "./paymentSummary.js"
export function renderOrdersummary() {
    let cartsummaryHtml = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProdt=  getProduct(productId);

        const deliveryOptionid = cartItem.deliveryOptionId
        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionid) {
                deliveryOption = option;
            }
        })

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryTime,
            'days'
        );
        const stringDate = deliveryDate.format('dddd MMMM D');

        cartsummaryHtml = cartsummaryHtml +
            `    
    <div class="cart-item-container js-cart-item-container-${matchingProdt.id}">
    <div class="delivery-date js-delivery-date">
    Delivery date: ${stringDate}
    </div>
    
    <div class="cart-item-details-grid">
    <img class="product-image"
    src="${matchingProdt.image}">
    
    <div class="cart-item-details">
    <div class="product-name">
    ${matchingProdt.name}
    </div>
    <div class="product-price">
    $${money(matchingProdt.priceCents)}
    </div>
    <div class="product-quantity">
    <span>
    Quantity: <span class="quantity-label js-quantity-label-${matchingProdt.id}">${cartItem.quantity}</span>
    </span>
                  <span class="update-quantity-link link-primary js-update-button" data-product-id='${matchingProdt.id}'>
                  Update
                  </span>
                  <input type="text" class="quantity-input js-quantity-input-${matchingProdt.id}" data-product-id='${matchingProdt.id}'>
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id='${matchingProdt.id}'>save</span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-product-id='${matchingProdt.id}'>
                  Delete
                  </span>
                  </div>
                  </div>
                  
                  <div class="delivery-options">
                  <div class="delivery-options-title">
                  Choose a delivery option:
                  </div>
                    ${deliveryOptionHtml(matchingProdt, cartItem)}
                  </div>
                  </div>
                  </div>`
    })

    document.querySelector('.js-order-summary').innerHTML = cartsummaryHtml

    document.querySelectorAll(".js-delete-button")
        .forEach((link) => {
            link.addEventListener("click", () => {
                const productId = link.dataset.productId;
                removeFromcart(productId)


                document.querySelector(`.js-cart-item-container-${productId}`).remove()
                updateCartquantity()
                renderPayment()
            })
        })
    // let cartQuantity = '0';
    function updateCartquantity() { 
        const cartQuantity = calculateCartQuantity()
        document.querySelector('.js-checkout-header-middle-section').innerHTML = `${cartQuantity} items`
    }
    updateCartquantity()

    document.querySelectorAll('.js-update-button')
        .forEach((link) => {
            link.addEventListener("click", () => {
                const productId = link.dataset.productId
                document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity')
                renderPayment()
            })
        })

    document.querySelectorAll('.js-save-quantity-link')
        .forEach((link) => {
            link.addEventListener("click", () => {
                const productId = link.dataset.productId;
                const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
                const newQuantity = Number(quantityInput.value)
                if (newQuantity < 0 || newQuantity >= 1000) {
                    alert('Quantity must be at least 0 and less than 1000');
                    return;
                }
                updatequantity(productId, newQuantity)

                const container = document.querySelector(
                    `.js-cart-item-container-${productId}`
                );
                container.classList.remove('is-editing-quantity');

                const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)
                quantityLabel.innerHTML = newQuantity;

                quantityInput.value = '';
                updateCartquantity()
                renderPayment()
            })
        })


    function deliveryOptionHtml(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();

            const deliveryDate = today.add(
                deliveryOption.deliveryTime,
                'days'
            );

            const stringDate = deliveryDate.format('dddd MMMM D');

            const priceString =
                deliveryOption.priceCents === 0
                    ? 'FREE'
                    : `$${money(deliveryOption.priceCents)}`;

            const ischecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
        <div class="delivery-option js-delivery-option"data-product-id=${matchingProduct.id}
                    data-delivery-option-id=${deliveryOption.id}>
            <input
                type="radio"
                ${ischecked ? 'checked' : ''}
                class="delivery-option-${matchingProduct.id}"
                name="delivery-option-${matchingProduct.id}">

            <div>
                <div class="delivery-option-date">
                    ${stringDate}
                </div>

                <div class="delivery-option-price">
                    ${priceString}
                </div>
            </div>
        </div>
        `;
        });

        return html;
    }

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener("click", () => {
                const { productId, deliveryOptionId } = element.dataset
                updatedeliveryOption(productId, deliveryOptionId)
                renderOrdersummary()
                renderPayment()
            })
        })
}

// renderOrdersummary()