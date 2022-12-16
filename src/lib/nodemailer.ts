import nodemailer from 'nodemailer';
import { QueryEmailForm } from './querys';

export const SendMail = async (html: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.kinghost.net',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const emailFrom = await (await QueryEmailForm.queryExecute()).email;

  if (!emailFrom) return;

  return await transporter.sendMail({
    from: `Maya Comunicação <${emailFrom}>`,
    to: `Maya Comunicação <${emailFrom}>`,
    subject: subject,
    html
  });
};
