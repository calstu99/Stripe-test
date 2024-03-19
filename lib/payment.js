import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe (process.env.NEXT_PUBLIC_STRIPE_API_KEY)




export async function initiateCheckout({ lineItems } = {}) {
  const stripe = await stripePromise;
  //const hostname ='http://127.0.0.1:3000'
  //successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
  //successUrl: `${hostname}/success?session_id={CHECKOUT_SESSION_ID}`,

  try {
    await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems,
      successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    });
  } catch (error) {
    console.error('Error initiating checkout:', error);
    // You can add additional error handling logic here, such as displaying an error message to the user
    return;
  }
}





