import Image from 'next/image';
import styled from 'styled-components';
import tw from 'twin.macro';
import BlockWidthConfig from '../../../config/blocks';
import { Button } from '../button/Button';
import Eye from '../../../assets/img/eyeContact.png';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import ErrorForm from '../errors/errorForm';
import axios from 'axios';
import { useState } from 'react';

const Container = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    w-full
    xlg:py-10
    xlg:px-20
    mb-4 lg:mb-0
  `}
`;

const CtImage = styled.div`
  ${tw`
    flex
    justify-center
    w-full xlg:w-[50%]
    h-auto
    xlg:py-8

    order-2 lg:order-1
  `}

  .innerDiv {
    ${tw`
      relative
      w-[130px] xlg:w-full
      h-[130px] xlg:h-[90%]
    `}
  }
`;

const Form = styled.form`
  ${tw`
    flex
    flex-col
    w-full
    order-1 lg:order-2
    mb-8 lg:mb-0
  `}

  input, textarea {
    ${tw`
      border
      border-greenMaya
      mb-4
      p-2
      bg-transparent
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

type IFormInputs = {
  nome: string;
  email: string;
  celular: string;
  instituicao: string;
  cargo: string;
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
    celular: yup
      .string()
      .required('O campo celular é obrigatório.')
      .matches(
        /\(\d{2}\) \d{5}-\d{4}/,
        'Digite um número válido. ex: (99) 99999-9999.'
      ),
    instituicao: yup
      .string()
      .required('O campo instituição é obrigatório.')
      .min(3, 'Digite 3 caracteres.'),
    cargo: yup
      .string()
      .required('O campo cargo é obrigatório.')
      .min(3, 'Digite 3 caracteres.'),
    mensagem: yup.string().required('O campo mensagem é obrigatório.')
  })
  .required();

function ContatoFormProBono() {
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
      .post('./api/contatoProbono', data)
      .then((res: any) => {
        setSending(false);
      })
      .catch((error: any) => {
        setSending(false);
      });
  };

  return (
    <Container>
      <CtImage>
        <motion.div
          animate={{
            y: [-35, 0, -25],
            x: ['100%', '-100%'],
            rotate: [0, 50, -17, 0],
            scale: [0.95, 1, 1.01]
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            type: 'spring',
            duration: 6,
            delay: 0.5
          }}
        >
          <div className="innerDiv">
            <Image src={Eye} />
          </div>
        </motion.div>
      </CtImage>

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
          name="celular"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputMask
              {...field}
              mask="(99) 99999-9999"
              maskChar=" "
              placeholder="Celular"
              className={errors.celular?.message ? 'mb-0' : undefined}
            />
          )}
        />
        {errors.celular?.message && <ErrorForm msg={errors.celular.message} />}

        <input
          type="text"
          placeholder="Nome da instituição"
          className={errors.instituicao?.message ? 'mb-0' : undefined}
          {...register('instituicao')}
        />
        {errors.instituicao?.message && (
          <ErrorForm msg={errors.instituicao.message} />
        )}

        <input
          type="text"
          placeholder="Cargo"
          className={errors.cargo?.message ? 'mb-0' : undefined}
          {...register('cargo')}
        />
        {errors.cargo?.message && <ErrorForm msg={errors.cargo.message} />}

        <textarea
          placeholder="Fale do seu projeto e como podemos ajudar"
          className={errors.mensagem?.message ? 'mb-0' : undefined}
          {...register('mensagem')}
        />
        {errors.mensagem?.message && (
          <ErrorForm msg={errors.mensagem.message} />
        )}

        <Button text={sending ? 'Enviando...' : 'Fale com a gente'} />
      </Form>
    </Container>
  );
}

export default ContatoFormProBono;
