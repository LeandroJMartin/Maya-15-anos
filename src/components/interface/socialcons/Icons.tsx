import { BsFillCaretLeftFill, BsFillCaretUpFill } from 'react-icons/bs';
import styled from 'styled-components';
import tw from 'twin.macro';

const size = '50px';

const Container = styled.div`
  &:hover > svg {
    ${tw`
        transition
      `}

    fill: white;
  }
`;

interface Props {
  sizeProp?: number;
}

export function IconArrowLeft({ sizeProp }: Props) {
  return (
    <Container>
      <BsFillCaretLeftFill
        size={sizeProp ? `${sizeProp}px` : size}
        color="#111"
      />
    </Container>
  );
}

export function IconArrowUp({ sizeProp }: Props) {
  return (
    <Container>
      <BsFillCaretUpFill
        size={sizeProp ? `${sizeProp}px` : size}
        color="#111"
      />
    </Container>
  );
}
