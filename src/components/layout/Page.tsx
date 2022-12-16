import { ReactNode } from 'react';
import Head from 'next/head';
import { BaseSEOConfig } from '../../config/seo.config';
import styled from 'styled-components';
import tw from 'twin.macro';
import { color } from '@/src/config/color.config';

interface Props {
  title?: string;
  description?: string;
  children: ReactNode;
}

const Container = styled.div`
  ${tw`
    block
    w-full
  `}
`;

function Page({ title, description, children }: Props) {
  title = title ? `${BaseSEOConfig.title} - ${title}` : BaseSEOConfig.title;
  description = description ? description : BaseSEOConfig.description;

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={color} />
      </Head>

      {children}
    </Container>
  );
}

export default Page;
