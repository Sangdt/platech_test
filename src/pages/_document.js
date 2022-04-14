/* eslint-disable react/display-name */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
// import flush from 'styled-jsx/server'
// import parser from 'ua-parser-js'

import { nanoid } from 'nanoid'
// import {
//   GA_TAGMANAGER_ID,
//   //  GA_TRACKING_ID 
// } from 'Helper/utils/gtag';
import createEmotionCache from 'components/SharedComponents/createEmotionCache';
let prod = process.env.NODE_ENV === "production";
let referrer = "strict-origin";

const emotionCache = nonce => createEmotionCache(nonce);

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
          {!this.props.CspSettled && <meta property="http-equiv" content={getCsp(this.props.nonce)} />}
          <meta property="csp-nonce" content={this.props.nonce} />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript nonce={this.props.nonce} />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  const nonce = nanoid(10);

  // console.log("document ctx",ctx?.res?.get('User-Agent'));
  // emotionCache.compat = true;
  let UA;
  // const styles = [...flush({ nonce })]
  let CspSettled = false;
  const res = ctx?.res
  console.log("res", res);
  if (typeof ctx?.res?.setHeader !== "undefined") {
    ctx.res.setHeader('Content-Security-Policy', getCsp(nonce));
    CspSettled = true;
  } else if (typeof ctx?.res?.writeHead !== "undefined") {
    ctx.res.writeHead(200,
      { 'Content-Security-Policy': getCsp(nonce) });
    CspSettled = true;

  }
  // Render app and page and get the context of the page with collected side effects.
  const originalRenderPage = ctx.renderPage;
  const { extractCriticalToChunks } = createEmotionServer(emotionCache(nonce));
  // console.log("UA", UA)
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={emotionCache(nonce)} {...props} />;
        },
    });

  const initialProps = await ctx.defaultGetInitialProps(ctx, { nonce })

  // if (typeof ctx?.res?.setHeader !== "undefined") {
  //   UA = ctx?.req.headers['user-agent']
  //   // console.log("document ctx", ctx?.req.headers['user-agent'] );
  //   ctx.res.setHeader('Content-Security-Policy', getCsp(nonce));
  //   CspSettled = true;
  // } else if (typeof ctx?.res?.writeHead !== "undefined") {
  //   UA = ctx?.req.headers['user-agent']
  //   ctx.res.writeHead(200,
  //     { 'Content-Security-Policy': getCsp(nonce) })
  //   CspSettled = true;

  // }
  // const emotionStyles = extractCriticalToChunks(initialProps.html);
  // // console.log("emotionStyles",emotionStyles.styles.length)
  const emotionStyleTags = extractCriticalToChunks(initialProps.html).styles.map((style) => (
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
    emotionStyleTags,
    // Styles fragment is rendered after the app and page rendering finish.
    // styles: [
    //   ...React.Children.toArray(initialProps.styles),
    //   // ...emotionStyleTags,
    // ],
    nonce,
    CspSettled
  };
};
