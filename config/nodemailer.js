import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
  port: process.env.SMTP_PORT, // e.g. 587 (for TLS) or 465 (for SSL)
  auth: {
    user: process.env.SMTP_USER, // e.g. "yourname@gmail.com"
    pass: process.env.SMTP_PASS, // e.g. "your_app_password_or_smtp_key"
  },
});
