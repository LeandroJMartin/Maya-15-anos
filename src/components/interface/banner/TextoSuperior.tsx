import styled from 'styled-components';
import tw from 'twin.macro';
import { motion } from 'framer-motion';
import { memo } from 'react';
import TypedText from './typedText';

interface NumberProps {
  hiddenInMobile?: boolean;
}

export const RowText = styled(motion.div)`
  ${tw`
    flex
    items-center
    justify-center lg:justify-start
    mb-3 md:mb-0
  `}
`;

export const Number = styled(motion.span)<NumberProps>`
  ${tw`
    text-[5.5rem] lg:text-[6rem] xlg:text-9xl
    font-MayaBoldExpanded
    tracking-[-10px] xlg:tracking-[-25px]
    text-greenMaya
  `}

  display: ${(props) => (props.hiddenInMobile ? 'none' : null)};

  @media (min-width: 1024px) {
    display: block;
  }
`;

export const CtWord = styled(motion.div)`
  ${tw`
    ml-4 lg:ml-2 xlg:ml-6
  `}
`;

export const Word = styled(motion.span)`
  ${tw`
    text-4xl lg:text-5xl xlg:text-6xl
    font-MayaBoldExpanded
    tracking-[-5px]
    `}
`;

export const WordSmall = styled(Word)`
  ${tw`
    font-MayaExpanded
    text-[1.45rem] lg:text-[1.94rem] xlg:text-[2.4rem]
    tracking-[-4px] lg:tracking-[-5px]
  `}
`;

const WordDias = styled(Word)`
  ${tw`
    hidden md:flex
    text-7xl xlg:text-9xl
    font-MayaBoldExpanded
    tracking-[-5px]
    ml-5
  `}
`;

export const WordDiasMobile = styled(Word)`
  ${tw`
    inline-block md:hidden
    text-[2.79rem] xlg:text-9xl
    font-MayaBoldExpanded
    tracking-[-5px]
    ml-0
  `}
`;

const variantsContainer = {
  hidden: {
    opacity: 0
  },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1 * i
    }
  })
};

const ContainerDesktop = styled.div`
  ${tw`
    hidden md:flex
    items-center
  `}
`;

const variantsItem = {
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 150
    }
  },
  hidden: {
    opacity: 1,
    y: -25,
    x: -25,
    scale: 1.2,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 150
    }
  }
};

function TextoSuperior() {
  const idade = [1, 5];
  const fraseSuperior = ['A', 'N', 'O', 'S'];
  const fraseInferiorSmall = ['N', 'Ã', 'O', ' ', 'S', 'Ã', 'O'];
  const dias = ['D', 'I', 'A', 'S'];

  return (
    <RowText variants={variantsContainer} initial="hidden" animate="visible">
      <ContainerDesktop>
        {idade?.map((item, i) => {
          return (
            <Number key={i} variants={variantsItem}>
              {item}
            </Number>
          );
        })}

        <CtWord variants={variantsItem}>
          {fraseSuperior?.map((item, i) => {
            return (
              <Word key={i} variants={variantsItem}>
                {item}
              </Word>
            );
          })}

          <br />

          {fraseInferiorSmall?.map((item, i) => {
            return (
              <WordSmall key={i} variants={variantsItem}>
                {item === ' ' ? '\u00a0\u00a0' : item}
              </WordSmall>
            );
          })}

          <br />

          {dias?.map((item, i) => {
            return (
              <WordDiasMobile key={i} variants={variantsItem}>
                {item}
              </WordDiasMobile>
            );
          })}
        </CtWord>

        {idade?.map((item, i) => {
          return (
            <Number key={i} variants={variantsItem} hiddenInMobile={true}>
              {item}
            </Number>
          );
        })}

        {dias?.map((item, i) => {
          return (
            <WordDias key={i} variants={variantsItem}>
              {item}
            </WordDias>
          );
        })}
      </ContainerDesktop>

      <TypedText />
    </RowText>
  );
}

export default memo(TextoSuperior);
