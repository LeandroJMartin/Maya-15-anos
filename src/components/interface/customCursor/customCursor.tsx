import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useCallback, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import ImgTxtLinkPortfolio from '../../../assets/img/txt_link_portfolio.png';
import ArrowPortfolio from '../../../assets/img/arrow_single.png';

const CustomCursor = React.forwardRef<handlesFn>((props, fRef) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const mousePosY = e.clientY - 145 / 2;
    const mousePosX = e.clientX - 145 / 2;

    if (!containerRef.current) return;

    containerRef.current.style.transform = `translate3d(${mousePosX}px, ${mousePosY}px, 0)`;
  }, []);

  useImperativeHandle(fRef, (): handlesFn => ({ updatePos }));

  return (
    <ContainerImageLinkPortfolio ref={containerRef} id="customCursor">
      <div className="relative w-[145px] h-[145px]">
        <CtImageLink
          animate={{
            rotate: [0, -360]
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 60,
            ease: 'linear'
          }}
        >
          <Image src={ImgTxtLinkPortfolio} alt="link para portfolio" />
        </CtImageLink>

        <CtImageLinkArrow>
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear'
            }}
          >
            <Image src={ArrowPortfolio} alt="link flecha para portfolio" />
          </motion.div>
        </CtImageLinkArrow>
      </div>
    </ContainerImageLinkPortfolio>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;

export type handlesFn = {
  updatePos: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ContainerImageLinkPortfolio = styled.div`
  ${tw`
    hidden lg:flex
    absolute
    top-0
    left-0
    opacity-0
    z-50
    pointer-events-none
  `}

  transition: opacity 0.2s ease-in-out;
  will-change: transform opacity;
`;

const CtImageLink = styled(motion.div)`
  ${tw`
      block
      absolute
    `}

  width: fit-content;
`;

const CtImageLinkArrow = styled.div`
  ${tw`
      absolute
      w-[50px]
      h-[50px]
      top-[50%]
      left-[50%]
    `}

  transform: translateY(-35%) translateX(-45%);
`;
