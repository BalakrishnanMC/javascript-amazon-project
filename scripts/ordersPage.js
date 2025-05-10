import { orderClass,loadFromStorage } from "../data/orders.js";
import {products} from '../../data/products.js';
import formatCurrency from "./utils/money.js";
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://esm.sh/dayjs';
loadFromStorage();
console.log(orderClass.cart);

function getProduct(productId){
  let matchingProduct;
  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

function renderOrderPage(){
    let orderPageHTML = '';

    orderPageHTML = `
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderClass.date}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(orderClass.total)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderClass.orderId}</div>
        </div>
      </div>

      <div class="order-details-grid">${gridProducer()}
      </div>
    `
    ;

    document.querySelector('.js-order-container').innerHTML = orderPageHTML;

}

renderOrderPage();

function gridProducer(){
  let HTML = '';
  orderClass.cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    let dateString ='';
    deliveryOptions.forEach((deliveryOption) => {
      if(deliveryOption.id === cartItem.deliveryOptionId){
        dateString = dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
      }
    });

    HTML+= `
    <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dateString}
          </div>
          <div class="product-quantity">
            Quantity: ${cartItem.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <a href="amazon.html"><span class="buy-again-message">Buy it again</span></a>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?name=${product.name}&image=${product.image}&quans=${cartItem.quantity}&date=${dateString}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>  
  `
  });
  return HTML;
}
