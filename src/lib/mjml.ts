import mjml2html from 'mjml';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { color } from '../config/color.config';

export const generateHtmlFromContactEmail = ({
  nome,
  email,
  telefone,
  cargo,
  empresa,
  numColaboradores,
  mensagem
}: IDataContactEmail) =>
  mjml2html(`
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-image width="240px" src="https://maya-2022-15-anos.vercel.app/logo.svg"></mj-image>
          <mj-divider border-color="#dfdfdf"></mj-divider>
          <mj-text font-size="20px" color=${color} font-family="helvetica">Novo contato via site:</mj-text>
          <mj-table font-size="14px" cellpadding="2px">
            <tr>
              <td width="200px">Nome:</td>
              <td>${nome}</td>
            </tr>
            <tr>
              <td width="200px">E-mail:</td>
              <td>${email}</td>
            </tr>
            <tr>
              <td width="200px">Telefone:</td>
              <td>${telefone}</td>
            </tr>
            <tr>
              <td width="200px">Cargo:</td>
              <td>${cargo}</td>
            </tr>
            <tr>
              <td width="200px">Empresa:</td>
              <td>${empresa}</td>
            </tr>
            <tr>
              <td width="200px">Número Colaboradores:</td>
              <td>${numColaboradores}</td>
            </tr>
            <tr>
              <td width="200px">Data:</td>
              <td>${dayjs(new Date())
                .locale('pt-BR')
                .format('DD [de] MMMM [de] YYYY')}</td>
            </tr>
          </mj-table>
          <mj-text font-size="14px">Mensagem: ${mensagem}</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`);

export const generateHtmlFromContactProbonoEmail = ({
  nome,
  email,
  celular,
  instituicao,
  cargo,
  mensagem
}: IDataContactProbonoEmail) =>
  mjml2html(`
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-image width="240px" src="https://maya-2022-15-anos.vercel.app/logo.svg"></mj-image>
          <mj-divider border-color="#dfdfdf"></mj-divider>
          <mj-text font-size="20px" color=${color} font-family="helvetica">Novo contato via site - Pró-Bono:</mj-text>
          <mj-table font-size="14px" cellpadding="2px">
            <tr>
              <td width="200px">Nome:</td>
              <td>${nome}</td>
            </tr>
            <tr>
              <td width="200px">E-mail:</td>
              <td>${email}</td>
            </tr>
            <tr>
              <td width="200px">Celular:</td>
              <td>${celular}</td>
            </tr>
            <tr>
              <td width="200px">Instituição:</td>
              <td>${instituicao}</td>
            </tr>
            <tr>
              <td width="200px">Cargo:</td>
              <td>${cargo}</td>
            </tr>
            <tr>
              <td width="200px">Data:</td>
              <td>${dayjs(new Date())
                .locale('pt-BR')
                .format('DD [de] MMMM [de] YYYY')}</td>
            </tr>
          </mj-table>
          <mj-text font-size="14px">Mensagem: ${mensagem}</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`);

export type IDataContactEmail = {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  empresa: string;
  numColaboradores: string;
  mensagem: string;
};

export type IDataContactProbonoEmail = {
  nome: string;
  email: string;
  celular: string;
  instituicao: string;
  cargo: string;
  mensagem: string;
};
