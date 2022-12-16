import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
  children: React.ReactNode;
  center?: boolean;
  fullScreen?: boolean;
}

interface ContainerProps {
  center?: boolean;
  fullScreen?: boolean;
}

const ContainerAnimationDiv = styled(motion.div)<ContainerProps>`
  ${tw`
    lg:min-h-full
    h-full
    relative
    flex-col
    justify-center
  `}

  display: ${(props) => (props.center ? 'flex' : null)};
  min-height: ${(props) => (props.fullScreen ? '100vh' : null)};
`;

function AnimationDiv({ children, center = false, fullScreen = false }: Props) {
  return (
    <ContainerAnimationDiv
      center={center}
      fullScreen={fullScreen}
      initial={{
        x: 70,
        scale: 0.8,
        opacity: 0
      }}
      whileInView={{
        x: 0,
        scale: 1,
        opacity: 1
      }}
      viewport={{ once: false, amount: 0.1 }}
    >
      {children}
    </ContainerAnimationDiv>
  );
}

export default AnimationDiv;
