import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';

const Verify2FA = ({ tempToken, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login/verify-2fa', {
        tempToken,
        token: code.trim()
      });

      dispatch(setCredentials({ token: data.token, user: data.user }));
      localStorage.setItem('token', data.token);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: 'white', borderRadius: '12px' }}>
      <h2>Two-Factor Authentication</h2>
      <p>Enter the 6-digit code from your authenticator app</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
          style={{ textAlign: 'center', fontSize: '1.5rem', width: '100%' }}
        />
        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verify2FA;