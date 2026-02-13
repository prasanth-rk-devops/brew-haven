import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Checkout = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    try {
      // 1. Create order
      const { data: order } = await axios.post('/api/orders', {
        items: items.map(i => ({ menuItem: i._id, quantity: i.quantity })),
        totalAmount
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // 2. In real app → redirect to payment page or show success
      alert(`Order created! Order ID: ${order._id}\n(Payment integration pending)`);
      navigate('/orders');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ₹{totalAmount.toFixed(2)}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCheckout} style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
        Place Order
      </button>
      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
        Note: Stripe payment flow is stubbed in this version.
      </p>
    </div>
  );
};

export default Checkout;
