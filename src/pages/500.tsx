import { GetStaticProps } from 'next';
import { executeAllQuerys } from '../lib/querys';

export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
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
