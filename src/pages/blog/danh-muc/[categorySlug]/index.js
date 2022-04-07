import React from 'react';
import SingleBlogCategory from 'views/SingleBlogCategory';
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { getAllCategoryBlogPath, getBlogCategoryPageInfo } from "Helper/ServerAndBuild/callSanityCMS";
import GetSchemaJSON from "components/SharedComponents/GetSchemaJSON";
// import blogStyles from "../../styles/blog";
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const BlogSearchPage = ({ blogPage }) => {
  const router = useRouter();
  // console.log("blogPage",blogPage)
  return (<>
    {blogPage?.seoTag && <NextSeo
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
    {blogPage && <SingleBlogCategory  {...blogPage} />}
    {checkArrNotEmpty(blogPage?.schema) && <>
      {blogPage.schema.map(shemaInfo => <GetSchemaJSON key={shemaInfo.id} shemaInfo={shemaInfo} />)}
    </>}
    {blogPage?.customScripts && <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPage.customScripts) }} />}
  </>);
};
export async function getStaticProps({ params, preview = false, ...rest }) {
  const { categorySlug } = params;

  const blogPage = await getBlogCategoryPageInfo(preview, categorySlug);
  // console.log("slug", slug);
  return {
    props: { blogPage },
    revalidate: 1200
  }

}
export async function getStaticPaths() {
  let allBlogs = await getAllCategoryBlogPath();
  // console.log("allBlogs",allBlogs)
  return {
    paths: allBlogs.map(pathInfo => {
      if (pathInfo && pathInfo.seoLinks.current) {
        return {
          params: {
            categorySlug: pathInfo.seoLinks.current,
          }
        }
      }
    }),
    fallback: true
    // paths: [
    //   { params: { ... } } // See the "paths" section below
    // ],
  };
}
export default BlogSearchPage;
