/* eslint-disable react/display-name */
import React from 'react';
import Document, { Html, Head, Main, NextScript  } from 'next/document';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import flush from 'styled-jsx/server'

import { nanoid } from 'nanoid'
import {
  GA_TAGMANAGER_ID,
  //  GA_TRACKING_ID 
} from 'Helper/utils/gtag';
let prod = process.env.NODE_ENV === "production";
let referrer = "strict-origin";

function getCsp(nonce) {
  let csp = ``;
  csp += `base-uri 'self';`;
  csp += `form-action 'self' https://analytics.google.com https://www.facebook.com https://connect.facebook.net https://www.google-analytics.com  http://www.googletagmanager.com;`;
  csp += ``;
  csp += `default-src 'self';`;
  csp += `script-src 'self' ${prod ? "" : "'unsafe-eval'"} 'nonce-${nonce}' 'strict-dynamic' https://www.google.com https://analytics.google.com http://www.youtube.com https://connect.facebook.net https://www.googletagmanager.com  https://polyfill.io https://maps.googleapis.com  https://www.google-analytics.com https://cdn.ampproject.org https://ssl.google-analytics.com;`; // NextJS requires 'unsafe-eval' in dev (faster source maps)
  // csp += `default-src 'self'; style-src ${prod ? `'nonce-${nonce}'` : "'unsafe-inline'"}  https://www.google-analytics.com https://maps.gstatic.com https://connect.facebook.net https://fonts.googleapis.com data:;`; // NextJS requires 'unsafe-inline'
  csp += `style-src 'self' 'unsafe-inline'  https://www.google.com https://www.google-analytics.com https://maps.gstatic.com https://connect.facebook.net https://fonts.googleapis.com data:;`; // NextJS requires 'unsafe-inline'
  csp += `img-src 'self' https://cdn.sanity.io https://www.google.com.vn https://analytics.google.com http://www.googletagmanager.com https://www.google.com https://www.facebook.com https://www.datocms-assets.com https://maps.googleapis.com https://www.google-analytics.com https://maps.gstatic.com data: blob:;`;
  csp += `font-src 'self' https://fonts.gstatic.com data: blob:;`; // TODO
  csp += `frame-src https://www.google.com https://analytics.google.com https://web.facebook.com http://www.youtube.com https://www.facebook.com https://www.googletagmanager.com ;`; // TODO
  csp += `media-src https://cdn.sanity.io https://analytics.google.com https://www.datocms-assets.com https://maps.gstatic.com https://maps.googleapis.com https://www.facebook.com;`; // TODO
  csp += `connect-src 'self' https://analytics.google.com https://www.google-analytics.com  https://connect.facebook.net https://www.facebook.com https://vitals.vercel-insights.com https://stats.g.doubleclick.net ;`
  csp += `worker-src  'self' blob:`
  return csp;
}


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head nonce={this.props.nonce} >
          <meta property="csp-nonce" content={this.props.nonce} />

          {/* <meta charSet="utf-8" />
          <link
            rel="shortcut icon"
            href="https://assets.maccarianagency.com/favicons/thefront/favicon.ico"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="A modern design system for your new landing and web pages."
          />
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://assets.maccarianagency.com/screenshots/the-front/social.png"
          />
          <meta
            property="og:title"
            content="theFront | UI Kit by Maccarian Agency."
          />
          <meta
            property="og:description"
            content="A modern design system for your new landing and web pages."
          />
          <meta
            property="og:url"
            content="https://thefront.maccarianagency.com/"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
            rel="stylesheet"
          /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
            rel="stylesheet"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript nonce={this.props.nonce}  />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  console.log("document ctx",ctx?.res);
  const nonce = nanoid(10);
  const styles = [...flush({ nonce })]
  const getCache = () => {
    const cache = createCache({
      key: 'css', 
      prepend: true, 
      nonce: nonce,
    });
    // cache.compat = true;

    return cache;
  };
  if (typeof ctx?.res?.setHeader !== "undefined") {
    ctx.res.setHeader('Content-Security-Policy', getCsp(nonce))
  } else if (typeof ctx?.res?.writeHead !== "undefined") {
    ctx.res.writeHead(200,
      { 'Content-Security-Policy': getCsp(nonce) })
  }
  // ctx.res.setHeader('Content-Security-Policy', getCsp(nonce))
  // ctx.res.writeHead(200,
  //   { 'Content-Security-Policy': getCsp(nonce) })
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const originalRenderPage = ctx.renderPage;

  const cache = getCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  // console.log("cache",cache)
  ctx.renderPage = () =>
    originalRenderPage({
      // Take precedence over the CacheProvider in our custom _app.js
      enhanceComponent: (Component) => (props) => (
        <CacheProvider value={cache}>
          <Component {...props} />
        </CacheProvider>
      ),
      // enhanceApp: (App) => function EnhanceApp(props) {
      //   return <CacheProvider value={cache}>
      //     <App {...props} />
      //     </CacheProvider>;
      // },
    });

  const initialProps =await ctx.defaultGetInitialProps(ctx, { nonce })
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  // console.log("emotionStyles",emotionStyles.styles.length)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      nonce={nonce}
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
  // console.log("emotionStyleTags",emotionStyleTags.length)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
    nonce
  };
};
