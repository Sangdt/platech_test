import {
    // LogoJsonLd,
    ArticleJsonLd,
    NewsArticleJsonLd,
    // BlogJsonLd,
    ProductJsonLd,
    // LocalBusinessJsonLd
} from "next-seo";
import { getURLForModelApiKey } from "./LinkForModelApiKey";




// const GetArticleJSONLD_old = ({ article }) => {
//     const { logo, linkTo, _updatedAt, _publishedAt, ...rest } = article;
//     switch (article.articleType) {
//         case "NewsArticle":
//             return <NewsArticleJsonLd  {...rest}
//                 publisherLogo={logo?.url}
//                 url={getURLForModelApiKey({
//                     _modelApiKey: linkTo?._modelApiKey,
//                     links: linkTo?.seoLinks || linkTo?.link
//                 })}
//                 datePublished={_publishedAt}
//                 dateCreated={_publishedAt}
//                 dateModified={_updatedAt}

//             />;
//         case "BlogPosting":
//             return <BlogJsonLd
//                 {...rest}
//                 url={getURLForModelApiKey({
//                     _modelApiKey: linkTo._modelApiKey,
//                     links: linkTo?.seoLinks || linkTo?.link
//                 })}
//                 dateModified={_updatedAt}
//                 datePublished={_publishedAt}
//             />
//         default:
//             return <ArticleJsonLd {...rest}
//                 publisherLogo={logo?.url}
//                 url={getURLForModelApiKey({
//                     _modelApiKey: linkTo?._modelApiKey,
//                     links: linkTo?.seoLinks || linkTo?.link
//                 })}
//                 datePublished={_publishedAt}
//                 // dateCreated={_publishedAt}
//                 dateModified={_updatedAt}
//             />
//     }
// }

// export function GetSchemaJSON_old({ schema_logo, article, schema_product, location }) {
//     // console.log("schema_product.productLink.productGallery,", schema_product.productLink.productGallery.map(item=>item.url))
//     return (<>
//         {schema_logo && (schema_logo.logo) && <LogoJsonLd
//             logo={schema_logo?.url}
//             url={schema_logo?.logo?.url}
//         />}
//         {article && <GetArticleJSONLD article={article} />}
//         {schema_product && <ProductJsonLd
//             {...schema_product.productLink}
//             images={schema_product?.productLink?.productGallery}
//             offers={[
//                 {
//                     price: schema_product?.productLink?.price ?? 0.00,
//                     priceCurrency: 'VND',
//                     priceValidUntil: new Date().toISOString(),
//                     availability: 'http://schema.org/InStock',
//                     itemCondition: 'http://schema.org/NewCondition',
//                     url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}${getURLForModelApiKey({
//                         _modelApiKey: schema_product.productLink?._modelApiKey,
//                         links: schema_product?.productLink?.seoLinks
//                     })}`
//                 }]}
//         />}
//         {location && <LocalBusinessJsonLd
//             {...location}
//         />}
//     </>);
// }

const GetArticleJSONLD = ({ shemaInfo }) => {
    switch (shemaInfo.schemaType) {
        case "newsArticle":
            return (<NewsArticleJsonLd  {...shemaInfo} />);
        // case "newsArticle":
        //     return (<ArticleJsonLd  {...shemaInfo} />);
        default:
            return (<ArticleJsonLd  {...shemaInfo} />);
    }
}

export default function GetSchemaJSON({ shemaInfo }) {
    // console.log("shemaInfo", shemaInfo)
    switch (shemaInfo._type) {
        case "arcticleBlogNews":
            return (<GetArticleJSONLD shemaInfo={shemaInfo} />);
        default:
            return (<ProductJsonLd {...shemaInfo} />)
    }

}
