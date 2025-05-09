import {renderOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import {loadProductsFetch } from '../data/products.js';

// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// })

// new Promise((resolve) =>{
//   loadProducts(() => {
//     resolve();
//   })
// }).then(() => {
//   renderOrderSummary();
// })

// Promise.all([
//   loadProductsFetch()
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// })

async function loadPage() {
  try{
    await loadProductsFetch();
  }
  catch(error){
    console.log('Unexpected error .Please try again later.');
  }
  renderOrderSummary();
  renderPaymentSummary();
}