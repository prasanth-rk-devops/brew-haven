const commonPasswords = ['password', '12345678', 'qwertyuiop', 'letmein', 'welcome123', 'admin123', 'prasanth', 'coimbatore'];

const validatePasswordStrength = (password) => {
  if (password.length < 12) {
    return { valid: false, message: 'Password must be at least 12 characters long.' };
  }

  if (commonPasswords.some(word => password.toLowerCase().includes(word))) {
    return { valid: false, message: 'Password is too common or predictable.' };
  }

  return { valid: true, strength: 'good' };
};

module.exports = { validatePasswordStrength };