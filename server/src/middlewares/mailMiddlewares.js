const nodemailer = require('nodemailer');

const sendEmail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lepetitjesusdu28@gmail.com',
      pass: 'gssd dzty jolw yadp'
    }
  });
  const mailOptions = {
    from: 'lepetitjesusdu28@gmail.com',
    to: email,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmail;