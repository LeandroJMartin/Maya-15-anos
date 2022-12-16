import styled from 'styled-components';
import tw from 'twin.macro';
import Svg from './Svg';

interface Props {
  border: boolean;
  color?: 'black';
  scale?: boolean;
}

const padding = '18px';

const Container = styled.div<Props>`
  ${tw`
    flex
    w-[110px] lg:w-full
    h-[110px] lg:h-[145px]
    justify-center
    items-center
    lg:pt-[${padding}]
    lg:pl-[${padding}]
    lg:pr-[${padding}]
    pb-[18px] lg:pb-[24px]
    border-solid
    border-greenMaya
  `}

  border-top-width: 0;
  border-right-width: ${(props) => (props.border ? '1px' : null)};

  transform: ${(props) => (props.scale ? 'scale(1.6)' : 'scale(1)')};

  @media (min-width: 1024px) {
    border-top-width: ${(props) => (props.border ? '1px' : null)};
    border-right-width: 0;

    transform: scale(1);
  }
`;

function LogoMaya({ border, color, scale }: Props) {
  return (
    <Container border={border} scale={scale}>
      <Svg color={color} />
    </Container>
  );
}

export default LogoMaya;
