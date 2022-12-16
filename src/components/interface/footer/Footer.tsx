import { memo, useEffect, useState } from 'react';
import Marquee from 'react-easy-marquee';
import styled from 'styled-components';
import tw from 'twin.macro';
import AsteriscoSVG from './AsteriscoSVG';

const ContainerFooter = styled.div`
  ${tw`
    flex
    flex-nowrap
    items-center
    h-[146px]
    min-h-[146px]
    border-t
    border-b
    border-solid
    border-greenMaya
    overflow-hidden
    relative
  `}
`;

const Criatividade = styled.div`
  ${tw`
    flex
    items-center
    px-4
  `}

  span {
    ${tw`
      text-xl
      font-MayaExpanded
      pl-2
      whitespace-nowrap
    `}
  }
`;

const totalItens = [1, 1, 1];

const CriatividadeItem = () => {
  return (
    <Criatividade>
      <AsteriscoSVG />
      <span>Criatividade muda tudo</span>
    </Criatividade>
  );
};

function Footer() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <ContainerFooter>
      <Marquee duration={42000} reverse={true}>
        {totalItens.map((item: number, index: number) => {
          return <CriatividadeItem key={index} />;
        })}
      </Marquee>
    </ContainerFooter>
  );
}

export default memo(Footer);
