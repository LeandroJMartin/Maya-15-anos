import { generateHtmlFromContactEmail } from '@/src/lib/mjml';
import { sendEmailWithSendGrid } from '@/src/lib/sendgrid';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nome, email, telefone, cargo, empresa, numColaboradores, mensagem } =
    req.body;

  const { html } = generateHtmlFromContactEmail({
    nome,
    email,
    telefone,
    cargo,
    empresa,
    numColaboradores,
    mensagem
  });

  try {
    const response = await axios.post(
      'https://painel.mayacomunicacao.com.br/api/send_email/send_mail.php',
      { html: html, subject: 'Novo contato via site.' }
    );
    if (response) {
      res.status(200).json({ success: true, response });
    }
  } catch (error: any) {
    res.status(503).json(error);
  }

  // try {
  //   const response = await sendEmailWithSendGrid(
  //     html,
  //     'Novo contato via site.'
  //   );
  //   if (response) {
  //     res.status(200).json({ success: true, response });
  //   }
  // } catch (error: any) {
  //   res.status(503).json(error);
  // }
}
