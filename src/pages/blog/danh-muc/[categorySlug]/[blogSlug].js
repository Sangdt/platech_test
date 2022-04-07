import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import 'lazysizes';
// import 'lazysizes/plugins/blur-up/ls.blur-up';
// import fs from 'fs'
// import path from 'path'
import BlogArticle from 'views/BlogArticle';

// import BlogWrapper from "@/components/Blog/Blogdetail/BlogWrapper";
// import PageLoader from "@/SharedComponents/PageLoader";
import { getAllBlogWithCategoryPath, getBlogInfoBySlug } from "Helper/ServerAndBuild/callSanityCMS";
import GetSchemaJSON from 'components/SharedComponents/GetSchemaJSON';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';
import { polyfill } from 'interweave-ssr';

if (typeof window === 'undefined') {
    polyfill();
}

const SinglePost = ({ blogInfo }) => {
    // console.log("blogInfo", blogInfo)
    const router = useRouter();
    //   if (router.isFallback) {
    //     return <div className="container mx-auto w-full ">
    //       <div className="flex-wrap flex pt-20">
    //         <PageLoader />
    //         <PageLoader />
    //         <PageLoader />
    //       </div>
    //     </div>
    //   }
    return <>

        {blogInfo?.seoTag && <NextSeo
            nofollow={blogInfo?.seoTag}
            title={blogInfo?.seoTag?.title}
            description={blogInfo?.seoTag?.description}
            canonical={`${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`}
            openGraph={{
                url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`,
                title: blogInfo?.seoTag?.title,
                description: blogInfo?.seoTag?.description,
                images: blogInfo?.seoTag?.openGraph?.images,
                site_name: blogInfo?.seoTag?.title,
            }}
            twitter={{
                cardType: blogInfo?.seoTag?.Twitter,
            }}
        />}

        {blogInfo && <BlogArticle {...blogInfo} />}
        {checkArrNotEmpty(blogInfo?.schema) && <>
            {blogInfo.schema.map(shemaInfo => <GetSchemaJSON key={shemaInfo.id} shemaInfo={shemaInfo} />)}
        </>}
        {blogInfo?.customScripts && <script type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogInfo.customScripts) }} />}
    </>
}

export async function getStaticProps({ params, preview = false }) {
    const { blogSlug } = params;
    // console.log("slug", blogSlug);


    const blogInfo = await getBlogInfoBySlug(preview, blogSlug);
    if (!blogInfo) {
        console.log("blogInfo not found", blogInfo)
        return {
            notFound: true,
        }
    }

    // console.log("Update SiteMap ? ", process.env.updateSiteMap);

    return {
        props: {
            blogInfo
        },
        revalidate: 1200
    }

}
export async function getStaticPaths() {
    let allBlogs = await getAllBlogWithCategoryPath();
    let paths = [];
    allBlogs.forEach((item, index) => {
        paths = paths.concat(item.blogInCategory.map((blogInfo, index) => {
            return {
                params: {
                    categorySlug: item.slug.current,
                    blogSlug: blogInfo.seoLinks.current,
                }
            }
        }))
    })
    // console.log("allBlogs", paths)

    return {
        paths,
        // paths: allBlogs.map(pathInfo => {
        //     if (pathInfo && pathInfo.slug.current) {
        //         return {
        //             params: {
        //                 categorySlug: pathInfo.slug.current,
        //                 blogSlug: pathInfo.slug.current,
        //             }
        //         }
        //     }
        // }),
        fallback: true
        // paths: [
        //   { params: { ... } } // See the "paths" section below
        // ],
    };
}
export default SinglePost;