import { memo, useEffect, useState } from 'react';
import Marquee from 'react-easy-marquee';
import styled from 'styled-components';
import tw from 'twin.macro';
import HeartImg from '../../../assets/img/heart.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Container = styled.div`
  ${tw`
    flex
    justify-center
    items-center
    bg-white
    h-screen lg:h-full
    border
    border-greenMaya
    relative

    min-w-full
    lg:min-w-[calc((100vw - 150px) / 2)]
    xlg:min-w-[calc((100vw - 150px) / 3)]

    w-full
    lg:w-[calc((100vw - 150px) / 2)]
    xlg:w-[calc((100vw - 150px) / 3)]
  `}
`;

const CtImage = styled.div`
  ${tw`
    absolute
    max-w-[300px]
    max-h-[365px]
    z-40
  `}

  transform: translate(10px, -50px);
`;

const Text = styled.h2`
  ${tw`
    block
    mx-auto
    font-MayaBoldExpanded
    text-greenMaya
    text-8xl
    whitespace-nowrap
    pointer-events-none
    select-none
  `}

  writing-mode: vertical-lr;
  transform: rotate(180deg);
`;

const Text2 = styled(Text)`
  ${tw`
    text-7xl
  `}
`;

const Text3 = styled(Text)`
  ${tw`
    font-MayaExpanded
    text-6xl
  `}
`;

/* Config */
const itens = new Array(4).fill(1);

const timers = [
  10000, 10500, 11000, 11500, 12000, 13000, 13500, 14000, 14500, 15500, 16000,
  16500
];

const frase = 'Criatividade muda tudo';
/* Config */

function Heart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1000);
  }, []);

  const RandomNumberTimer = () => {
    const randomTimer = Number((Math.random() * timers.length).toFixed());
    return timers[randomTimer];
  };

  const RandomDirection = () => {
    const randomTimer = Number((Math.random() * 1).toFixed());
    if (randomTimer === 0) return false;
    return true;
  };

  const RandomTextSize = () => {
    return Number((Math.random() * 2 + 1).toFixed());
  };

  return (
    <Container>
      <CtImage>
        <motion.div
          className="relative"
          animate={{
            scale: [1.02, 1.03, 1.01, 1, 1.03, 1.02, 1, 1.03, 1.04, 1.01, 1]
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          <Image src={HeartImg} alt="imagem coração" />
        </motion.div>
      </CtImage>

      {isMounted &&
        itens.map((item, index) => {
          const compItem = RandomTextSize();

          return (
            <Marquee
              key={index}
              height="100vh"
              width="fit-content"
              axis="Y"
              reverse={RandomDirection()}
              duration={RandomNumberTimer()}
              className="min-w-[90px] w-auto"
            >
              {compItem === 1 && <Text>{frase}</Text>}
              {compItem === 2 && <Text2>{frase}</Text2>}
              {compItem === 3 && <Text3>{frase}</Text3>}
            </Marquee>
          );
        })}
    </Container>
  );
}

export default memo(Heart);
