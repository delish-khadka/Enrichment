const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or smtp.mailtrap.io / SendGrid SMTP
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendLoginCredentials = async (to, tempPassword) => {
  const mailOptions = {
    from: `"HRMS Admin" <${process.env.MAIL_USER}>`,
    to,
    subject: "Welcome to HRMS - Your Login Details",
    html: `
      <h3>Welcome to HRMS!</h3>
      <p>Your account has been created successfully.</p>
      <p><strong>Email:</strong> ${to}</p>
      <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      <p>Please log in and change your password.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendLoginCredentials;
