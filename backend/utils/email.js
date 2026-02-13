const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmationEmail = async (order, user) => {
  try {
    await transporter.sendMail({
      from: `"Brew Haven" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Order Confirmation #${order._id}`,
      text: `Thank you ${user.name} for your order! Total: ₹${order.totalAmount}`
    });
  } catch (err) {
    console.error('Email error:', err);
  }
};

const sendAdminNewOrderAlert = async (order, userName) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAILS.split(','),
      subject: `New Order #${order._id}`,
      text: `New order from ${userName}. Total: ₹${order.totalAmount}`
    });
  } catch (err) {
    console.error('Admin email error:', err);
  }
};

const sendPasswordResetEmail = async (email, name, token) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Hi ${name},<br>Click <a href="${url}">here</a> to reset your password.</p>`
    });
  } catch (err) {
    console.error('Reset email error:', err);
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendAdminNewOrderAlert,
  sendPasswordResetEmail
};