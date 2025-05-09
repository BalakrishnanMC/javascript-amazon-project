import { getDeliveryOption } from "../../data/deliveryOptions.js"
import {getProduct, loadProducts} from '../../data/products.js'
import formatCurrency from "../utils/money.js";
import { myCart } from '../../data/cart.js';

export function renderPaymentSummary(){
  loadProducts(() => {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalProducts = 0;

    myCart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        productPriceCents+=product.priceCents * cartItem.quantity;
        shippingPriceCents+=deliveryOption.priceCents;
        totalProducts+=cartItem.quantity;
    });

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${totalProducts}):</div>
          <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(productPriceCents + shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency((productPriceCents + shippingPriceCents) * 0.1)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency((productPriceCents + shippingPriceCents) + ((productPriceCents + shippingPriceCents) * 0.1))}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `;
    
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    })
}

renderPaymentSummary();