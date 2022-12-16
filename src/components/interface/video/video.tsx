import Marquee from 'react-easy-marquee';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Svg } from '../barSide/SvgCenter';
import YoutubeEmbed from './youtubeIframe';

const Container = styled.div`
  ${tw`
    flex
    justify-center
    items-center
    relative
    min-w-full
    lg:min-w-[calc(100vw - 145px)]

    max-w-full
    lg:max-w-[calc(100vw - 145px)]

    w-full
    h-full
    overflow-hidden
  `}
`;

const ContainerSvgFundo = styled.div`
  ${tw`
    block
    absolute
    top-0
    left-[-50px]
    w-[100px]
    h-[100px]
  `}
`;

const ContainerSvgFundo2 = styled.div`
  ${tw`
    block
    absolute
    top-0
    right-[-50px]
    w-[100px]
    h-[100px]
  `}
`;

const ContainerVideo = styled.div`
  ${tw`
    flex
    justify-center
    items-center
    w-full
    lg:max-w-[95%]
    xlg:max-w-[90%]
    h-full lg:h-screen
    p-8
  `}
`;

type Props = {
  urlVideo: string;
};

function Video({ urlVideo }: Props) {
  return (
    <Container>
      <ContainerSvgFundo>
        <Marquee axis="Y" height="110vh" duration={42000}>
          <Svg />
          <Svg />
        </Marquee>
      </ContainerSvgFundo>

      <ContainerSvgFundo2>
        <Marquee axis="Y" height="110vh" duration={42000} reverse={true}>
          <Svg cor="white" />
          <Svg cor="white" />
        </Marquee>
      </ContainerSvgFundo2>

      <ContainerVideo>
        <YoutubeEmbed embedId={urlVideo} />
      </ContainerVideo>
    </Container>
  );
}

export default Video;
