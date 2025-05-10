class Order{
  orderId;
  total;
  date;
  cart;
  localStorageKey;

  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
  }

  addItems(orderDetails){
    this.orderId = orderDetails.orderId;
    this.total = orderDetails.total;
    this.cart = orderDetails.cart;
    this.date = orderDetails.date;
    this.saveToStorage();
  }
  saveToStorage(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(orderClass));
    console.log('saved');
    console.log(orderClass);
  }
  
}

export let orderClass = new Order('ord');

export function loadFromStorage(){
    orderClass = JSON.parse(localStorage.getItem('ord'));
  }