import Head from "next/head"
import styles from '../../styles/Product.module.css'
import { useCart} from '@/hooks/use-cart';

import products from '../../products.json'

export default function Product({ product }) {
    console.log ('product',product)

    const {id, title, description, image, price} = product;
    const {addToCart} = useCart();

    // const id = 'productId';
    // const title = 'Product Title';
    // const description = 'Product description';
    // const image = 'http://source.unsplash.com/random/500x500';
    // const price = 1.00;

    return (
        <div className={styles.container}>
            <Head>
                <title> {title}Space Jelly</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={`${styles.main}`}>
                <div className={styles.productImage}>
                    <img src={image}/>
                </div>
                <div >
                    <h1 className={styles.title}>Space Jelly Shop</h1><br />
                    <p className= {styles.description}>{title}</p><br />
                    <p className= {styles.description}>{description}</p><br />
                    <p className= {styles.description}>${price.toFixed(2)}</p>
                    <br />

                    <button className={styles.button} onClick={() => {
                        addToCart ({
                            id
                        })
                    }}>Buy</button>
                </div>

            </main>
        </div>

    )

}

// product available as a prop to the product page
export async function getStaticProps ({params}){
    const product  = products.find(({id})=>id === params.productId)
    console.log('params', params)
    return {
        props:{
            // product: {}
            product
        }
    }

}

// generate static paths (will also need static props to be defined to work together!)
export async function getStaticPaths(){
 const paths = products.map((product)=> {
    return {
        params: {
            productId:product.id
        }
    }
 })


    return {
        paths:paths,
        fallback:false
    }
}



// dynamic routes