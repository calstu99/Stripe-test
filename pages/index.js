import {useState, useMemo} from 'react';
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import products from '../products.json'
import { initiateCheckout } from "@/lib/payment";

const defaultCart = {
  products: {}
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [cart,updateCart] = useState(defaultCart);
  
  console.log('cart',cart);

  // add pricePerItem from the Cart 
  const cartItems = Object.keys(cart.products).map (key =>{
    const product = products.find(({id}) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem:product.price
    }
  });

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


  //console.log ('prducts',products);
 //console.log('NEXT_PUBLIC_STRIPE_API_KEY',process.env.NEXT_PUBLIC_STRIPE_API_KEY)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={`${styles.main} ${inter.className}`}> */}
      <main className={`${styles.main}`}>

        <h1 className={styles.title}>Space Jelly Shop</h1><br />

        <p> The best space jellyfish swag on the universe!</p><br />

        <p className={styles.title}>
          <strong>Items:</strong>{totalItems }
          <br />
          <strong>Total Cost:</strong> ${subtotal}
          <br />
          <br />
          <button className={styles.button} onClick={checkout}>Check Out</button>
        </p>



        <ul className={styles.grid}>
          {products.map(product => {
            const { id, title, price, description, image } = product;
            return (
              <li key={id} className={styles.card}>
                <a href="#">
                  <img src={image} alt={title} />
                  <h3>{title}</h3>
                  <p>${price}</p>
                  <p>{description}</p>
                </a><br />
                <p><button className={styles.button} onClick={() => {
                  addToCart({
                    id
                  })
                  // console.log('Buy')
                  // initiateCheckout({
                  //   lineItems:[
                  //     {price:id,
                  //     quantity:1}
                  //   ]
                  // });

                }}>Add to Cart</button></p>
              </li>
            )
          })}
          {/* <li className={styles.card}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            
          
          >
            <img src="/images/mario.jpg" alt = "Space Mario"/>
            <h3>
             Space Jelly Tshirt 
            </h3>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>
          </li>
          <li  className={styles.card}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
           
          
          >
               <img src="/images/peach.jpg" alt = "Space Mario"/>
             <h3>
             Space Jelly Stickers 
            </h3>
            <p>
              Add some flare to your laptop with a sticker of Cosmo the Space Jellyfish
            </p>
          </a>
          </li>
          <li className={styles.card}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            
          
          >
               <img src="/images/hammer.jpg" alt = "Space Mario"/>
             <h3>
             Space Jelly Combo 
            </h3>
            <p>
              Show your love for Cosmo with a tshirt and sticker combo pack!
            </p>
          </a>
          </li> */}
        </ul>
      </main>
    </>
  );
}



// Important info about React 18 and useState, useEffects.
//https://www.techiediaries.com/react-18-useeffect/#:~:text=The%20standard%20behavior%20of%20the,effect%20twice%20instead%20of%20once.
