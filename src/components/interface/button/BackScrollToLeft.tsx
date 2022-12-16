import styled from 'styled-components';
import tw from 'twin.macro';
import { AnimatePresence, motion } from 'framer-motion';
import { IconArrowUp } from '../socialcons/Icons';
import { useEffect, useState } from 'react';

const Container = styled(motion.div)`
  ${tw`
    flex
    justify-center
    items-center
    fixed
    bottom-2
    right-2
    w-[45px]
    h-[45px]
    bg-greenMaya
    rounded-[50%]
    cursor-pointer
    z-[1000]
  `}
`;

function BackScrollToTop() {
  const [show, setShow] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0
    });
  };

  useEffect(() => {
    const handleMouseMove = () => {
      if (window.scrollY > window.innerHeight) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    document.addEventListener('scroll', handleMouseMove);

    return () => document.removeEventListener('scroll', handleMouseMove);
  }, []);

  const variants = {
    init: {
      y: 100,
      rotate: 90
    },
    show: {
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 85
      }
    },
    quit: {
      x: 100,
      rotate: -90
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <Container
          onClick={handleClick}
          key="btnScrollTop"
          variants={variants}
          initial="init"
          animate="show"
          exit="quit"
        >
          <motion.div
            animate={{
              y: [2, -4]
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.3,
              delay: 0.4
            }}
          >
            <IconArrowUp sizeProp={35} />
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  );
}

export default BackScrollToTop;
