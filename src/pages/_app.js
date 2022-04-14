import React from 'react';
import PropTypes from 'prop-types';
// import Head from 'next/head';
import { CacheProvider } from '@emotion/react';

import Main from 'layouts/Main';
import * as SeoAndLayoutContent from "Helper/pageLayoutCMSContent";
import DefaultHeadTags from 'layouts/DefaultHeadTags';
import createEmotionCache from 'components/SharedComponents/createEmotionCache';

import Page from '../components/Page';

// import 'react-lazy-load-image-component/src/effects/blur.css';

import 'styles/globals.css'
// import 'styles/new_slide.css'
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'react-image-lightbox/style.css';
// import 'aos/dist/aos.css';
// let clientUA;
const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
  // if (UA) clientUA = UA;
  const { Component, emotionCache = clientSideEmotionCache, pageProps, nonce } = props;


  console.log("test",pageProps.nonce)
  return (
    <CacheProvider value={emotionCache} >
      <DefaultHeadTags {...SeoAndLayoutContent?.seo} nonce={nonce} />
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>theFront | UI Kit by Maccarian Agency.</title>
      </Head> */}
      <Page>
        <Main {...SeoAndLayoutContent}>
          <Component {...pageProps} />
        </Main>
      </Page>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  UA: PropTypes.string.isRequired,
};
