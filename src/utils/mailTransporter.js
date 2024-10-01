import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: 'roughwebsevemail@gmail.com',
    pass: 'njrlrhjrelhvkwff',
  },
});
