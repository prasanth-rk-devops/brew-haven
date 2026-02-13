const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmationEmail = async (order, user) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation #${order._id}`,
    html: `<h2>Thank you ${user.name}!</h2><p>Your order of $${order.totalAmount} is confirmed.</p>`
  });
};

const sendAdminNewOrderAlert = async (order, userName) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAILS.split(','),
    subject: `New Order #${order._id} - $${order.totalAmount}`,
    html: `<h2>New order from ${userName}</h2><p>Total: $${order.totalAmount}</p>`
  });
};

const sendPasswordResetEmail = async (email, name, token) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Hello ${name},<br>Click <a href="${url}">here</a> to reset password. Link expires in 15 minutes.</p>`
  });
};

module.exports = {
  sendOrderConfirmationEmail,
  sendAdminNewOrderAlert,
  sendPasswordResetEmail
};
