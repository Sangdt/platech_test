import Head from 'next/head'
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Script from 'next/script'

// import GoogleFonts from 'next-google-fonts';
// import { useAmp } from "next/amp";
// import globalStyle from '!raw-loader!../../static/globals.css';

// import { GA_TAGMANAGER_ID, GA_TRACKING_ID } from '@/Helper/utils/gtag';
// import navBarToggle from '!raw-loader!@/SharedComponents/AMP/navBarToggle'

const DefaultHeadTags = ({ globalSeoConfig }) => {
    const router = useRouter();
    // const isAmp = useAmp();
    // console.log("globalSeo", globalSeoConfig)
    return (<>
        {/* <GoogleFonts href=" /> */}
        {globalSeoConfig && <DefaultSeo
            title={globalSeoConfig.title}
            titleTemplate={'%s ' + globalSeoConfig.titleSuffix}
            description={globalSeoConfig.description}
            canonical={`${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`}
            openGraph={{
                type: 'website',
                locale: 'vi_VN',
                url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`,
                title: globalSeoConfig.title,
                description: globalSeoConfig.description,
                images: globalSeoConfig.openGraph.images,
                site_name: globalSeoConfig.title,
            }}
            twitter={{
                cardType: globalSeoConfig.twitterCard,
            }}
            additionalMetaTags={[
                // isAmp ? false : {
                //     name: 'viewport',
                //     content: 'width=device-width, initial-scale=1.0'
                // },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                },
                // isAmp ? false : {
                //     httpEquiv: "x-ua-compatible",
                //     content: 'ie=edge'
                // },
                {
                    httpEquiv: "x-ua-compatible",
                    content: 'ie=edge'
                },
                {
                    name: "google-site-verification",
                    content: "qIngnLVnrlNSQxOQ0IBjh4bIUVVaY6iA1HSXcMwdtU4"
                }
            ]
                // .filter(Boolean)
            }
        />}
        <Head>
            <meta charSet="UTF-8" />
            {/* <link
                href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
                rel="stylesheet"
            /> */}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="57x57" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="60x60" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="72x72" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="76x76" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="114x114" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="120x120" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="144x144" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="152x152" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="apple-touch-icon" sizes="180x180" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="icon" type={globalSeoConfig.favicon.mimeType} sizes="192x192" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="icon" type={globalSeoConfig.favicon.mimeType} sizes="32x32" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="icon" type={globalSeoConfig.favicon.mimeType} sizes="96x96" href={globalSeoConfig.favicon.url} />}
            {globalSeoConfig && <link rel="icon" type={globalSeoConfig.favicon.mimeType} sizes="16x16" href={globalSeoConfig.favicon.url} />}
            <link rel="alternate" type="application/rss+xml" href="https://platechvn.com/feed/" title="Barber House" />
            <link rel="preconnect" href="https://cdn.sanity.io" />
            <link rel="dns-prefetch" href="https://cdn.sanity.io" />
            {/* <link rel="preload" href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" /> */}
            {/* 
            <link rel="preload" href="https://kit.fontawesome.com/7cb959ac98.js" as="script" crossOrigin="anonymous"></link>
            <script defer src="https://kit.fontawesome.com/7cb959ac98.js" crossOrigin="anonymous"></script> */}

            {/* {isAmp && <script id="toggleNav" type="text/plain" target="amp-script"
                dangerouslySetInnerHTML={{__html:navBarToggle}}></script>} */}
            <Script strategy="lazyOnload"
                src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CElement.prototype.scrollIntoView%2CElement.prototype.scroll" />

            {/* <link rel="preload" crossOrigin="anonymous" href="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CElement.prototype.scrollIntoView%2CElement.prototype.scroll" as="script"></link>
            <script async crossOrigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CElement.prototype.scrollIntoView%2CElement.prototype.scroll" type="text/javascript" /> */}
        </Head>


    </>);
}

export default DefaultHeadTags