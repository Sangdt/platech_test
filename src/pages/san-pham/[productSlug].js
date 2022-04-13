// import Head from "next/head";
// import { polyfill } from 'interweave-ssr';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import 'lazysizes'
// import ProductDetailWrapper from "components/ProductDetail/ProductDetailWrapper";
import { getProductinfo, getProductPath } from "Helper/ServerAndBuild/callSanityCMS";
import GetSchemaJSON from 'components/SharedComponents/GetSchemaJSON'
import PageLoader from "components/SharedComponents/PageLoader";
import productDetailStyles from "../../styles/productDetail";
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';
import WithLargeImage from 'blocks/productDetails/WithLargeImage/WithLargeImage';

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// if (typeof window === 'undefined') {
//     polyfill();
// }
const ProductDetail = ({ productInfo }) => {
    const router = useRouter();
    // console.log("productInfo", productInfo)

    if (router.isFallback) {
        return <div className="container mx-auto w-full ">
            <div className="flex-wrap flex pt-20">
                <PageLoader />
                <PageLoader />
                <PageLoader />
            </div>
        </div>
    }
    return <>

        {productInfo?.seoTags && <NextSeo
            title={productInfo?.seoTags?.title}
            description={productInfo?.seoTags?.description}
            canonical={`${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`}
            openGraph={{
                url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`,
                title: productInfo?.seoTags?.title,
                description: productInfo?.seoTags?.description,
                images: productInfo?.seoTags?.openGraph?.images,
                site_name: productInfo?.seoTags?.title,
            }}
            twitter={{
                cardType: productInfo?.seoTags?.twitterCard,
            }}
        />}

        {productInfo && <WithLargeImage productInfo={productInfo} />}

        {checkArrNotEmpty(productInfo.schema) && <>
            {productInfo.schema.map((shemaInfo, index) => {
                // console.log("index,shemaInfo", shemaInfo, index)
                return <GetSchemaJSON key={shemaInfo.id} shemaInfo={shemaInfo} />
            })}
        </>}
        <style jsx global>{productDetailStyles}</style>
        {/* {productInfo.schema && <GetSchemaJSON {...productInfo.schema} />} */}
        {productInfo.customScripts && <script type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productInfo.customScripts) }} />}
    </>

}

export async function getStaticProps({ params, preview = false }) {
    const { productSlug } = params;

    //console.log("productSlug", productSlug)
    const productInfo = await getProductinfo(preview, productSlug);
    if (!productInfo) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            productInfo
        },
        revalidate: 1200
    }
}

export async function getStaticPaths() {
    let { productPath } = await getProductPath();
    // console.log("productPath",productPath)

    return {
        paths: productPath.map(pathInfo => {
            if (pathInfo && pathInfo.current) {
                return {
                    params: {
                        productSlug: pathInfo.current,
                    }
                }
            }
        }),
        fallback: true,
        // paths: [
        //   { params: { ... } } // See the "paths" section below
        // ],
    };
}

export default ProductDetail;