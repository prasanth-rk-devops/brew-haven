import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty</h2>
        <Link to="/">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {items.map(item => (
        <div key={item._id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
          <h4>{item.name} × {item.quantity}</h4>
          <p>₹{(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => dispatch(removeFromCart(item._id))}>
            Remove
          </button>
        </div>
      ))}
      <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
      <Link to="/checkout">
        <button style={{ fontSize: '1.1rem', padding: '0.9rem 2rem' }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Cart;
