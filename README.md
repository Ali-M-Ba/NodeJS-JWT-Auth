# NodeJS-JWT-Auth

A full-stack example application providing JSON Web Token (JWT) based authentication with email verification and password reset flows. The repository contains a Node.js + Express backend and a React + Vite frontend demonstrating common auth features like sign up, login, protected routes, email verification, and password reset.

## Features

- User registration and login
- Email verification for new accounts
- Password reset flow (request + reset)
- Session cookie handling (secure cookies + expiry management)
- Protected routes on the frontend (React)
- Example email templates and nodemailer configuration
- MongoDB (Mongoose) for user persistence

## Technologies Used

- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- cookie-parser
- cors
- dotenv
- nodemailer (for sending verification and reset emails)
- React + Vite (frontend)
- Axios (frontend API client)

## Quick Start / Installation

Prerequisites:

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB running locally or a cloud MongoDB URI

1. Clone the repository

```bash
git clone https://github.com/Ali-M-Ba/NodeJS-JWT-Auth.git
cd NodeJS-JWT-Auth
```

2. Backend setup

```bash
cd backend
npm install
```

3. Frontend setup

```bash
cd ../frontend
npm install
```

## Configuration

The project uses environment variables (via `dotenv`). Create a `.env` file in `backend/` with values similar to the example below.

Example `backend/.env`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/JWT-Auth
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
COOKIE_NAME=session
COOKIE_MAX_AGE=86400000  # in ms (example: 1 day)
CLIENT_URL=http://localhost:5173

# Email (nodemailer) config - adjust for your SMTP provider
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false # true for 465, false for other ports
SMTP_USER=you@example.com
SMTP_PASS=your_email_password
FROM_EMAIL="Your App" <no-reply@example.com>
```

Notes:
- `MONGO_URI` can be a local MongoDB connection or an Atlas URI.
- `CLIENT_URL` should match the origin used by the frontend dev server (Vite usually runs on `http://localhost:5173`).

## Running the App (Development)

Open two terminals — one for backend and one for frontend.

Backend (from `backend/`):

```bash
# from repository root
cd backend
# start server (example commands; package.json may provide scripts like `dev` or `start`)
node server.js
# or, if nodemon is installed
npx nodemon server.js
```

The backend listens on `PORT` (defaults to `3000`) and exposes auth routes under `/api/auth`.

Frontend (from `frontend/`):

```bash
cd frontend
npm run dev
```

Open the frontend in the browser at the Vite dev URL (commonly `http://localhost:5173`).

## API / Usage Examples

The backend mounts auth routes at `/api/auth` (see `backend/server.js`). Typical endpoints you can expect from this structure:

- `POST /api/auth/register` — register a new user (sends verification email)
- `POST /api/auth/login` — authenticate user and set session cookie
- `POST /api/auth/logout` — clear session cookie
- `GET /api/auth/verify-email?token=...` — verify account using token
- `POST /api/auth/forgot-password` — request a password reset email
- `POST /api/auth/reset-password` — reset password using token
- `GET /api/auth/me` — get currently authenticated user (protected)

Example `curl` (register):

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "name":"Alice", "email":"alice@example.com", "password":"secret" }'
```

Example `curl` (login):

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email":"alice@example.com", "password":"secret" }' \
  -c cookies.txt
```

Notes about cookies and CORS:
- The backend is configured to accept requests from the frontend (`http://localhost:5173`) and to allow credentials.
- When testing with `curl`, use `-c` and `-b` to read/write cookies; browsers will handle cookies automatically during normal use.

## Frontend

The frontend is built with React and Vite and uses an API client (`src/api/axiosClient.js` and `src/api/userApi.js`) to talk to the backend. Key pieces:

- `src/components` — React components for auth forms and protected routes
- `src/pages` — page views (Login, Forgot Password, Reset, Verify Email, Home, Secret)
- `src/context/AppContext.jsx` — central app state and auth state
- `public/styles.css` and `src/App.css` — styling

The frontend demonstrates how to protect routes and interact with the auth API.

## Folder Structure

Top-level overview (abridged):

```
NodeJS-JWT-Auth/
├─ backend/
│  ├─ server.js
│  ├─ controllers/
│  │  └─ auth.controller.js
│  ├─ models/
│  │  └─ User.model.js
│  ├─ routes/
│  │  └─ auth.routes.js
│  ├─ middlewares/
│  │  ├─ auth.middleware.js
│  │  └─ session.middleware.js
│  ├─ config/
│  │  ├─ nodemailer.js
│  │  └─ email.templates.js
│  └─ utils/
│     ├─ res.utils.js
│     └─ token.utils.js
├─ frontend/
│  ├─ index.html
│  ├─ package.json
│  ├─ src/
│  │  ├─ api/
│  │  │  ├─ axiosClient.js
│  │  │  └─ userApi.js
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ context/
│  └─ public/
│     └─ styles.css
└─ package.json
```

(See repository for full file list and details.)

## Security Notes

- Keep `JWT_SECRET` and email credentials out of source control. Use environment variables.
- For production, enable HTTPS and set secure cookie flags appropriately.
- Consider setting stricter CORS configuration for production (restrict origins, methods).

## Additional Notes / Hints

- The backend `server.js` serves static files from `frontend/public` — if you build the frontend for production, its static files can be served directly from the backend.
- Email templates live under `backend/config/email.templates.js` and can be customized for better UX.
- If you deploy to a cloud provider, update `MONGO_URI`, `CLIENT_URL`, and SMTP credentials in environment variables.