import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import {
  CtWord,
  Number,
  RowText,
  Word,
  WordDiasMobile,
  WordSmall
} from './TextoSuperior';
import Typist from 'react-typist-component';

const ContainerMobile = styled.div`
  ${tw`
    flex md:hidden
    items-center lg:items-start
    w-full lg:w-auto
  `}
`;

const TypedText = () => {
  const [key, setKey] = useState(true);

  return (
    <RowText>
      <ContainerMobile>
        <Number>15</Number>

        <Word>&nbsp;</Word>

        {key ? (
          <Typist
            typingDelay={100}
            cursor={<span>|</span>}
            startDelay={250}
            finishDelay={150}
            restartKey={key}
            onTypingDone={() => setKey((prev: boolean) => !prev)}
          >
            <CtWord>
              <Word>ANOS</Word>

              <br />

              <WordSmall>NÃO SÃO</WordSmall>

              <Typist.Delay ms={850} />

              <Typist.Backspace count={17} />
            </CtWord>
          </Typist>
        ) : (
          <Typist
            typingDelay={100}
            cursor={<span>|</span>}
            loop={true}
            startDelay={250}
            finishDelay={150}
            onTypingDone={() => setKey((prev: boolean) => !prev)}
          >
            <CtWord>
              <WordDiasMobile>DIAS</WordDiasMobile>

              <Typist.Delay ms={850} />

              <Typist.Backspace count={4} />
            </CtWord>
          </Typist>
        )}

        <Number hiddenInMobile={true}>15</Number>
      </ContainerMobile>
    </RowText>
  );
};

export default TypedText;
