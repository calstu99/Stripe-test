import React, { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function SuccessPage() {
    const router = useRouter();
  
    useEffect(() => {
      // Clear the shopping cart when the success page is loaded
      clearShoppingCart();
  
     // Redirect to the home page after 5 seconds
     const redirectTimer = setTimeout(() => {
        router.push('/');
      }, 5000);
  
      // Clean up the redirect timer when the component unmounts
      return () => clearTimeout(redirectTimer);
    }, [router]);
  
    function clearShoppingCart() {
      // Remove or reset the cart data here
      // For example, if you're using localStorage to store the cart:
      console.log('removing shopping cart');
      localStorage.removeItem('spacejelly_cart');
  
      // Or if you're using a state management library like Redux:
      // dispatch(clearCart());
    }
  
    return (
      <div>
        <h1>Thank you for your purchase!</h1>
        <p>You will be redirected to the home page in 10 seconds.</p>
      </div>
    );
  }


