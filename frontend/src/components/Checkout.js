import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const { data: order } = await axios.post('/api/orders', {
        items: items.map(i => ({ menuItem: i._id, quantity: i.quantity })),
        totalAmount
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const { data: { clientSecret } } = await axios.post('/api/payment/create-payment-intent', {
        orderId: order._id
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: 'Test User' }
        }
      });

      if (payload.error) {
        setError(payload.error.message);
      } else if (payload.paymentIntent.status === 'succeeded') {
        setSucceeded(true);
      }
    } catch (err) {
      setError('Payment failed. Try again.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem', background: 'white', borderRadius: '12px' }}>
      <h2>Checkout</h2>
      <p>Total: ₹{totalAmount.toFixed(2)}</p>

      <form onSubmit={handleSubmit}>
        <CardElement 
          options={{
            style: {
              base: { fontSize: '16px', color: '#32325d' },
            }
          }}
        />
        <button 
          type="submit" 
          disabled={processing || !stripe || !elements}
          style={{ 
            width: '100%', 
            padding: '1rem', 
            marginTop: '1.5rem', 
            fontSize: '1.2rem' 
          }}
        >
          {processing ? 'Processing...' : `Pay ₹${totalAmount.toFixed(2)}`}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      {succeeded && <div style={{ color: 'green', marginTop: '1rem' }}>Payment successful! Order placed.</div>}
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;