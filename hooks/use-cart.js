import {useState, createContext, useContext,useEffect } from 'react';
import products from '../products.json'
import { initiateCheckout } from "@/lib/payment";


const defaultCart = {
    products: {}
  }


export const CartContext = createContext();
// the "use" prefix addition allow us to get access to React internals - so we 
// use the useState hook! Homepage will have access to the useState function!!

export function useCartState(){
    const [cart,updateCart] = useState(defaultCart);
    
    useEffect(()=>{
        const stateFromStorage  = window.localStorage.getItem('spacejelly_cart');
        console.log('spacejelly',stateFromStorage)
        const data = stateFromStorage && JSON.parse(stateFromStorage);
        if (data) {
            updateCart(data);
        }
    }, [])    

    useEffect(()=>{
        const data  = JSON.stringify(cart);
        window.localStorage.setItem('spacejelly_cart',data)
    }, [cart])

      // add pricePerItem from the Cart 
  const cartItems = Object.keys(cart.products).map (key =>{
    const product = products.find(({id}) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem:product.price
    }
  });

  console.log('cart', cart);
  // The mapping of cart.products to cartItems is a common pattern to transform
  //  data for display purposes. However, if you are concerned about performance
  //   or unnecessary re-renders, you can optimize this process by memoizing the 
  //   cartItems using useMemo hook to prevent unnecessary recalculations on each
  //    render.

  
  // const cartItems = useMemo(() => {
  //   return Object.keys(cart.products).map(key => {
  //     const product = products.find(({ id }) => `${id}` === `${key}`);
  //     return {
  //       ...cart.products[key],
  //       pricePerItem: product.price
  //     };
  //   });
  // }, [cart, products]);

  // console.log('cart', cart);

  //console.log ('cartItems', cartItems);


  // calculate subtotal from the cart
  const subtotal = cartItems.reduce((accumulator,{pricePerItem, quantity}) =>{
    return accumulator + (pricePerItem * quantity)
  },0);
  console.log ('subtotal', subtotal);

    // calculate subtotal from the cart
    const totalItems = cartItems.reduce((accumulator,{quantity}) =>{
      return accumulator + quantity
    },0);
    console.log ('totalItems', totalItems);


  function addToCart({id}={}) {
      updateCart (prev => {
        let cartState = {...prev};
        if (cartState.products[id]){
          cartState.products[id].quantity = cartState.products[id].quantity + 1;
        }
        else {
          cartState.products[id] = {
            id,
            quantity:1
          }
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

// The addToCart function you provided is a common pattern for updating a shopping 
// cart in React using the useState hook. This function takes an object as an 
// argument (with an optional default value) and updates the cart state by either incrementing the
//  quantity of an existing product or adding a new product to the cart.
// Here's a breakdown of how the addToCart function works:
// Function Signature: addToCart({ id } = {})
// This function takes an object as an argument with a destructured id property.
//  If no argument is provided, it defaults to an empty object.
// Updating the Cart State:
// The updateCart function is called with a callback that receives the previous state (prev) and returns the updated state.
// A copy of the previous state is made using spread syntax to ensure immutability: let cartState = { ...prev };
// If the product with the given id already exists in the cart, its quantity is incremented by 1.
// If the product does not exist in the cart, a new entry is added with an initial quantity of 1.
// Returning the Updated State:
// The updated cartState object is returned from the callback function, which will be used to update the cart state.
// Side Effects:
// This function assumes that updateCart is a function provided by useState to update the state of the cart.
// Overall, this function effectively handles adding products to a shopping cart in React by updating the state 
// immutably based on the 
// existing cart contents and the product being added. It follows best practices for managing state in React functional components.


    return {
        cart,
        updateCart,
        subtotal,
        totalItems,
        addToCart,
        checkout
    };
}


export function useCart() {
    const cart = useContext (CartContext);
    return cart ;
}