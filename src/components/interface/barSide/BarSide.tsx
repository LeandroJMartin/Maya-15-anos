import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import LogoMaya from '../logo/Logo';
import Hamburguer from './Hamburguer';
import SvgCenter from './SvgCenter';

const ContainerBarSide = styled.div`
  ${tw`
    flex
    flex-row-reverse lg:flex-col
    justify-between

    w-full lg:w-[150px]
    min-w-full lg:min-w-[150px]

    h-auto lg:h-screen
    max-h-[110px] lg:max-h-screen

    overflow-hidden

    border
    border-solid
    border-greenMaya
  `}
`;

function BarSide() {
  return (
    <ContainerBarSide>
      <Hamburguer />

      <SvgCenter svgBarSide={true} />

      <Link href="/" passHref={true}>
        <a aria-label="icone para página home">
          <LogoMaya border={true} />
        </a>
      </Link>
    </ContainerBarSide>
  );
}

export default BarSide;
