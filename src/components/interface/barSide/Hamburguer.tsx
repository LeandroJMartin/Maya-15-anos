import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMenu } from '../../../context/menuContext';

const Container = styled.div`
  ${tw`
    flex

    w-[110px] lg:w-full
    min-w-[110px]

    h-[110px] lg:h-[145px]
    min-h-[100px] lg:min-h-[145px]

    justify-center
    items-center
    lg:border-b
    border-l lg:border-l-0
    border-solid
    border-greenMaya
    cursor-pointer
  `}
`;

const ContainerIcons = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
    items-center
  `}
`;

const Icon = styled.span`
  ${tw`
      block
      w-[43px]
      h-[5px]
      mb-[4px]
      border
      border-greenMaya
      transition-colors
      group-hover:bg-greenMaya
  `}
`;

function Hambuguer() {
  const { openMenu } = useMenu();

  const handleClickOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    openMenu(true);
  };

  return (
    <Container className="group" onClick={handleClickOpen}>
      <ContainerIcons>
        <Icon />
        <Icon />
        <Icon />
      </ContainerIcons>
    </Container>
  );
}

export default Hambuguer;
