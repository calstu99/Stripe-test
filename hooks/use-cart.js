import {useState, createContext, useContext,useEffect } from 'react';
import products from '../products.json'
import { initiateCheckout } from "@/lib/payment";


const defaultCart = {
    products: {}
  }


export const CartContext = createContext();
// the "use" prefix addition allow us to get access to React internals - so we 
// use the useState hook! Homepage will have access to the useState function!!


export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem('spacejelly_cart');
    console.log('spacejelly', stateFromStorage)
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, [])

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem('spacejelly_cart', data)
  }, [cart])

  // add pricePerItem from the Cart 
  const cartItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price
    }
  });
  console.log('cart', cart);

  // calculate subtotal from the cart
  const subtotal = cartItems.reduce((accumulator, { pricePerItem, quantity }) => {
    return accumulator + (pricePerItem * quantity)
  }, 0);
  console.log('subtotal', subtotal);

  // calculate subtotal from the cart
  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity
  }, 0);
  console.log('totalItems', totalItems);







  // function to add item to cart  
  function addToCart({ id } = {}) {
    updateCart(prev => {
      let cartState = { ...prev };
      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      }
      else {
        cartState.products[id] = {
          id,
          quantity: 1
        }
      }

      return cartState;
    })

  } 


    // update the items in your cart

    function updateItem({ id, quantity} = {}) {
      updateCart(prev => {
        let cartState = { ...prev };
        if (cartState.products[id]) {
          cartState.products[id].quantity = quantity;
        }
      
  
        return cartState;
      })
  
    } 



// function to initiate checkout sequence for Stripe
  function checkout () {
    initiateCheckout({
      lineItems: cartItems.map(item =>{
        return {
          price: item.id,
          quantity:item.quantity
        }
      })
    })
  }

    return {
        cart,
        cartItems,
        updateCart,
        subtotal,
        totalItems,
        addToCart,
        updateItem,
        checkout
    };
}


export function useCart() {
    const cart = useContext (CartContext);
    return cart ;
}


