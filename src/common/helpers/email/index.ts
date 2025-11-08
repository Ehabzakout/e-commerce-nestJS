import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export async function sendEmail(mailOptions: nodemailer.SendMailOptions) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `E-commerce App <${process.env.EMAIL}>`,
    ...mailOptions,
  });
}
