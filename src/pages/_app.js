import React from 'react';
import PropTypes from 'prop-types';
// import Head from 'next/head';
import Main from 'layouts/Main';
import * as SeoAndLayoutContent from "Helper/pageLayoutCMSContent";
import DefaultHeadTags from 'layouts/DefaultHeadTags';

import Page from '../components/Page';

// import 'react-lazy-load-image-component/src/effects/blur.css';

import 'styles/globals.css'
// import 'styles/new_slide.css'
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'react-image-lightbox/style.css';
// import 'aos/dist/aos.css';
// let clientUA;
export default function App({ Component, pageProps, UA }) {
  // if (UA) clientUA = UA;
  console.log("App pageProps for UA", UA)

  // console.log("SeoAndLayoutContent",SeoAndLayoutContent)
  return (
    <React.Fragment>
      <DefaultHeadTags {...SeoAndLayoutContent?.seo} />
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
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  UA: PropTypes.string.isRequired,
};
