import { GetStaticProps } from 'next';
import { executeAllQuerys } from '../lib/querys';

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

export const getStaticProps: GetStaticProps = async () => {
  const apiData = await executeAllQuerys();

  return {
    props: {
      apiData
    },
    revalidate: 20
  };
};
