import { useRouter } from 'next/router';
import { useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import BarSide from '../interface/barSide/BarSide';
import BackScrollToLeft from '../interface/button/BackScrollToLeft';
import CustomCursor, {
  handlesFn
} from '../interface/customCursor/customCursor';
import Menu from '../interface/menu/Menu';

interface Props {
  children: React.ReactNode;
  apiData: any;
}

const Container = styled.main`
  ${tw`
    flex
    flex-col lg:flex-row
    h-auto lg:h-screen

    pt-0.5 lg:pt-0
  `}
`;

export const ContainerMobile = styled.div`
  ${tw`
    overflow-x-hidden
  `}
`;

const BgNoise = styled.div``;

function Layout({ children, apiData }: Props) {
  const router = useRouter();
  const customCursorRef = useRef<handlesFn>(null);

  if (router.isFallback) return <div>Carregando...</div>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!customCursorRef.current) return;

    customCursorRef.current.updatePos(e);
  };

  return (
    <Container onMouseMove={handleMouseMove}>
      <BackScrollToLeft />

      <BgNoise className="bg" />

      <Menu apiData={apiData} />

      <BarSide />

      <CustomCursor ref={customCursorRef} />

      {children}
    </Container>
  );
}

export default Layout;
