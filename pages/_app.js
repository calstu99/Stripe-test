// import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

import "@/styles/globals.css";

import { CartContext, useCartState } from "@/hooks/use-cart";

import Nav from "./nav";

export default function App({ Component, pageProps }) {
  const cart = useCartState ();
  return (
    <CartContext.Provider value = {cart}>
      <Nav {...pageProps} />
      <Component {...pageProps} />
    
    </CartContext.Provider>
  )

}

