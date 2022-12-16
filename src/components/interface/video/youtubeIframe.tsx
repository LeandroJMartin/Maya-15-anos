import styled from 'styled-components';
import tw from 'twin.macro';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';
import { useEffect, useRef, useState } from 'react';

interface Props {
  embedId: string;
}

const VideoContainer = styled.div`
  --after-content: '';

  ${tw`
    relative
    overflow-hidden
    pb-[56.25%]
    w-full
    h-0
  `}

  & iframe {
    ${tw`
      absolute
      w-full
      h-full
      top-0
      left-0
    `}
  }

  &::after {
    content: var(--after-content);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: block;
    cursor: pointer;
  }
`;

interface playerFn {
  player: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    playVideo: () => {};
  } | null;
}

const YoutubeEmbed = ({ embedId }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ctRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<playerFn>({ player: null });

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
      enablejsapi: 1,
      rel: 0,
      showinfo: 0,
      ecver: 2,
      modestbranding: 1
    }
  };

  const onReady = (event: any) => {
    playerRef.current.player = event.target;
  };

  const onVideoPlay = () => {
    if (!ctRef.current) return;

    ctRef.current.style.setProperty('--after-content', 'none');
  };

  const onVideoPause = () => {
    if (!ctRef.current) return;

    ctRef.current.style.setProperty('--after-content', '');
  };

  const handleClick = () => {
    if (!playerRef.current.player) return;

    playerRef.current.player.playVideo();
  };

  const onVideoStateChange = (event: any) => {
    if (!ctRef.current) return;

    if (event.data === 0) {
      ctRef.current.style.setProperty('--after-content', '');
    }
  };

  if (!mounted) return null;

  return (
    <VideoContainer ref={ctRef} onClick={handleClick}>
      <YouTube
        videoId={embedId}
        // id={string}
        // className={string}
        // iframeClassName={string}
        title={'video youtube projeto'}
        loading={'lazy'}
        opts={opts}
        onReady={onReady}
        onPlay={onVideoPlay}
        onPause={onVideoPause}
        // onEnd={func}
        // onError={func}
        onStateChange={onVideoStateChange}
        // onPlaybackRateChange={func}
        // onPlaybackQualityChange={func}
      />
    </VideoContainer>
  );
};

export default YoutubeEmbed;
