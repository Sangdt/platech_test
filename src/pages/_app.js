import React from 'react';
import PropTypes from 'prop-types';
// import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import Script from 'next/script'

import Main from 'layouts/Main';
import * as SeoAndLayoutContent from "Helper/pageLayoutCMSContent";
import DefaultHeadTags from 'layouts/DefaultHeadTags';
import createEmotionCache from 'components/SharedComponents/createEmotionCache';
import * as gtag from 'components/SharedComponents/gtag'

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
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;


  // console.log("test", pageProps.nonce)
  return (<>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
    <CacheProvider value={emotionCache} >
      <DefaultHeadTags {...SeoAndLayoutContent?.seo} />
      <Page>
        <Main {...SeoAndLayoutContent}>
          <Component {...pageProps} />
        </Main>
      </Page>
    </CacheProvider>
  </>);
}
export function reportWebVitals(metric) {
  console.log(metric)
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  // UA: PropTypes.string.isRequired,
};
