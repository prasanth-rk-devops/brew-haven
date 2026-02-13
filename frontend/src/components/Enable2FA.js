import { useState } from 'react';
import axios from 'axios';

const Enable2FA = () => {
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [step, setStep] = useState('start');
  const [error, setError] = useState('');

  const startSetup = async () => {
    try {
      const { data } = await axios.post('/api/auth/2fa/enable', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setQrCode(data.qrCode);
      setSecret(data.secret);
      setStep('scan');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start 2FA');
    }
  };

  const verify = async () => {
    try {
      const { data } = await axios.post('/api/auth/2fa/verify-setup', { token: code }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBackupCodes(data.backupCodes);
      setStep('done');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem', background: 'white', borderRadius: '12px' }}>
      <h2>Enable 2FA</h2>

      {step === 'start' && (
        <button onClick={startSetup} style={{ width: '100%' }}>
          Start 2FA Setup
        </button>
      )}

      {step === 'scan' && (
        <div style={{ textAlign: 'center' }}>
          <h3>Scan this QR code</h3>
          {qrCode && <img src={qrCode} alt="2FA QR" style={{ maxWidth: '250px' }} />}
          <p>Or enter manually: <strong>{secret}</strong></p>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter code"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <button onClick={verify} style={{ width: '100%', marginTop: '1rem' }}>
            Verify
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}

      {step === 'done' && (
        <div>
          <h3>2FA Enabled!</h3>
          <p>Save these backup codes (shown only once):</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {backupCodes.map((code, i) => (
              <li key={i} style={{ fontFamily: 'monospace', margin: '0.5rem 0' }}>
                {code}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Enable2FA;