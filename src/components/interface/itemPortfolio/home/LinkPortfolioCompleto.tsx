import styled from 'styled-components';
import tw from 'twin.macro';
import TextPortfolioCompleto from '@/src/assets/img/texto-portfolio.png';
import ArrowPortfolioCompleto from '@/src/assets/img/arrow-portfolio.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ImgCerebro from '../../../../assets/img/cerebro-ani-min.gif';

const Container = styled.div`
  ${tw`
    flex
    flex-col
    justify-center md:justify-start
    min-h-screen lg:min-h-full
    h-full
    border-t
    border-r
    border-b
    border-l
    border-greenMaya
    px-10 xlg:px-0

    min-w-full
    lg:min-w-[calc((100vw - 150px) / 2)]
    xlg:min-w-[calc((100vw - 150px) / 3)]

    w-full
    lg:w-[calc((100vw - 150px) / 2)]
    xlg:w-[calc((100vw - 150px) / 3)]
  `}
`;

const CtImage = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
    items-center
    w-auto
    h-auto
    relative
  `}
`;

const DivImg = styled.div`
  ${tw`
      block
      relative
      w-auto
      h-auto
      lg:max-h-[400px]
      mb-14 lg:mb-10
    `}
`;

const DivImgAbsolute = styled(DivImg)`
  ${tw`
      absolute
      mb-0
      p-8 lg:p-0
      translate-x-1 md:translate-x-0.5
      translate-y-1 md:translate-y-0.5
      scale-150 lg:scale-100
    `}
`;

function LinkPortfolioCompleto() {
  return (
    <Container>
      <div className="flex flex-col items-center w-full h-full md:px-20 lg:px-10 xlg:px-14">
        <CtImage>
          <DivImg>
            <Image src={ImgCerebro} alt="imagem de cerebro" />
          </DivImg>
        </CtImage>

        <div className="w-[200px] xlg:w-auto h-[200px] xlg:h-auto xlg:mt-40">
          <CtImage>
            <motion.div
              className="relative "
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 60,
                ease: 'linear'
              }}
            >
              <Image src={TextPortfolioCompleto} alt="imagem de seta" />
            </motion.div>

            <DivImgAbsolute>
              <Link href={'/portfolio'}>
                <a>
                  <motion.div
                    className="relative cursor-pointer"
                    whileHover={{
                      scale: 1.06
                    }}
                  >
                    <Image src={ArrowPortfolioCompleto} alt="imagem de seta" />
                  </motion.div>
                </a>
              </Link>
            </DivImgAbsolute>
          </CtImage>
        </div>
      </div>
    </Container>
  );
}

export default LinkPortfolioCompleto;
