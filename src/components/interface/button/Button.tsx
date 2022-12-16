import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import BlocksConfigs from '../../../config/blocks';

const Btn = styled.button`
  ${tw`
    py-3
    px-10
    text-greenMaya
    border
    border-greenMaya
    font-MayaBoldExpanded
    cursor-pointer

    hover:bg-greenMaya
    hover:text-white
    transition-all
  `}

  border-radius: ${BlocksConfigs.borderRadius};
`;

interface Props {
  text?: string;
}

export function Button({ text }: Props) {
  return <Btn>{text ? text : 'Lorem Ipsum'}</Btn>;
}

/* Button Black */
const BtnBlack = styled.button`
  ${tw`
    py-3
    px-10
    text-black
    border
    border-greenMaya
    font-MayaBoldExpanded
    cursor-pointer

    hover:bg-greenMaya
    transition-all
  `}

  border-radius: ${BlocksConfigs.borderRadius};
`;

interface Props {
  text?: string;
}

export function ButtonBlack({ text }: Props) {
  return <BtnBlack>{text ? text : 'Lorem Ipsum'}</BtnBlack>;
}
