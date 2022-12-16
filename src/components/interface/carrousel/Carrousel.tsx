import styled from 'styled-components';
import tw from 'twin.macro';
import { Section } from '../../../pages';
import ItemPortifolio from '../itemPortfolio/home/ItemPortfolio';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProgressBar from './progressBar';

const Container = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    relative
    w-full
    h-full
    overflow-hidden
  `}
`;

const CarrouselRow = styled.div`
  ${tw`
    flex
    w-full
    h-auto
  `}
`;

type Props = {
  items: any;
};

function Carrousel({ items }: Props) {
  const itemsArrayComp = items?.map((item: any, index: number) => {
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
  });

  return (
    <Container>
      <CarrouselRow>
        <AliceCarousel
          mouseTracking
          disableButtonsControls={true}
          disableDotsControls={true}
          disableSlideInfo={false}
          renderSlideInfo={(e) => (
            <ProgressBar item={e.item} total={e.itemsCount} />
          )}
          items={itemsArrayComp}
        />
      </CarrouselRow>
    </Container>
  );
}

export default Carrousel;
