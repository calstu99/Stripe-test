import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
// import {useCart} from '@/hooks/use-cart';
import {useCart, useCartState} from '@/hooks/use-cart';



import styles from "@/styles/Home.module.css";

const Nav = () => {

//   const {subtotal} = useCart();
const {subtotal,checkout} = useCart();
  return (
   
      <nav>
          <h1 >
              Space Jelly Shop
          </h1>

          <p >

              <button onClick={checkout}>
                  <FaShoppingCart />${subtotal}
              </button>
          </p>
      </nav>

        
     
    
      
    
  )
}

export default Nav;

