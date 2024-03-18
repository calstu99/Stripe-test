import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
// import {useCart} from '@/hooks/use-cart';
import { useCart, useCartState } from '@/hooks/use-cart';
import styles from "@/styles/Navigation.module.css";



const Nav = () => {

    //   const {subtotal} = useCart();
    const { subtotal, checkout } = useCart();
    return (
        <nav className={styles.navbar}>
            <ul >
                <div className={styles.menu}>
                    <p className={styles.navTitle} >
                        Space Jelly Shop
                    </p>
                    <p className={styles.buybutton} >
                        <Link href="/cart">
                         <FaShoppingCart size={40} />  ${subtotal.toFixed(2)}
                        </Link>
                        {/* <button onClick={checkout}>
                            <FaShoppingCart size={40} />  ${subtotal}
                        </button> */}
                    </p>


                </div>
            </ul>
        </nav>
    )
}

export default Nav;


