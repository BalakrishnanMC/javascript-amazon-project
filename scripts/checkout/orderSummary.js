import {products} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://esm.sh/dayjs';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { myCart } from '../../data/cart.js';


function getProduct(productId){
  let matchingProduct;
  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;
    }
  });
  return matchingProduct;
}
export function renderOrderSummary(){
  let cartSummaryHTML='';
  myCart.cartItems.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    console.log(matchingProduct);
    let dateString ='';
    deliveryOptions.forEach((deliveryOption) => {
      if(deliveryOption.id === cartItem.deliveryOptionId){
        dateString = dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
      }
    });

    cartSummaryHTML+=`
      <div class="cart-item-container js-cart-container-${matchingProduct.getId()}">
        <div class="delivery-date js-delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.getImage()}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.getName()}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.getId()}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
    `
  });


  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        myCart.removeFromCart(productId);

        document.querySelector(`.js-cart-container-${productId}`).remove();

        renderPaymentSummary();
      });
    });


  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html='';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
      html+=`
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.getId()}" data-delivery-option-id="${deliveryOption.id}"">
              <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.getId()}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
            </div>
      `;
    });
    return html;
  }

  
  document.querySelectorAll('.js-delivery-option')
    .forEach((deliveryOption) => {
      deliveryOption.addEventListener('click', () => {
        const productId = deliveryOption.dataset.productId;
        const deliveryOptionId = deliveryOption.dataset.deliveryOptionId;
        const deliveryDays = deliveryOption.dataset.deliveryDays;
        myCart.updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    });
}