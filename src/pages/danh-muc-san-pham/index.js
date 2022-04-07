import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import ProductCategory from 'views/ProductCategory';
import { getCategoryPageData } from "Helper/ServerAndBuild/callSanityCMS";
import GetSchemaJSON from "components/SharedComponents/GetSchemaJSON";
// import Head from "next/head";
// import categoryListStyles from "../../styles/categoryList";
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const Category = ({ categoryListPage }) => {
    const router = useRouter();
    return (<>

        {categoryListPage.seoTag && <NextSeo
            title={categoryListPage?.seoTag?.title}
            description={categoryListPage?.seoTag?.description}
            canonical={`${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`}
            openGraph={{
                url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`,
                title: categoryListPage?.seoTag?.title,
                description: categoryListPage?.seoTag?.description,
                images: categoryListPage?.seoTag.openGraph.images,
                site_name: categoryListPage?.seoTag?.title,

            }}
            twitter={{
                cardType: categoryListPage?.seoTag?.twitterCard,
            }}
        />}

        {categoryListPage && <ProductCategory {...categoryListPage} />}
        {/* <style jsx global>{categoryListStyles}</style> */}
        {checkArrNotEmpty(categoryListPage.schema) && <>
            {categoryListPage.schema.map(shemaInfo => <GetSchemaJSON key={shemaInfo.id} shemaInfo={shemaInfo} />)}
        </>}
        {categoryListPage.customScripts && <script type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryListPage.customScripts) }} />}
    </>);
}

export async function getStaticProps({ params, preview = false }) {
    const categoryListPage = await getCategoryPageData(preview);
    return {
        props: {
            categoryListPage
        },
        revalidate: 1200
    }
}

export default Category