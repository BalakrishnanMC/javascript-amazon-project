const url = new URL(window.location.href);

document.querySelector('.js-main').innerHTML = 
`
  <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${url.searchParams.get('date')}
    </div>

    <div class="product-info">
      ${url.searchParams.get('name')}
    </div>

    <div class="product-info">
      Quantity: ${url.searchParams.get('quans')}
    </div>

    <img class="product-image" src="${url.searchParams.get('image')}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  </div>
`
;