// src/utils/email.js

const nodemailer = require("nodemailer");
const config = require("@config");

exports.sendResetEmail = async (to, resetUrl) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: config.emailService,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  // Email options
  const mailOptions = {
    from: config.emailFrom,
    to,
    subject: "Password Reset",
    text: `You requested a password reset. Click the link to reset: ${resetUrl}`,
    html: `<p>You requested a password reset. Click the link to reset:</p><a href="${resetUrl}">Reset Password</a>`,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};
