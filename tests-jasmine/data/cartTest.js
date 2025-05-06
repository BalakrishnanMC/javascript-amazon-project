import { addToCart, cart, loadFromStorage}  from '../../data/cart.js';

describe('test suite: addToCart',() => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '0000000000000001',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    addToCart('0000000000000001');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('0000000000000001');
    expect(cart[0].quantity).toEqual(2);
  });
  it('adds an new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('0000000000000001');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('0000000000000001');
    expect(cart[0].quantity).toEqual(1);
  });
});