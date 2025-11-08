import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export async function sendEmail(mailOptions: nodemailer.SendMailOptions) {
  console.log(process.env.EMAIL, process.env.PASSWORD);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail(mailOptions);
}
