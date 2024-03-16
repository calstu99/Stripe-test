import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import products from '../products.json'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log ('prducts',products);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
       

        <div className={styles.container}>
          <Head>
            <title>Space Jelly Shop</title>
          </Head>
          
         <h1>Space Jelly Shop</h1><br />
         
         <p> The best space jellyfish swag on the web</p><br />
        </div>

        <ul className={styles.grid}>
       
        <li className={styles.card}>
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
          </li>
      

        </ul>
      </main>
    </>
  );
}
