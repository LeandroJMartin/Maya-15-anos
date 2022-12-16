import styled from 'styled-components';
import tw from 'twin.macro';
import ItemPortifolio from '../../components/interface/itemPortfolio/home/ItemPortfolio';
import ContatoForm from '../../components/interface/contato/ContatoForm';
import { motion } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import HorizontalScroll from 'react-scroll-horizontal';
import { ContainerMobile } from '../../components/layout/Layout';
import Page from '../../components/layout/Page';
import Image from 'next/image';
import Carrousel from '../../components/interface/carrousel/Carrousel';
import { GetStaticProps } from 'next';
import { executeAllQuerys } from '@/src/lib/querys';
import ImgCerebro from '../../assets/img/cerebro.png';
import { useEffect, useState } from 'react';

const ContainerRow = styled.div`
  ${tw`
    flex
    flex-col lg:flex-row
    w-auto lg:w-full
  `}
`;

const ContainerResumo = styled.div`
  ${tw`
    block
    min-w-full lg:min-w-[calc((100vw - 150px) / 2)] xlg:min-w-[calc((100vw - 150px) / 3)]
    w-full lg:w-[calc((100vw - 150px) / 2)] xlg:w-[calc((100vw - 150px) / 3)]
    h-[calc(100vh - 110px)] lg:h-screen
    lg:py-24
    lg:px-16
    bg-[#111] lg:bg-greenMaya

    border-b lg:border-b-0
    border-greenMaya
  `}
`;

const ContainerResumoCenter = styled(ContainerResumo)`
  ${tw`
    flex
    flex-col
    justify-center
    items-center
    px-4 lg:px-0
  `}
`;

const CtImage = styled.div`
  ${tw`
    block lg:hidden
    relative
    p-10
  `}
`;

const Title = styled.h1`
  ${tw`
    block lg:hidden
    font-MayaBoldExpanded
    text-white
    text-4xl
    w-[min-content]
    mb-12
  `}
`;

const ContainerFiltro = styled.div`
  ${tw`
    w-full lg:w-auto
  `}
`;

const SpanFiltro = styled.span`
  ${tw`
    font-MayaBold
    text-greenMaya
    text-base
  `}
`;

const Ct = styled(motion.div)`
  ${tw`
    flex lg:block
    float-left lg:float-none
    mb-3 lg:mb-8
  `}

  &:last-child {
    ${tw`
      mb-0
    `}
  }
`;

const TagLink = styled.a`
  ${tw`
    font-MayaBoldExpanded
    text-[1.2rem] lg:text-4xl
    text-[#444] lg:text-black
    transition
    cursor-pointer
    leading-[1.75rem]
  `}

  &:hover {
    ${tw`
      text-white
      lg:scale-105
    `}
  }
`;

const Separador = styled.span`
  ${tw`
    block
    relative
    top-[1px]
    w-[5px]
    h-[5px]
    rounded-full
    bg-greenMaya
    mx-1.5
  `}
`;

const Section = styled.section`
  ${tw`
    flex
    w-auto
    h-full
  `}
`;

interface PageComponentProps {
  mobile: boolean;
  apiData: any;
}

const PageComponent = ({ mobile, apiData }: PageComponentProps) => {
  const [selected, setSelected] = useState('todos');
  const [arrayFiltered, setArrayFiltered] = useState([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    e.preventDefault();
    setSelected(slug);
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

  useEffect(() => {
    if (selected === 'todos') return;

    const filteredArray = apiData?.portfolio?.map((item: any) => {
      const filteredItem = item.categorias.find(
        (categoria: any) => categoria.slug === selected
      );

      if (filteredItem) return item;
    });

    const nArrayItems = filteredArray.filter(Boolean);

    setArrayFiltered(nArrayItems);
  }, [apiData?.portfolio, selected]);

  return (
    <ContainerRow>
      <ContainerResumoCenter>
        <CtImage>
          <Image src={ImgCerebro} alt="Imagem de um cerebro" />
        </CtImage>

        <Title>Criatividade muda Tudo.</Title>

        <div className="w-full">
          <SpanFiltro>FILTRO</SpanFiltro>
        </div>

        <ContainerFiltro>
          {apiData?.categorias?.map(
            (item: { name: string; slug: string }, index: number) => {
              return (
                <Ct key={`${index}`} onClick={(e) => handleClick(e, item.slug)}>
                  <div className="flex items-center">
                    <TagLink
                      className={
                        selected === item.slug ? 'text-white' : undefined
                      }
                    >
                      {item.name}
                    </TagLink>

                    {index < apiData.categorias.length - 1 && <Separador />}
                  </div>
                </Ct>
              );
            }
          )}
        </ContainerFiltro>
      </ContainerResumoCenter>

      {mobile === false ? (
        <div
          className="flex w-full h-full relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {selected === 'todos'
            ? apiData?.portfolio?.map((item: any, index: number) => {
                return (
                  <Section key={`${index}`}>
                    <ItemPortifolio
                      img={item.capaHome}
                      title={item.title}
                      slug={item.slug}
                      category={item.categorias}
                    />
                  </Section>
                );
              })
            : arrayFiltered?.map((item: any, index: number) => {
                return (
                  <Section key={`${index}`}>
                    <ItemPortifolio
                      img={item.capaHome}
                      title={item.title}
                      slug={item.slug}
                      category={item.categorias}
                    />
                  </Section>
                );
              })}
        </div>
      ) : (
        <Carrousel
          items={selected === 'todos' ? apiData.portfolio : arrayFiltered}
        />
      )}

      <Section>
        <ContatoForm apiData={apiData} />
      </Section>
    </ContainerRow>
  );
};

type Props = {
  apiData: any;
};

function IndexPortifolio({ apiData }: Props) {
  const { isMobile } = useIsMobile();

  return (
    <Page title={'Portfólio'}>
      {isMobile === false ? (
        <HorizontalScroll reverseScroll={true}>
          <PageComponent apiData={apiData} mobile={false} />
        </HorizontalScroll>
      ) : (
        <ContainerMobile>
          <PageComponent apiData={apiData} mobile={true} />
        </ContainerMobile>
      )}
    </Page>
  );
}

export default IndexPortifolio;

export const getStaticProps: GetStaticProps = async () => {
  const apiData = await executeAllQuerys();

  return {
    props: {
      apiData
    },
    revalidate: 20
  };
};
