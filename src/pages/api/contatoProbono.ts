import { generateHtmlFromContactProbonoEmail } from '@/src/lib/mjml';
import { sendEmailWithSendGrid } from '@/src/lib/sendgrid';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nome, email, celular, instituicao, cargo, mensagem } = req.body;

  const { html } = generateHtmlFromContactProbonoEmail({
    nome,
    email,
    celular,
    instituicao,
    cargo,
    mensagem
  });

  try {
    const response = await sendEmailWithSendGrid(
      html,
      'Novo contato via site - Pró-Bono.'
    );
    if (response) {
      res.status(200).json({ success: true });
    }
  } catch (error: any) {
    res.status(503).json(error);
  }
}
