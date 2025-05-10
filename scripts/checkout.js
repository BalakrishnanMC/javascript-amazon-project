import {renderOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';

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

  renderOrderSummary();
  renderPaymentSummary();