import { useEffect } from 'react';
import '../components/styles/global.css';
import type { AppProps } from 'next/app';
import GlobalStyles from '../components/styles/globalStyles';
import Layout from '../components/layout/Layout';
import MenuProvider from '../context/menuContext';
import nProgress from 'nprogress';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import 'nprogress/nprogress.css';
import Eye from '../assets/img/eye.png';
import Image from 'next/image';

type AppPropsApi = {
  pageProps: {
    apiData: any;
  };
};

function MyApp({ Component, pageProps }: AppProps & AppPropsApi) {
  const router = useRouter();

  nProgress.configure({
    showSpinner: false
  });

  useEffect(() => {
    const handleRouteStart = () => nProgress.start();
    const handleRouteDone = () => nProgress.done();

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MenuProvider>
      <GlobalStyles />

      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.3
          }}
          variants={{
            initialState: {
              opacity: 0
            },
            animateState: {
              opacity: 1
            },
            exitState: {
              opacity: 0
            }
          }}
          className="base-page-size"
        >
          <motion.div
            className="fixed z-[1001]"
            initial={{
              scale: 0
            }}
            animate={{
              scale: 0
            }}
            exit={{
              scale: 1.8
            }}
            transition={{
              duration: 0.3
            }}
          >
            <Image src={Eye} />
          </motion.div>

          <Layout apiData={pageProps.apiData}>
            <Component {...pageProps} />
          </Layout>
        </motion.div>
      </AnimatePresence>
    </MenuProvider>
  );
}

export default MyApp;
