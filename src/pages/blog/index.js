import React from 'react';
import BlogCategory from 'views/BlogCategory';
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { getBlogPageInfo } from "Helper/ServerAndBuild/callSanityCMS";
import GetSchemaJSON from "components/SharedComponents/GetSchemaJSON";
// import blogStyles from "../../styles/blog";
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';
// import { getAllBlogPath } from 'Helper/ServerAndBuild/callDatoCMSApi';

const BlogSearchPage = ({ blogPage }) => {
    const router = useRouter();

    return (<>
        {blogPage.seoTag && <NextSeo
            title={blogPage.seoTag?.title}
            description={blogPage.seoTag?.description}
            canonical={`${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`}
            openGraph={{
                url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`,
                title: blogPage.seoTag?.title,
                description: blogPage.seoTag?.description,
                images: blogPage?.seoTag?.openGraph?.images,
                site_name: blogPage.seoTag?.title,
            }}
            twitter={{
                cardType: blogPage?.seoTag?.Twitter,
            }}
        />}
        <BlogCategory  {...blogPage}/>
        {checkArrNotEmpty(blogPage.schema) && <>
            {blogPage.schema.map(shemaInfo => <GetSchemaJSON key={shemaInfo.id} shemaInfo={shemaInfo} />)}
        </>}
        {blogPage.customScripts && <script type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPage.customScripts) }} />}
    </>);
};
export async function getStaticProps({ params, preview = false, ...rest }) {
    // const { slug } = params;
  
    const blogPage = await getBlogPageInfo(preview);
    // console.log("slug", slug);
    return {
      props: { blogPage },
      revalidate: 1200
    }
  
  }
export default BlogSearchPage;
