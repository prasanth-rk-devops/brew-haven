<div 
  className="hero"
  style={{
    backgroundImage: `url('https://muffingroup.com/blog/wp-content/uploads/2021/07/Becafe.jpg')`, // or any hero image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative'
  }}
>
  <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '12px' }}>
    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
      Welcome to Prasanth's Brew Haven
    </h1>
    <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
      Rich aroma, perfect brew, every day in Coimbatore
    </p>
    <button style={{ fontSize: '1.3rem', padding: '1rem 2.5rem' }}>
      Explore Menu
    </button>
  </div>
</div>
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/menu')
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className="menu-grid">
      {items.map(item => (
        <div key={item._id} className="menu-item">
          <img src={item.imageUrl} alt={item.name} />
          <div className="item-info">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">₹{item.price.toFixed(2)}</p>
            <button onClick={() => dispatch(addToCart(item))}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
<div key={item._id} className="menu-item">
  <img src={item.imageUrl} alt={item.name} />
  <div className="item-info">
    <h3>{item.name}</h3>
    <p className="description">{item.description.substring(0, 80)}...</p>
    <div className="price-row">
      <span className="price">₹{item.price.toFixed(2)}</span>
      <button onClick={() => dispatch(addToCart(item))}>
        Add to Cart
      </button>
    </div>
  </div>
</div>
export default Menu;
