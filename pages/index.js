import {useState, useMemo} from 'react';
import Head from "next/head";
import Image from "next/image";
import {FaShoppingCart} from 'react-icons/fa';
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import {useCart, useCartState} from '@/hooks/use-cart';

import products from '../products.json'


const defaultCart = {
  products: {}
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  // const {subtotal,totalItems,addToCart,checkout} = useCartState();
  const {subtotal,totalItems,addToCart,checkout} = useCart();
  //console.log('cartTest',cartTest);
  // const [cart,updateCart] = useState(defaultCart);
  //console.log('cart',cart);


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



// Context provides a way to pass data through the component tree without having to pass props down manualy at every level.

