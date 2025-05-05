import { cart, removeFromCart } from '../data/cart.js'
import { products } from '../data/products.js';
import formatCurrency from './utils/money.js';
import dayjs from 'https://esm.sh/dayjs';
import { deliveryOptions } from '../data/deliveryOptions.js';

//const deliveryDate = dayjs().add(0,'days').format('dddd, MMMM D');

let cartSummaryHTML='';

cart.forEach((cartItem) => {
  let matchingItem;
  products.forEach((product) => {
    if(product.id === cartItem.productId){
      matchingItem = product;
    }
  });

  let dateString ='';
  deliveryOptions.forEach((deliveryOption) => {
    if(deliveryOption.id === cartItem.deliveryOptionId){
      dateString = dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
    }
  });

  cartSummaryHTML+=`
    <div class="cart-item-container js-cart-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingItem.priceCents* cartItem.quantity)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingItem,cartItem)}
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
      removeFromCart(productId);
      document.querySelector(`.js-cart-container-${productId}`).remove();
    });
  });

function deliveryOptionsHTML(matchingItem,cartItem){
  let html='';
  deliveryOptions.forEach((deliveryOption) => {
    const dateString = dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;
    const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
    html+=`
          <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
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