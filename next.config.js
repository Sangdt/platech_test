/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
// eslint-disable-next-line no-undef
const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact')

const { checkArrNotEmpty } = require('./src/Helper/checkArrNotEmpty');
// const getURLforModelApikey = require('./Helper/getURLforModelApikey');
// const { datoCMSRedirectQuery, callDatoCMSGraphQLAPI } = require('./Helper/ServerAndBuild/datoCMSContentFetcher');
const { client } = require('./src/Helper/ServerAndBuild/sanityClient');
const { sainityCMSRedirectQuery } = require('./src/Helper/ServerAndBuild/sanityQueryCollection');
// const { webpack } = require('webpack')
// const withPWA = require('next-pwa');
// const withClientScripts = require('next-client-script/withClientScripts');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// console.log("Nextjs config is good")
const nextConfig = {
  webpack: (config, { dev, dir, buildId, webpack }) => {
    // if (dev) {
    //   console.log("Adding wdyr !!!!")
    //   const originalEntry = config.entry
    //   config.entry = async () => {
    //     const entries = await originalEntry()

    //     if (
    //       entries['main.js'] &&
    //       !entries['main.js'].includes('./common/whyDidYouRender.js')
    //     ) {
    //       entries['main.js'].unshift('./common/whyDidYouRender.js')
    //     }

    //     return entries
    //   }
    // }
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: /\.tsx?$/,
      include: [dir],
      use: [
        'next-swc-loader',
        {
          loader: '@svgr/webpack',
          options: { babel: false }
        }
      ],
    });
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          BUILD_ID: JSON.stringify(buildId),
        },
      }),
    );
    config.module.rules.push(
      {
        // val-loader for page layout
        test: require.resolve('./src/Helper/pageLayoutCMSContent.js'),
        use: [{ loader: 'val-loader' }]
      },
    )

    return config
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/seo/sitemap',
      },
      {
        source: '/feed',
        destination: '/api/seo/feed',
      },
      // {
      //   source: '/feed/json',
      //   destination: '/api/seo/feed/json',
      // },
      // {
      //   source: '/feed/atom',
      //   destination: '/api/seo/feed/atom',
      // },
      {
        source: '/blog/feed',
        destination: '/api/seo/feed/blog', // Matched parameters can be used in the destination
      },
      {
        source: '/blog/:slug/feed',
        destination: '/api/seo/feed/blog/:slug', // Matched parameters can be used in the destination
      },
      {
        source: '/dich-vu/feed',
        destination: '/api/seo/feed/dich-vu', // Matched parameters can be used in the destination
      },
      {
        source: '/dich-vu/:slug/feed',
        destination: '/api/seo/feed/dich-vu/:slug', // Matched parameters can be used in the destination
      },
      {
        source: '/danh-muc-san-pham/feed',
        destination: '/api/seo/feed/danh-muc-san-pham', // Matched parameters can be used in the destination
      },
      {
        source: '/danh-muc-san-pham/:slug/feed',
        destination: '/api/seo/feed/danh-muc-san-pham/:slug', // Matched parameters can be used in the destination
      },
      {
        source: '/chi-tiet-san-pham/:slug/feed',
        destination: '/api/seo/feed/chi-tiet-san-pham/:slug', // Matched parameters can be used in the destination
      },
    ];
  },
  async redirects() {
    let redirects = [];
    // get redirect info from the CMS
    let redirectInfo = await client.fetch(sainityCMSRedirectQuery);
    // console.log("redirectInfo", redirectInfo)
    if (checkArrNotEmpty(redirectInfo)) {
      // filter array to find if we are redirects to a page that already need to redirect to another pages
      redirects = redirectInfo.filter(
        // if id of a redirect item are in "source" of another redirect items then we eliminate it. 
        ({ redirectTo }) => !redirectInfo.find(({ sourceLink }) =>
          sourceLink._id === redirectTo._id
        ));

      // return redirect array
      // check: https://nextjs.org/docs/api-reference/next.config.js/redirects
      return redirects.map(item => {
        if (!item.statusCode) item.statusCode = 308
        let redirectItem = {
          source: item.sourceLink.seoLinks,
          destination: item.redirectTo ? item.redirectTo.seoLinks : item.externalLink,
          permanent: item.permanent,
          statusCode: Number.parseInt(item.statusCode),
        }
        console.log(`Add redirect for page: ${redirectItem.source} to: `, redirectItem.destination);
        // console.log("redirectItem", redirectItem)

        return redirectItem;
      });
    }

    return [];
  },
  // experimental: { optimizeCss: true }
  // experimental: {
  //   outputStandalone: true,
  // },
};

module.exports = withPlugins([
  [withBundleAnalyzer],
  // [withPreact]
  // withClientScripts({
  //   '/': './Helper/clientScripts/index.js'
  // }),
  // [withPWA, {
  //   pwa: {
  //     disable: process.env.NODE_ENV !== "production",
  //     register: true,
  //     dest: 'public',
  //     // scope: '/app',
  //     // sw: 'worker.js',
  //     // importScripts: ['/customWorker.js'],
  //     // runtimeCaching
  //     //...
  //   }
  // }]
], nextConfig);

// withBundleAnalyzer()