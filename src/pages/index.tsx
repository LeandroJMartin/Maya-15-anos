import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import HorizontalScroll from 'react-scroll-horizontal';
import Image from 'next/image';
import Page from '../components/layout/Page';
import tw from 'twin.macro';
import styled from 'styled-components';
import Footer from '../components/interface/footer/Footer';
import Banner from '../components/interface/banner/Banner';
import Heart from '../components/interface/heart/Heart';
import ItemPortifolio from '../components/interface/itemPortfolio/home/ItemPortfolio';
import EyeImg from '../assets/img/eye.png';
import { ContainerMobile } from '../components/layout/Layout';
import { executeAllQuerysHome } from '@/src/lib/querys';
import LinkPortfolioCompleto from '../components/interface/itemPortfolio/home/LinkPortfolioCompleto';
import ContatoForm from '../components/interface/contato/ContatoForm';
import useIsMobile from '../hooks/useIsMobile';
import Carrousel from '../components/interface/carrousel/Carrousel';
import React, { useRef } from 'react';
import CustomCursor, {
  handlesFn
} from '../components/interface/customCursor/customCursor';

const ContainerRow = styled.div`
  ${tw`
    flex
    flex-col lg:flex-row
    items-center
    w-auto
    h-auto lg:h-full
  `}
`;

const ContainerBanner = styled.div`
  ${tw`
    flex
    flex-col
    justify-between

    lg:min-w-[calc(100vw - 150px)]
    w-auto lg:w-[calc(100vw - 150px)]

    lg:min-h-screen
    h-full
  `}
`;

export const Section = styled.div`
  ${tw`
    flex
    w-full lg:w-auto
    h-full
    relative
  `}
`;

export const CtImage = styled.div`
  ${tw`
    block
    absolute
    top-1/2
    left-0
    min-w-[350px]
    min-h-[250px]
    max-w-[350px]
    max-h-[350px]
    z-40
  `}

  transform: translate(-50%, -50%);
`;

interface HomeComponentProps {
  mobile: boolean;
  apiData: any;
}

function HomeComponent({ mobile, apiData }: HomeComponentProps) {
  const randomAnimationLoopType = () => {
    const random = Number((Math.random() * 1).toFixed());

    if (random === 0) {
      return 'reverse';
    } else {
      return 'mirror';
    }
  };

  const randomAnimationTime = () => {
    return Number((Math.random() * 42 + 16).toFixed());
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const customCursor = document.getElementById('customCursor');

    if (!customCursor) return;

    customCursor.style.opacity = '1';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const customCursor = document.getElementById('customCursor');

    if (!customCursor) return;

    customCursor.style.opacity = '0';
  };

  return (
    <ContainerRow>
      <ContainerBanner>
        <Banner />
        <Footer />
      </ContainerBanner>

      <Section>
        <Heart />
      </Section>

      {mobile === false ? (
        <div
          className="flex w-full h-full relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {apiData?.portfolio.map((item: any, index: number) => {
            return (
              <Section key={index}>
                {index % 2 === 0 && index > 0 && (
                  <CtImage>
                    <motion.div
                      animate={{
                        y: [0, -280, 120],
                        rotate: [0, -25, 45],
                        scale: [0.3, 0.9, 1.02]
                      }}
                      transition={{
                        duration: randomAnimationTime(),
                        repeat: Infinity,
                        repeatType: randomAnimationLoopType(),
                        ease: 'easeInOut'
                      }}
                    >
                      <motion.div
                        className="relative cursor-pointer"
                        whileHover={{
                          rotate: 360
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 90
                        }}
                      >
                        <Image src={EyeImg} alt="imagem de um olho" />
                      </motion.div>
                    </motion.div>
                  </CtImage>
                )}

                <ItemPortifolio
                  img={item.capaHome}
                  category={item.categorias}
                  title={item.title}
                  slug={item.slug}
                />
              </Section>
            );
          })}
        </div>
      ) : (
        <Carrousel items={apiData.portfolio} />
      )}

      <Section>
        <LinkPortfolioCompleto />
      </Section>

      <Section>
        <ContatoForm apiData={apiData} />
      </Section>
    </ContainerRow>
  );
}

type Props = {
  apiData: any;
};

const Home = ({ apiData }: Props) => {
  const { isMobile } = useIsMobile();

  return (
    <Page title={'Home'}>
      {isMobile === false ? (
        <HorizontalScroll
          reverseScroll={true}
          config={{ stiffness: 160, damping: 110 }}
        >
          <HomeComponent apiData={apiData} mobile={isMobile} />
        </HorizontalScroll>
      ) : (
        <ContainerMobile>
          <HomeComponent apiData={apiData} mobile={isMobile} />
        </ContainerMobile>
      )}
    </Page>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const apiData = await executeAllQuerysHome();

  return {
    props: {
      apiData
    },
    revalidate: 20
  };
};
