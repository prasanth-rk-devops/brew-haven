import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Enable2FA from './components/Enable2FA';
import './App.css';

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Header />

      <div className="content">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={userInfo ? <OrderHistory /> : <Navigate to="/login" />} />
          <Route path="/login" element={!userInfo ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!userInfo ? <Register /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/enable-2fa" element={userInfo ? <Enable2FA /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
