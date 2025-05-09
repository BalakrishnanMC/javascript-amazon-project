import { myCart}  from '../../data/cart.js';

describe('test suite: addToCart',() => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '3'
        }
      ]);
    });
    myCart.loadFromStorage();
    myCart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(myCart.cartItems.length).toEqual(2);
    expect(myCart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(myCart.cartItems[0].quantity).toEqual(3);
  });
  it('adds an new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '3'
        }
      ]);
    });
    myCart.loadFromStorage();
    myCart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678cb');
    expect(myCart.cartItems.length).toEqual(3);
    expect(myCart.cartItems[2].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678cb');
    expect(myCart.cartItems[2].quantity).toEqual(1);
  });
});