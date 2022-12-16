import {
  FaLinkedin,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookSquare
} from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import styled from 'styled-components';
import tw from 'twin.macro';
import ColorConfig from '../../../config/color.config';
import Link from 'next/link';

interface Props {
  padding: 'Rigth' | 'Bottom' | null;
  color?: 'black';
}

interface LinkMapa {
  linkMapa: string;
}

interface LinkFacebook {
  linkFacebook: string;
}

interface LinkLinkedin {
  linkLinkedin: string;
}

interface LinkInstagram {
  linkInstagram: string;
}

interface telefone {
  telefone: string;
}

interface mail {
  mail: string;
}

const size = '25px';
const size2 = '22px';

const Ct = styled.div<Props>`
  svg {
    ${tw`
    cursor-pointer
    transition
  `}

    &:hover {
      fill: ${(props) => (props.color ? 'white' : null)};
    }
  }

  padding: 0;

  @media (min-width: 1024px) {
    padding: ${(props) =>
      props.padding === null
        ? '0'
        : props.padding === 'Rigth'
        ? '0px 10px 0 0'
        : '0 0 30px 0'};
  }
`;

const CtRotate = styled(Ct)`
  transform: scaleX(-1);
`;

export function MapMarker({ padding, color, linkMapa }: Props & LinkMapa) {
  return (
    <Ct padding={padding} color={color}>
      <Link href={linkMapa} passHref={true}>
        <a target="_blank" aria-label="icone para link no endereço no mapa">
          <FaMapMarkerAlt
            size={size}
            color={color ? color : ColorConfig.color}
          />
        </a>
      </Link>
    </Ct>
  );
}

export function IconLinked({
  padding,
  color,
  linkLinkedin
}: Props & LinkLinkedin) {
  return (
    <Ct padding={padding} color={color}>
      <Link href={linkLinkedin} passHref={true}>
        <a target="_blank" aria-label="icone para link do linkedin">
          <FaLinkedin size={size} color={color ? color : ColorConfig.color} />
        </a>
      </Link>
    </Ct>
  );
}

export function IconInstagram({
  padding,
  color,
  linkInstagram
}: Props & LinkInstagram) {
  return (
    <Ct padding={padding} color={color}>
      <Link href={linkInstagram} passHref={true}>
        <a target="_blank" aria-label="icone para link do instagram">
          <FaInstagram size={size} color={color ? color : ColorConfig.color} />
        </a>
      </Link>
    </Ct>
  );
}

export function IconFacebook({
  padding,
  color,
  linkFacebook
}: Props & LinkFacebook) {
  return (
    <Ct padding={padding} color={color}>
      <Link href={linkFacebook} passHref={true}>
        <a target="_blank" aria-label="icone para link do facebook">
          <FaFacebookSquare
            size={size}
            color={color ? color : ColorConfig.color}
          />
        </a>
      </Link>
    </Ct>
  );
}

export function IconPhone({ padding, color, telefone }: Props & telefone) {
  return (
    <CtRotate padding={padding} color={color}>
      <Link href={`tel:${telefone}`} passHref={true}>
        <a aria-label="icone para o número do telefone">
          <AiFillPhone size={size} color={color ? color : ColorConfig.color} />
        </a>
      </Link>
    </CtRotate>
  );
}

export function IconMail({ padding, color, mail }: Props & mail) {
  return (
    <Ct padding={padding} color={color}>
      <Link href={`mailto:${mail}`} passHref={true}>
        <a aria-label="icone para link de envio de email">
          <BsFillEnvelopeFill
            size={size2}
            color={color ? color : ColorConfig.color}
          />
        </a>
      </Link>
    </Ct>
  );
}
