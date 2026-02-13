const commonWords = ['password', '123456', 'qwerty', 'letmein', 'welcome', 'admin', 'prasanth', 'coimbatore'];

const validatePasswordStrength = (password) => {
  if (password.length < 12) {
    return { valid: false, message: 'Password must be at least 12 characters long' };
  }
  if (commonWords.some(word => password.toLowerCase().includes(word))) {
    return { valid: false, message: 'Password is too common or predictable' };
  }
  return { valid: true, strength: password.length >= 16 ? 'strong' : 'good' };
};

module.exports = { validatePasswordStrength };
