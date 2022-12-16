import Image from 'next/image';
import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
    block
    relative

    w-auto
    h-full lg:h-screen
  `}

  aspect-ratio: 16 / 9;
`;

type Props = {
  galeriaDeImagemFull: ItemMap[];
};

type ItemMap = {
  sourceUrl: string;
  mediaDetails: {
    width: number;
    height: number;
  };
};

function Capa({ galeriaDeImagemFull }: Props) {
  return (
    <>
      {galeriaDeImagemFull.map((item: ItemMap, index: number) => {
        return (
          <Container key={`${index}`}>
            <Image
              src={item.sourceUrl}
              width={item.mediaDetails.width}
              height={item.mediaDetails.height}
              layout="responsive"
              objectFit="contain"
              objectPosition="center"
            />
          </Container>
        );
      })}
    </>
  );
}

export default Capa;
