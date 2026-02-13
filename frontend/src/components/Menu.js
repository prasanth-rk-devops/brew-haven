import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const Menu = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/menu')
      .then(res => setItems(res.data))
      .catch(err => console.error('Menu fetch error:', err));
  }, []);

  return (
    <div>
      <div 
        className="hero" 
        style={{ 
          backgroundImage: `url(/coffee-hero.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 8px rgba(0,0,0,0.7)'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>
            Prasanth's Brew Haven
          </h1>
          <p style={{ fontSize: '1.8rem' }}>Your daily dose of perfection</p>
        </div>
      </div>

      <div className="menu-grid">
        {items.map(item => (
          <div key={item._id} className="menu-item">
            <img 
              src={item.imageUrl || '/latte-art.jpg'} 
              alt={item.name} 
            />
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
    </div>
  );
};

export default Menu;