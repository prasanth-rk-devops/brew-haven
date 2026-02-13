import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header>
      <h1>Prasanth's Brew Haven</h1>
      <nav>
        <Link to="/">Menu</Link>
        <Link to="/cart">Cart ({useSelector(state => state.cart.items.length)})</Link>
        {userInfo && <Link to="/orders">Orders</Link>}
        {userInfo && <Link to="/enable-2fa">Security (2FA)</Link>}

        {userInfo ? (
          <>
            <span>Hi, {userInfo.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
<header className="main-header">
  <div className="container">
    <div className="logo">
      <h1>Prasanth's Brew Haven</h1>
    </div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link> {/* if you add /menu route later */}
      <Link to="/cart">Cart ({cartCount})</Link>
      {userInfo ? (
        <>
          <Link to="/orders">Orders</Link>
          <Link to="/enable-2fa">Security</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  </div>
</header>
export default Header;
