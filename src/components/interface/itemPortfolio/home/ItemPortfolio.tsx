import { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import tw from 'twin.macro';
import BlocksConfigs from '../../../../config/blocks';
import { Svg } from '../../barSide/SvgCenter';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Link from 'next/link';
import ImgTxtLinkPortfolio from '../../../../assets/img/txt_link_portfolio.png';
import ArrowPortfolio from '../../../../assets/img/arrow_single.png';
import Marquee from 'react-easy-marquee';
import useMeasure from 'react-use-measure';

interface CategoryProps {
  name: string;
}

interface Props {
  img: string;
  title: string;
  category: any[];
  slug: string;
}

interface CtImgProps {
  width: number;
  height: number;
}

const Container = styled(motion.div)`
  ${tw`
    block
    relative
    min-h-screen lg:min-h-full
    h-full
    border-greenMaya
    overflow-hidden
    transition
    cursor-pointer
    bg-[#111] lg:bg-white

    min-w-full
    lg:min-w-[calc((100vw - 150px) / 2)]
    xlg:min-w-[calc((100vw - 150px) / 3)]

    w-screen
    lg:w-[calc((100vw - 150px) / 2)]
    xlg:w-[calc((100vw - 150px) / 3)]

    max-w-full
    lg:max-w-[calc((100vw - 150px) / 2)]
    xlg:max-w-[calc((100vw - 150px) / 3)]

    lg:border-t
    lg:border-r
    border-b lg:border-b
    border-l-0
  `}

  & > * {
    @media (min-width: 1024px) {
      cursor: none;
    }
  }

  &:hover {
    ${tw`
      bg-[#111]
    `}
  }
`;

const ContainerContent = styled(motion.div)`
  ${tw`
    block
    relative
    w-full
    h-screen lg:h-full
    py-14
    px-10 lg:px-14
  `}
`;

const CtImage = styled.div<CtImgProps>`
  ${tw`
    flex
    justify-center
    w-full
    h-3/6 lg:h-4/6
    relative
    overflow-hidden
  `}

  border-radius: ${BlocksConfigs.borderRadius};

  & > div {
    ${tw`
      block
      absolute
    `}

    top: ${(props) => `-${props.height * 0.1}px`};
    left: ${(props) => `-${props.width * 0.11}px`};

    width: ${(props) => (props.width ? `${props.width * 1.2}px` : 0)};
    height: ${(props) => (props.height ? `${props.height * 1.2}px` : 0)};
  }
`;

const Content = styled(motion.div)`
  ${tw`
    flex
    flex-col
    justify-between lg:justify-start
    relative
    w-full
    h-full
  `}
`;

const Title = styled.h1`
  ${tw`
    font-MayaBoldExpanded
    text-[6vw] md:text-4xl xlg:text-5xl
    text-greenMaya
    text-center
    pointer-events-none
  `}
`;

const Tag = styled.p`
  ${tw`
    block
    w-full
    text-center
    font-MayaRegular
    text-2xl
    leading-9
    text-white lg:text-black
    group-hover:text-white
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

    lg:invisible
    lg:opacity-0

    group-hover:visible
    group-hover:opacity-100

    transition-all

    rotate-[-45deg] md:rotate-[-62deg] lg:rotate-[-45deg]
  `}

  will-change: opacity;
`;
const ContainerSvgFundo2 = styled.div`
  ${tw`
    block
    absolute
    top-0
    right-[-50px]
    w-[100px]
    h-[100px]

    lg:invisible
    lg:opacity-0

    group-hover:visible
    group-hover:opacity-100

    transition-all

    rotate-[45deg] md:rotate-[62deg] lg:rotate-[45deg]
  `}

  will-change: opacity;
`;

const ContainerImageLinkPortfolioMobile = styled.div`
  ${tw`
    flex lg:hidden
    justify-end
    relative
    pt-16
  `}
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

const ContentTitle = styled(motion.div)`
  ${tw`
    flex
    h-3/6 lg:h-2/6
    flex-col
    justify-center
    py-1.5 lg:py-0
  `}
`;

function ItemPortifolio({ img, title, category, slug }: Props) {
  const [ref, { width, height }] = useMeasure();

  const scrollX = useMotionValue(0);
  const scrollY = useMotionValue(0);

  const translateX = useTransform(scrollX, [0, 400], [15, -15]);
  const translateY = useTransform(scrollY, [0, 400], [15, -15]);

  const handleMouse = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();

    scrollX.set(event.clientX - rect.left);
    scrollY.set(event.clientY - rect.top);
  };

  const reset = useCallback(() => {
    animate(scrollX, 200);
    animate(scrollY, 200);
  }, [scrollX, scrollY]);

  const BlockContent = () => {
    const [dimensions, setDimesions] = useState({
      width: width,
      height: height
    });

    useEffect(() => {
      setDimesions({
        width: width,
        height: height
      });
    }, []);

    return (
      <Content
        initial={{
          x: 70,
          scale: 1,
          opacity: 0
        }}
        whileInView={{
          x: 0,
          scale: 1,
          opacity: 1
        }}
        viewport={{ once: true, amount: 0.09 }}
      >
        <CtImage ref={ref} width={dimensions.width} height={dimensions.height}>
          <div>
            <motion.div
              className="relative top-0 left-0 w-full h-full"
              style={{ translateX, translateY }}
            >
              <Image
                src={img}
                layout="fill"
                objectFit="cover"
                objectPosition="center center"
                alt="imagem do portifolio"
                priority
              />
            </motion.div>
          </div>
        </CtImage>

        <ContentTitle>
          {category?.map((item: CategoryProps, index: number) => {
            return <Tag key={`${index}`}>{item.name}</Tag>;
          })}

          <Title>{title}</Title>

          <ContainerImageLinkPortfolioMobile>
            <div className="relative w-[144px] h-[147px]">
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
                  <Image
                    src={ArrowPortfolio}
                    alt="link flecha para portfolio"
                  />
                </motion.div>
              </CtImageLinkArrow>
            </div>
          </ContainerImageLinkPortfolioMobile>
        </ContentTitle>
      </Content>
    );
  };

  return (
    <Container className="group" onMouseMove={handleMouse} onMouseLeave={reset}>
      <Link href={`/portfolio/${slug}`}>
        <a className="w-full h-full z-40">
          <ContainerSvgFundo>
            <Marquee axis="Y" height="150vh" duration={42000}>
              <Svg />
              <Svg />
            </Marquee>
          </ContainerSvgFundo>

          <ContainerSvgFundo2>
            <Marquee axis="Y" height="150vh" duration={42000} reverse={true}>
              <Svg cor="white" />
              <Svg cor="white" />
            </Marquee>
          </ContainerSvgFundo2>

          <ContainerContent>
            <BlockContent />
          </ContainerContent>
        </a>
      </Link>
    </Container>
  );
}

export default memo(ItemPortifolio);
