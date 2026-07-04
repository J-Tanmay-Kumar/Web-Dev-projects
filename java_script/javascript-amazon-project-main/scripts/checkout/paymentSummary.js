import { cart, calculateCartQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { renderOrdersummary } from "./orderSummary.js";
import { getdeliveryOption } from "../../data/deliveryOption.js";
import money from "../utils/money.js";


export function renderPayment() {
  let productPrice = 0;
  let paymentSummaryHtml = ''
  let deliveryPrice = 0;
  let totalBefore=0;
  let EstimatedTax=0;
  let total=0;
  let cartQuantity = calculateCartQuantity()
  cart.forEach((cartItem) => {
    const Prodt = getProduct(cartItem.productId)
    const deliveryOption = getdeliveryOption(cartItem.deliveryOptionId);
    deliveryPrice += deliveryOption.priceCents 
    productPrice += Prodt.priceCents * cartItem.quantity
  });
  totalBefore =deliveryPrice+(productPrice)
  EstimatedTax = (totalBefore*0.1)
  total = totalBefore+EstimatedTax;
  paymentSummaryHtml = paymentSummaryHtml + `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items:${cartQuantity}</div>
            <div class="payment-summary-money">$${money(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${money(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${money(totalBefore)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${money(EstimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${money(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
   `
  document.querySelector('.js-payment-summary').innerHTML= paymentSummaryHtml;
}
renderPayment()