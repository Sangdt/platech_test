import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
// import 'lazysizes';
import ProductCategory from 'views/SingleProductCategory';

// import ProductList from "@/components/Category/SingleCategoryComponents/ProductList";
import PageLoader from "components/SharedComponents/PageLoader";
import { getAllCategoryPath, getCategoryInfo } from "Helper/ServerAndBuild/callSanityCMS";
import GetSchemaJSON from 'components/SharedComponents/GetSchemaJSON';
// import categoryListStyles from "../../styles/categoryList";
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const Category = ({ categoryInfo }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div className="container mx-auto w-full ">
            <div className="flex-wrap flex pt-20">
                <PageLoader />
                <PageLoader />
                <PageLoader />
            </div>
        </div>
    }
    return (<>
        {categoryInfo?.seoTag && <NextSeo
            title={categoryInfo?.seoTag?.title}
            description={categoryInfo?.seoTag?.description}
            canonical={`${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`}
            openGraph={{
                url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`,
                title: categoryInfo?.seoTag?.title,
                description: categoryInfo?.seoTag?.description,
                images: categoryInfo?.seoTag?.openGraph?.images,

                site_name: categoryInfo?.seoTag?.title,
            }}
            twitter={{
                cardType: categoryInfo?.seoTag?.twitterCard,
            }}
        />}

        {categoryInfo && <ProductCategory {...categoryInfo} />}
        {/* <style jsx global>{categoryListStyles}</style> */}
        {checkArrNotEmpty(categoryInfo?.schema) && <>
            {categoryInfo.schema.map(shemaInfo => <GetSchemaJSON key={shemaInfo.id} shemaInfo={shemaInfo} />)}
        </>}
        {categoryInfo.customScripts && <script type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryInfo.customScripts) }} />}

    </>
    );
}

export async function getStaticProps({ params, preview = false }) {
    const { categorySlug } = params;

    // console.log("categorySlug",categorySlug)
    const categoryPage = await getCategoryInfo(preview, categorySlug);
    if (!categoryPage) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            categoryInfo: categoryPage
        },
        revalidate: 1200
    }
}

export async function getStaticPaths() {
    let { allCategoryPath } = await getAllCategoryPath();
    // console.log("allCategoryPath", allCategoryPath)
    return {
        paths: allCategoryPath.map(pathInfo => {
            return {
                params: {
                    categorySlug: pathInfo,
                }
            }
        }),
        fallback: true
        // paths: [
        //   { params: { ... } } // See the "paths" section below
        // ],
    };
}
export default Category