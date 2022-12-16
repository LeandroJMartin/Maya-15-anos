import Image from 'next/image';
import styled from 'styled-components';
import tw from 'twin.macro';
import { color as ColorMaya } from '../../../../config/color.config';

const Container = styled.div`
  ${tw`
    flex
    flex-col lg:flex-row
    lg:w-[calc(100vw - 145px)]
    h-screen
  `}

  &:nth-child(even) {
    background-color: white;
  }

  &:nth-child(odd) {
    background-color: ${ColorMaya};
  }
`;

const CtImageR = styled.div`
  ${tw`
    block
    w-full lg:w-screen
    p-6 lg:p-20
    h-screen
  `}
`;

const CtImageL = styled(CtImageR)`
  ${tw`

  `}
`;

const Item = styled.div`
  ${tw`
    block
    relative
    w-full
    h-full
    overflow-hidden
  `}
`;

type Props = {
  ArrayUrl: {
    imagemDupla1: {
      sourceUrl: string;
    };
    imagemDupla2: {
      sourceUrl: string;
    };
  };
};

function ParallelBlock({ ArrayUrl }: Props) {
  return (
    <Container>
      <CtImageR>
        <Item>
          <Image
            src={ArrayUrl.imagemDupla1.sourceUrl}
            layout="fill"
            objectFit="cover"
          />
        </Item>
      </CtImageR>

      <CtImageL>
        <Item>
          <Image
            src={ArrayUrl.imagemDupla2.sourceUrl}
            layout="fill"
            objectFit="cover"
          />
        </Item>
      </CtImageL>
    </Container>
  );
}

export default ParallelBlock;
