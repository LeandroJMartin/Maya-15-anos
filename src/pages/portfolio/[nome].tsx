import { GetStaticPaths, GetStaticProps } from 'next';
import styled from 'styled-components';
import tw from 'twin.macro';
import ContatoForm from '../../components/interface/contato/ContatoForm';
import Capa from '../../components/interface/itemPortfolio/capaPortfolio/capa';
import ParallelBlock from '../../components/interface/itemPortfolio/image/parallel';
import Video from '../../components/interface/video/video';
import { ContainerMobile } from '../../components/layout/Layout';
import Page from '../../components/layout/Page';
import useIsMobile from '../../hooks/useIsMobile';
import HorizontalScroll from 'react-scroll-horizontal';
import {
  executeAllQuerys,
  QueryAllSlugPortfolio,
  QueryPortfolioBy
} from '@/src/lib/querys';

export const ContainerRow = styled.div`
  ${tw`
    flex
    flex-col lg:flex-row
    w-auto lg:w-full
  `}
`;

export const ContainerResumo = styled.div`
  ${tw`
    flex
    items-center
    min-w-full lg:min-w-[calc((100vw - 150px) / 2)] xlg:min-w-[calc((100vw - 150px) / 3)]
    w-full lg:w-[calc((100vw - 150px) / 2)] xlg:w-[calc((100vw - 150px) / 3)]
    h-auto lg:h-screen
    py-2 lg:py-24
    px-8 lg:px-16
    bg-greenMaya
  `}
`;

const Parag = styled.p`
  ${tw`
    font-MayaRegular
    text-base xlg:text-lg
    text-black
    leading-[2] lg:leading-[2.2] xlg:leading-[2.65]
  `}
`;

type PageCompProps = {
  apiData: any;
};

const PageComponent = ({ apiData }: PageCompProps) => {
  return (
    <ContainerRow>
      {apiData?.portfolio?.resumoDescritivo !== '' && (
        <ContainerResumo>
          <Parag>{apiData.portfolioItem.resumoDescritivo}</Parag>
        </ContainerResumo>
      )}

      {apiData?.portfolioItem?.urlVideo && (
        <Video urlVideo={apiData.portfolioItem.urlVideo} />
      )}

      {apiData?.portfolioItem?.galeriaDeImagemFull?.length > 0 && (
        <Capa galeriaDeImagemFull={apiData.portfolioItem.galeriaDeImagemFull} />
      )}

      {apiData?.portfolioItem?.blocoDeImagensDupla?.length > 0 &&
        apiData?.portfolioItem?.blocoDeImagensDupla?.map(
          (item: any, index: number) => {
            return (
              <ParallelBlock ArrayUrl={item.tupleImgGroup} key={`${index}`} />
            );
          }
        )}

      <ContatoForm apiData={apiData} />
    </ContainerRow>
  );
};

type PortfolioProps = {
  apiData: any;
};

function Portfolio({ apiData }: PortfolioProps) {
  const { isMobile } = useIsMobile();

  return (
    <Page title={'Portfólio'}>
      {isMobile === false ? (
        <HorizontalScroll reverseScroll={true}>
          <PageComponent apiData={apiData} />
        </HorizontalScroll>
      ) : (
        <ContainerMobile>
          <PageComponent apiData={apiData} />
        </ContainerMobile>
      )}
    </Page>
  );
}

export default Portfolio;

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await QueryAllSlugPortfolio.queryExecute();

  return {
    paths: result,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && params.nome) {
    const { nome } = params;

    const apiData = await executeAllQuerys();
    const portfolioItem = await QueryPortfolioBy.queryExecute(nome as string);

    if (!portfolioItem) {
      return {
        props: {
          notFound: true
        }
      };
    }

    const data = {
      ...apiData,
      portfolioItem: portfolioItem
    };

    return {
      props: {
        apiData: data
      },
      revalidate: 20
    };
  }

  return {
    props: {}
  };
};
