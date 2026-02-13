# Prasanth's Brew Haven ☕

Full-stack coffee shop web application (MERN + Stripe + Cloudinary + 2FA + emails)

## Features
- Secure auth (JWT, password strength, reset flow, TOTP 2FA)
- Admin menu CRUD with image upload
- Cart & real Stripe checkout (test mode)
- Order history
- Email notifications (customer + admin)
- Dockerized (frontend + backend + Mongo)
- Production-ready nginx for frontend

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer, Cloudinary, Stripe, otpauth
- Frontend: React, Redux Toolkit, React Router, Axios, Stripe Elements
- Container: Docker + docker-compose
- Nginx: production config with gzip/brotli/security headers

## Quick Local Run
1. Backend
   cd backend
   npm install
   npm run seed
   npm start

2. Frontend
   cd frontend
   npm install
   npm start

Open: http://localhost:3000

## Docker Run
docker compose up --build

## Production Notes
- Use MongoDB Atlas
- Replace test Stripe keys with live
- Use Resend/SendGrid instead of Gmail
- Deploy frontend to Vercel, backend to Render/Railway
- Add domain + HTTPS via Cloudflare

Made in Chennai, Tamil Nadu – 2026