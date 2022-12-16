import React from 'react';
import tw, { styled } from 'twin.macro';
import LowerImage from './LowerImage';
import TextoSuperior from './TextoSuperior';

const ContainerBanner = styled.div`
  ${tw`
    block
    relative
    lg:h-[calc(100vh - 146px)]
    overflow-hidden
    lg:pl-24
    lg:pt-3 xlg:pt-12
    lg:border-t
    border-greenMaya
  `}
`;

function Banner() {
  return (
    <ContainerBanner>
      <TextoSuperior />
      <LowerImage />
    </ContainerBanner>
  );
}

export default Banner;
