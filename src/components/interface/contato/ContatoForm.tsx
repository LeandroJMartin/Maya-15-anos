import styled from 'styled-components';
import tw from 'twin.macro';
import BlockWidthConfig from '../../../config/blocks';
import { ButtonBlack } from '../button/Button';
import {
  IconFacebook,
  IconInstagram,
  IconLinked,
  MapMarker
} from '../socialcons/SocialIcons';
import AnimationDiv from '../animationDiv/AnimationDiv';
import { memo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import ErrorForm from '../errors/errorForm';
import axios from 'axios';

const Container = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
    h-full
    bg-white
    border
    border-greenMaya
    lg:py-24
    px-8 lg:px-16

    min-w-full
    lg:min-w-[calc((100vw - 150px) / 2)]
    xlg:min-w-[calc((100vw - 150px) / 3)]

    w-full
    lg:w-[calc((100vw - 150px) / 2)]
    xlg:w-[calc((100vw - 150px) / 3)]
  `}
`;

const Title = styled.h1`
  ${tw`
    font-MayaBoldExpanded
    text-greenMaya
    text-4xl md:text-5xl
    mb-4
  `}
`;

const Form = styled.form`
  ${tw`
    flex
    flex-col
    mb-10
  `}

  input, textarea {
    ${tw`
      border
      border-greenMaya
      mb-4 lg:mb-1.5 xlg:mb-4
      p-2
      text-black
    `}

    border-radius: ${BlockWidthConfig.borderRadius};
  }

  textarea {
    ${tw`
      resize-none
      h-[90px]
    `}
  }
`;

const CtSocialIcons = styled.div`
  ${tw`
    flex
  `}

  & div {
    ${tw`
      mr-3 lg:mr-0
    `}
  }
`;

const ParagEnd = styled.div`
  ${tw`
    block
    pl-1.5
    py-3
    text-black
  `}

  p {
    ${tw`
      text-sm
    `}
  }

  a {
    ${tw`
      block
      pt-1.5
      font-MayaBoldExpanded
      text-greenMaya
      text-2xl
    `}
  }
`;

type Props = {
  apiData: any;
};

type IFormInputs = {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  empresa: string;
  numColaboradores: string;
  mensagem: string;
};

const schema = yup
  .object({
    nome: yup
      .string()
      .required('O campo nome é obrigatório.')
      .min(3, 'Digite 3 caracteres.'),
    email: yup
      .string()
      .required('O campo e-mail é obrigatório.')
      .email('Digite um e-mail válido.'),
    telefone: yup
      .string()
      .required('O campo telefone é obrigatório.')
      .matches(
        /\(\d{2}\) \d{5}-\d{4}/,
        'Digite um telefone válido. ex: (99) 99999-9999.'
      ),
    cargo: yup
      .string()
      .required('O campo cargo é obrigatório.')
      .min(3, 'Digite 3 caracteres.'),
    empresa: yup
      .string()
      .required('O campo empresa é obrigatório.')
      .min(3, 'Digite 3 caracteres.'),
    numColaboradores: yup
      .string()
      .required('O campo colaboradores é obrigatório.'),
    mensagem: yup.string().required('O campo mensagem é obrigatório.')
  })
  .required();

function ContatoForm({ apiData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const [sending, setSending] = useState(false);

  const onSubmit = (data: IFormInputs) => {
    setSending(true);

    axios
      .post('./api/contato', data)
      .then((res: any) => {
        setSending(false);
      })
      .catch((error: any) => {
        setSending(false);
      });
  };

  return (
    <Container
      className={Object.keys(errors).length > 0 ? 'py-4' : undefined}
      id="contact"
    >
      <AnimationDiv center={true} fullScreen={true}>
        <Title>Contato</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Nome"
            className={errors.nome?.message ? 'mb-0' : undefined}
            {...register('nome')}
          />
          {errors.nome?.message && <ErrorForm msg={errors.nome.message} />}

          <input
            type="email"
            placeholder="Email"
            className={errors.email?.message ? 'mb-0' : undefined}
            {...register('email')}
          />
          {errors.email?.message && <ErrorForm msg={errors.email.message} />}

          <Controller
            name="telefone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="(99) 99999-9999"
                maskChar=" "
                placeholder="Telefone"
                className={errors.telefone?.message ? 'mb-0' : undefined}
              />
            )}
          />
          {errors.telefone?.message && (
            <ErrorForm msg={errors.telefone.message} />
          )}

          <input
            type="text"
            placeholder="Cargo"
            className={errors.telefone?.message ? 'mb-0' : undefined}
            {...register('cargo')}
          />
          {errors.cargo?.message && <ErrorForm msg={errors.cargo.message} />}

          <input
            type="text"
            placeholder="Empresa"
            className={errors.empresa?.message ? 'mb-0' : undefined}
            {...register('empresa')}
          />
          {errors.empresa?.message && (
            <ErrorForm msg={errors.empresa.message} />
          )}

          <input
            type="text"
            placeholder="Número de colaboradores"
            className={errors.numColaboradores?.message ? 'mb-0' : undefined}
            {...register('numColaboradores')}
          />
          {errors.numColaboradores?.message && (
            <ErrorForm msg={errors.numColaboradores.message} />
          )}

          <textarea
            placeholder="Mensagem"
            className={errors.mensagem?.message ? 'mb-0' : undefined}
            {...register('mensagem')}
          />
          {errors.mensagem?.message && (
            <ErrorForm msg={errors.mensagem.message} />
          )}

          <ButtonBlack text={sending ? 'Enviando...' : 'Fale com a gente'} />
        </Form>

        <CtSocialIcons>
          <MapMarker linkMapa={apiData.informacoes.linkMapa} padding="Rigth" />
          <IconLinked
            linkLinkedin={apiData.redesSociais.linkedin}
            padding="Rigth"
          />
          <IconInstagram
            linkInstagram={apiData.redesSociais.instagram}
            padding="Rigth"
          />
          <IconFacebook
            linkFacebook={apiData.redesSociais.facebook}
            padding="Rigth"
          />
        </CtSocialIcons>

        <ParagEnd>
          <p>{apiData.informacoes.endereco.rua}</p>
          <p>{apiData.informacoes.endereco.cidade}</p>

          <a href={`tel:${apiData.informacoes.telefone}`}>
            {apiData.informacoes.telefoneLabel}
          </a>
        </ParagEnd>
      </AnimationDiv>
    </Container>
  );
}

export default memo(ContatoForm);
