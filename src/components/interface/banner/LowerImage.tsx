import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';
import tw from 'twin.macro';
import ImgAmpulheta from '../../../assets/img/ampulheta.png';

const Container = styled.div`
  ${tw`
    flex
    flex-col lg:flex-row
    items-center
    lg:h-[calc(100% - 8rem)]
  `}
`;

const FirstCol = styled.div`
  ${tw`
    block
    w-full xlg:w-[70%]
    h-full
    mr-0 xlg:mr-32
    order-2 lg:order-1
  `}
`;

const CtImg = styled(motion.div)`
  ${tw`
    flex
    justify-center
    relative
    w-auto
    h-full
    overflow-hidden

    p-4

    lg:top-[-20px] xlg:top-0
    lg:left-[-10%] xlg:left-0
  `}

  img {
    ${tw`
      block
      w-full
      h-full
      object-contain
      object-center
    `}
  }
`;

const CtWord = styled(motion.div)`
  ${tw`
    block
    h-full
    py-0 xlg:py-20
    px-6 lg:px-0
    lg:pr-28
    order-1 lg:order-2
  `}

  p {
    ${tw`
      block
      font-MayaRegular
      text-base lg:text-lg xlg:text-2xl
      mb-2 xlg:mb-14
    `}

    &:last-child {
      ${tw`
        mb-0
      `}
    }
  }
`;

function LowerImage() {
  return (
    <Container>
      <FirstCol>
        <CtImg
          // initial={{
          //   scale: 0.2,
          //   rotate: -60,
          //   opacity: 0
          // }}
          animate={{
            // scale: 1,
            rotate: 360
            // opacity: 1
          }}
          transition={{
            duration: 60,
            repeat: Infinity
          }}
        >
          <Image src={ImgAmpulheta} alt="imagem de ampulheta" priority={true} />
        </CtImg>
      </FirstCol>

      <CtWord
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <p>
          Assim como uma história não é escrita por acaso. <br /> Quem nos
          trouxe até aqui não foi a sorte. Mas sim a vontade de vencer o azar.
        </p>

        <p>
          Durante esse tempo, nos tornamos inconformados com o óbvio. E cada
          trabalho trouxe um compromisso: colocar boas ideias na rua.
        </p>

        <p>
          Para que a história nunca tenha um ponto final, continuamos ouvindo a
          nossa intuição. Acreditando num olhar mais crítico sobre as coisas e
          as pessoas. <br />
          <br />
          E, principalmente, apostando no nosso talento de fazer acontecer.
        </p>
      </CtWord>
    </Container>
  );
}

export default LowerImage;
