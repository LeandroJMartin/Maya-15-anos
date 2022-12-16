import { GetStaticProps } from 'next';
import styled from 'styled-components';
import tw from 'twin.macro';
import AnimationDiv from '../components/interface/animationDiv/AnimationDiv';
import ContatoFormProBono from '../components/interface/contato/ContatoFormProBono';
import { motion } from 'framer-motion';
import { executeAllQuerys } from '../lib/querys';
import Page from '../components/layout/Page';

const Container = styled.div`
  ${tw`
    flex
    flex-col lg:flex-row
    w-full
    h-screen
    lg:border-t
    lg:border-r
    lg:border-b
    border-greenMaya
    p-4 lg:p-12 xlg:p-20
  `}
`;

const ContainerContentR = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
    lg:w-1/2 xlg:w-7/12
    h-full
    lg:pr-4 xlg:pr-0
    mb-4 lg:mb-0
  `}
`;

const ContainerContentL = styled.div`
  ${tw`
    flex
    flex-col
    lg:w-1/2 xlg:w-5/12
    h-full
    lg:pl-4 xlg:pl-0
  `}
`;

const Title = styled(motion.h1)`
  ${tw`
    font-MayaBoldExpanded
    text-2xl lg:text-4xl xlg:text-6xl
    text-greenMaya
    leading-[1.5]
    mb-1.5 lg:mb-8 xlg:mb-16
  `}
`;

const Parag = styled(motion.p)`
  ${tw`
    font-MayaRegular
    text-base xlg:text-lg
    leading-[2.0] xlg:leading-[2.8]
  `}
`;

interface AnimationParagProps {
  children: React.ReactNode;
}

const AnimationParag = ({ children }: AnimationParagProps) => {
  return (
    <Parag
      initial={{
        opacity: 0,
        y: 15
      }}
      animate={{
        scale: [1.09, 1],
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5,
        delay: 0.4
      }}
    >
      {children}
    </Parag>
  );
};

function Probono() {
  return (
    <Page title={'Pró-bono'}>
      <Container>
        <ContainerContentR>
          <AnimationDiv center={true}>
            <Title
              animate={{
                scale: [1.1, 1]
              }}
              transition={{
                duration: 0.6
              }}
            >
              O que a gente sempre recebeu também pode voltar para a sociedade.
            </Title>

            <AnimationParag>
              Aqui na Maya existe um pensamento em comum muito simples: tudo o
              que fazemos hoje, reflete no futuro. Por isso, de alguma forma, a
              gente quer ajudar a construí-lo de um jeito melhor. Que seja pela
              comunicação ou só em um bate-papo. O importante mesmo é contribuir
              para novas causas.
            </AnimationParag>

            <br />
            <br className="hidden xlg:block" />

            <AnimationParag>
              Se você pertence a alguma instituição filantrópica, ONG ou
              coletivo de colaboração social, envie seu projeto para a Maya.
              Juntos, podemos transformar muita coisa.
            </AnimationParag>
          </AnimationDiv>
        </ContainerContentR>

        <ContainerContentL>
          <AnimationDiv center={true}>
            <ContatoFormProBono />
          </AnimationDiv>
        </ContainerContentL>
      </Container>
    </Page>
  );
}

export default Probono;

export const getStaticProps: GetStaticProps = async () => {
  const apiData = await executeAllQuerys();

  return {
    props: {
      apiData
    },
    revalidate: 20
  };
};
