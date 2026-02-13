import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Your Cart</h2>
      {items.map(item => (
        <div key={item._id} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #eee',
          padding: '1rem 0'
        }}>
          <div>
            <h4>{item.name}</h4>
            <p>₹{item.price.toFixed(2)} × {item.quantity}</p>
          </div>
          <div>
            <button onClick={() => dispatch(removeFromCart(item._id))}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <h3 style={{ marginTop: '2rem' }}>Total: ₹{totalAmount.toFixed(2)}</h3>
      <Link to="/checkout">
        <button style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Cart;