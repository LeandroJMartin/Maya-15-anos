import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMenu } from '../../../context/menuContext';
import useDispatchEventScroll from '../../../hooks/useDispatchEventScroll';
import LogoMaya from '../logo/Logo';
import { IconArrowLeft } from '../socialcons/Icons';
import {
  IconFacebook,
  IconInstagram,
  IconLinked,
  IconMail,
  IconPhone,
  MapMarker
} from '../socialcons/SocialIcons';
import { GrClose } from 'react-icons/gr';
import { useRouter } from 'next/router';

interface ContainerProps {
  isOpen: boolean;
}

const Container = styled.div<ContainerProps>`
  ${tw`
    flex
    flex-col-reverse lg:flex-row
    justify-between
    items-center
    w-full
    h-full
    absolute
    top-0
    left-0
    z-50
    bg-greenMaya
    transition
    duration-300
    p-8 lg:p-0
  `}

  transform: ${(props) =>
    props.isOpen ? 'translateY(0vh)' : 'translateY(-150vh)'};

  @media (min-width: 1024px) {
    transform: ${(props) =>
      props.isOpen ? 'translateX(0vw)' : 'translateX(-150vw)'};
  }
`;

const ContainerBarSide = styled.div`
  ${tw`
    hidden lg:flex
    flex-row lg:flex-col
    justify-center
    items-center
    min-w-[330px]
    w-[330px]
    min-h-full
    h-full
    relative
  `}
`;

const ContainerBarSideMobile = styled.div`
  ${tw`
    flex lg:hidden
    flex-row
    justify-center
    items-center
    w-full
  `}
`;

const CtLogo = styled.div`
  ${tw`
    hidden lg:flex
    justify-center
    items-center
    w-full
    h-auto
    p-14
  `}
`;

const CtLogoMobile = styled(CtLogo)`
  ${tw`
    flex lg:hidden
    p-0
  `}
`;

const ContainerIconsSocial = styled.div`
  ${tw`
    flex
    flex-row lg:flex-col
    justify-between
    items-center
    w-full lg:w-auto
  `}
`;

const ContainerContent = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
    items-center lg:items-start
    w-full
    lg:h-full
    pl-0 lg:pl-[40px] xlg:pl-[220px]
  `}
`;

const TitleLinks = styled.h3`
  ${tw`
    block
    text-[2.5rem] md:text-7xl lg:text-8xl xlg:text-9xl
    font-MayaBoldExpanded
    text-black
    py-3
    cursor-pointer
  `}

  &:hover a {
    ${tw`
      transition
      text-white
    `}
  }

  &:last-child {
    ${tw`
      mb-0
    `}
  }
`;

const CtButtonClose = styled.div`
  ${tw`
    hidden lg:flex
    justify-center
    items-center
    absolute
    top-[50%]
    translate-y-[-50%]
    right-3.5
    w-auto
    h-auto
    cursor-pointer
  `}
`;

const CtButtonCloseMobile = styled.div`
  ${tw`
    flex lg:hidden
    justify-center
    items-center
    relative
    w-auto
    h-auto
    cursor-pointer

    rotate-90
  `}
`;

const CtButtonCloseX = styled.div`
  ${tw`
    hidden lg:flex
    justify-center
    items-center
    absolute
    top-[25px] xlg:top-[80px]
    w-auto
    h-auto
    cursor-pointer
  `}

  & > svg {
    ${tw`
      w-[25px] xlg:w-[35px]
      h-[25px] xlg:h-[35px]
    `}
  }

  &:hover > svg {
    path {
      ${tw`
        transition-all
      `}

      stroke: white;
    }
  }
`;

type Props = {
  apiData: any;
};

function Menu({ apiData }: Props) {
  const { state: isOpen, openMenu } = useMenu();
  const { dispatch } = useDispatchEventScroll();
  const router = useRouter();

  const handleClickCloseMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    openMenu(false);
  };

  const handleClickContact = (e: React.MouseEvent<HTMLHRElement>) => {
    e.preventDefault();
    dispatch();
  };

  return (
    <Container isOpen={isOpen}>
      <CtButtonCloseMobile onClick={handleClickCloseMenu}>
        <IconArrowLeft />
      </CtButtonCloseMobile>

      <ContainerBarSide>
        <CtButtonCloseX onClick={handleClickCloseMenu}>
          <GrClose />
        </CtButtonCloseX>

        <ContainerIconsSocial>
          <IconFacebook
            linkFacebook={apiData.redesSociais.facebook}
            color="black"
            padding="Bottom"
          />
          <IconInstagram
            linkInstagram={apiData.redesSociais.instagram}
            color="black"
            padding="Bottom"
          />
          <IconLinked
            linkLinkedin={apiData.redesSociais.linkedin}
            color="black"
            padding={null}
          />
        </ContainerIconsSocial>

        <CtLogo>
          <LogoMaya color="black" border={false} />
        </CtLogo>

        <ContainerIconsSocial>
          <IconPhone
            telefone={apiData.informacoes.telefone}
            color="black"
            padding="Bottom"
          />
          <IconMail
            mail={apiData.informacoes.emailContato}
            color="black"
            padding="Bottom"
          />
          <MapMarker
            linkMapa={apiData.informacoes.linkMapa}
            color="black"
            padding={null}
          />
        </ContainerIconsSocial>
      </ContainerBarSide>

      <ContainerBarSideMobile>
        <ContainerIconsSocial>
          <IconFacebook
            linkFacebook={apiData.redesSociais.facebook}
            color="black"
            padding="Bottom"
          />
          <IconInstagram
            linkInstagram={apiData.redesSociais.instagram}
            color="black"
            padding="Bottom"
          />
          <IconLinked
            linkLinkedin={apiData.redesSociais.linkedin}
            color="black"
            padding={null}
          />
          <IconPhone
            telefone={apiData.informacoes.telefone}
            color="black"
            padding="Bottom"
          />
          <IconMail
            mail={apiData.informacoes.emailContato}
            color="black"
            padding="Bottom"
          />
          <MapMarker
            linkMapa={apiData.informacoes.linkMapa}
            color="black"
            padding={null}
          />
        </ContainerIconsSocial>
      </ContainerBarSideMobile>

      <ContainerContent>
        <TitleLinks>
          <Link href="/">
            <a>Home</a>
          </Link>
        </TitleLinks>

        <TitleLinks>
          <Link href="/portfolio">
            <a>Portfólio</a>
          </Link>
        </TitleLinks>

        <TitleLinks>
          <Link href="/probono">
            <a>Pró-bono</a>
          </Link>
        </TitleLinks>

        {router?.route !== '/probono' && (
          <TitleLinks onClick={handleClickContact}>
            <a role="presentation">Contato</a>
          </TitleLinks>
        )}
      </ContainerContent>

      <CtLogoMobile>
        <LogoMaya color="black" border={false} scale={true} />
      </CtLogoMobile>

      <CtButtonClose onClick={handleClickCloseMenu}>
        <IconArrowLeft />
      </CtButtonClose>
    </Container>
  );
}

export default Menu;
