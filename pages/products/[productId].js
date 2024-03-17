import Head from "next/head"
import styles from '../../styles/Product.module.css'

import products from '../../products.json'

export default function Product({product})  {

// const {id, title, description, image, price} = product;

return (
<div className = {styles.Product}> 
    <Head>
        <title> Space Jelly</title>
        <link rel = "icon" href = "/favicon.ico" />
    </Head>

            <main className={`${styles.main}`}>

                <h1 className={styles.title}>Space Jelly Shop</h1><br />

                <p> The best space jellyfish swag on the universe!</p><br />

                <p className={styles.title}>
                    <strong>Items:</strong>15djdjdkd
                    <br />
                    <strong>Total Cost:</strong> $10ddd
                    <br />
                    <br />

                </p>


                <a
                    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"


                >
                    <img src="http://source.unsplash.com/random/500x500" />
                    <h3>
                        Space Jelly Combo
                    </h3>
                    <p>
                       
                    </p>
                </a>

            </main>



</div>

    )


    





}
