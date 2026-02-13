# Prasanth's Brew Haven ☕

A full-stack coffee shop web application built for learning and real-world production patterns.

**Location vibe**: Designed with love in Coimbatore, Tamil Nadu ������

## Features

- Secure user authentication (JWT + password strength validation + password reset flow)
- Two-Factor Authentication (TOTP / Google Authenticator) with backup codes
- Menu management (CRUD — admin only for create/update)
- Shopping cart & order placement
- Order history & status tracking
- Email notifications:
  - Customer order confirmation
  - Admin new-order alerts
  - Password reset links
- Image uploads for menu items (Cloudinary)
- Stripe payment integration (test mode)
- Responsive frontend (React + Redux Toolkit)

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication
- Nodemailer (Gmail SMTP)
- Cloudinary (image storage)
- Stripe (payments)
- otpauth + qrcode (2FA)
- Helmet, express-rate-limit, winston (security & logging)

**Frontend**
- React 18 (Create React App)
- Redux Toolkit + React-Redux (state management)
- React Router v6
- Axios (API calls)
- Responsive design (coffee-themed colors)

## Folder Structure

brew-haven/
├── backend/                    # Express + Node API
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
├── frontend/                   # React SPA
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.css
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── README.md                   ← You are here
└── .gitignore


## Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)
- Gmail account with App Password (for emails)
- Cloudinary account (free tier OK)
- Stripe test keys (optional for payments)

## Setup Instructions

### 1. Backend
-------------------

```bash
cd backend
npm install

### Create .env from .env.example and fill values:
--------------------------------------------------

MONGO_URI=...
JWT_SECRET=...
EMAIL_USER=...
EMAIL_PASS=...
ADMIN_EMAILS=...
CLOUDINARY_...
STRIPE_SECRET_KEY=...

### Seed database (creates admin user + sample menu items):
---------------------------------------------------

npm run seed

### Start backend:
--------------------

npm start
# or
node server.js

API should be running at http://localhost:5000

### 2. Frontend
-------------------
```bash
cd frontend
npm install

### Create .env and add:
-------------------------------

REACT_APP_API_URL=http://localhost:5000

### Start frontend:
-------------------------------------

npm start

App opens at http://localhost:3000

Default Credentials (after seeding)

Admin: admin@brew.com / AdminStrongPass123!
Regular user: register via UI

Important Notes

Security: Never commit .env files — add them to .gitignore
Emails: Use real Gmail App Password (not normal password). Consider SendGrid/Resend for production.
Payments: Currently uses Stripe test mode. Replace keys and add webhook handling in production.
2FA: After enabling, save backup codes securely — they are shown only once.
Deployment:
Backend → Render, Railway, Vercel Serverless, Heroku
Frontend → Vercel, Netlify, Cloudflare Pages
Database → MongoDB Atlas


Contributing
This is a personal/learning project — feel free to fork and experiment.
License
MIT – use freely for learning/personal projects.
Made with ☕ and lots of debugging in Coimbatore
— Prasanth, Feb 2026


### Where to put it

Just create a new file called `README.md` directly inside the `brew-haven/` folder (same level as `backend/` and `frontend/` folders).

```text
brew-haven/
├── README.md          ← put it here
├── backend/
└── frontend/
