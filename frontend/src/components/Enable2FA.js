import { useState, useEffect } from 'react';
import axios from 'axios';

const Enable2FA = () => {
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
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
      setError(err.response?.data?.message || 'Failed to start 2FA setup');
    }
  };

  const verifyCode = async () => {
    try {
      const { data } = await axios.post('/api/auth/2fa/verify-setup', {
        token: verificationCode.trim()
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBackupCodes(data.backupCodes);
      setStep('done');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
    }
  };

  return (
    <div>
      <h2>Enable Two-Factor Authentication</h2>

      {step === 'start' && (
        <>
          <p>Adding 2FA makes your account much more secure.</p>
          <button onClick={startSetup}>Start Setup</button>
        </>
      )}

      {step === 'scan' && (
        <div className="qr-container">
          <h3>Scan this QR code with your authenticator app</h3>
          {qrCode && <img src={qrCode} alt="2FA QR Code" />}
          <p>Or manually enter this key: <strong>{secret}</strong></p>
          <p>After scanning, enter the 6-digit code shown in your app:</p>
          <input
            type="text"
            maxLength={6}
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            placeholder="123456"
          />
          <button onClick={verifyCode}>Verify</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}

      {step === 'done' && (
        <div>
          <h3>2FA Enabled Successfully!</h3>
          <p>Save these backup codes in a safe place (you'll only see them once):</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {backupCodes.map((code, i) => (
              <li key={i} style={{ fontFamily: 'monospace', margin: '8px 0' }}>
                {code}
              </li>
            ))}
          </ul>
          <p>These codes can be used if you lose access to your authenticator app.</p>
        </div>
      )}
    </div>
  );
};

export default Enable2FA;
