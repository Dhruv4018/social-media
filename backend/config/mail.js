import nodemailer from 'nodemailer';

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
    // YE ADD KARNA ZAROORI HAI PRODUCTION KE LIYE
    tls: {
      rejectUnauthorized: false 
    }
  });

  // 1. Connection Verify (Promise ke saath)
  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log("Connection Error:", error);
        reject(error);
      } else {
        console.log("Server ready for messages");
        resolve(success);
      }
    });
  });

  // 2. Email Sending (Promise ke saath)
  const mailOptions = {
    from: `My App <${process.env.EMAIL_USER}>`, // Professional format
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html || data.text, // HTML support bhi rakho
  };

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Mail Send Error:", err);
        reject(err);
      } else {
        console.log("Email Sent Successfully");
        resolve(info);
      }
    });
  });
};