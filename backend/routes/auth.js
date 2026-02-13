const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validatePasswordStrength } = require('../middleware/passwordStrength');
const { protect } = require('../middleware/auth');
const { sendPasswordResetEmail } = require('../utils/email');
const otpauth = require('otpauth');
const QRCode = require('qrcode');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const strength = validatePasswordStrength(password);
  if (!strength.valid) return res.status(400).json({ message: strength.message });

  if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already exists' });

  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

  res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });

  if (user.twoFactorEnabled) {
    const tempToken = jwt.sign({ id: user._id, temp: true }, process.env.JWT_SECRET, { expiresIn: '5m' });
    return res.json({ requires2FA: true, tempToken });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
});

router.post('/login/verify-2fa', async (req, res) => {
  const { tempToken, token: code } = req.body;
  try {
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.twoFactorEnabled) return res.status(400).json({ message: '2FA not enabled' });

    const totp = new otpauth.TOTP({ secret: otpauth.Secret.fromBase32(user.twoFactorSecret) });
    const delta = totp.validate({ token: code, window: 1 });

    if (delta === null) return res.status(401).json({ message: 'Invalid 2FA code' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await sendPasswordResetEmail(user.email, user.name, token);
  }
  res.json({ message: 'If the email exists, reset link sent' });
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const strength = validatePasswordStrength(newPassword);
  if (!strength.valid) return res.status(400).json({ message: strength.message });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

router.post('/2fa/enable', protect, async (req, res) => {
  if (req.user.twoFactorEnabled) return res.status(400).json({ message: '2FA already enabled' });

  const secret = new otpauth.Secret();
  const totp = new otpauth.TOTP({
    issuer: 'BrewHaven',
    label: req.user.email,
    secret
  });

  const qrCode = await QRCode.toDataURL(totp.toString());

  req.user.twoFactorSecret = secret.base32;
  await req.user.save();

  res.json({ qrCode, secret: secret.base32 });
});

router.post('/2fa/verify-setup', protect, async (req, res) => {
  const { token } = req.body;
  const totp = new otpauth.TOTP({ secret: otpauth.Secret.fromBase32(req.user.twoFactorSecret) });

  if (totp.validate({ token, window: 1 }) === null) {
    return res.status(400).json({ message: 'Invalid verification code' });
  }

  req.user.twoFactorEnabled = true;
  req.user.backupCodes = Array.from({ length: 8 }, () => Math.random().toString(36).slice(2, 10).toUpperCase());
  await req.user.save();

  res.json({ message: '2FA enabled successfully', backupCodes: req.user.backupCodes });
});

module.exports = router;