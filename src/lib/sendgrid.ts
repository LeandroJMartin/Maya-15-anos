import sendGrid from '@sendgrid/mail';
import { QueryEmailForm } from './querys';

export const sendEmailWithSendGrid = async (html: string, subject: string) => {
  const API_KEY = process.env.SENDGRID_API_KEY;

  if (!API_KEY) return;

  sendGrid.setApiKey(API_KEY);

  const emailFrom = await (await QueryEmailForm.queryExecute()).email;

  if (!emailFrom) return;

  const _data = {
    from: `Maya Comunicação <${emailFrom}>`,
    to: `Maya Comunicação <${emailFrom}>`,
    subject: subject,
    html
  };

  try {
    return await sendGrid.send(_data);
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
      return null;
    }
  }
};
