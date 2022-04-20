import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import Script from 'next/script'
import { useRouter } from 'next/router'

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

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])
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
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtag.GA_TAGMANAGER_ID}');
          `,
      }}
    />
    {/* <Script
      id="gtag-manager-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtag.GA_TAGMANAGER_ID}');
          `,
      }}
    /> */}
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
  const { id, name, label, value, ...rest } = metric;
  console.log("metric", { id, name, label, value, ...rest });
  window.gtag && window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  // UA: PropTypes.string.isRequired,
};
