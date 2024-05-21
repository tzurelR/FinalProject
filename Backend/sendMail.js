import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "tzurel123@gmail.com",
      pass: "fgkc asun otgz zwoe",
    },
  });

  const sendMail = async(transporter, mailOptions) => {
    await transporter.sendMail(mailOptions);
  }

export {sendMail, transporter};