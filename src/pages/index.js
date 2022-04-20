import React from 'react';
import Elearning from 'views/Elearning';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
// import Head from 'next/head';


import { getHomepageData } from "Helper/ServerAndBuild/callSanityCMS";
// import Home from "components/HomePage/index";
import GetSchemaJSON from 'components/SharedComponents/GetSchemaJSON';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const Index = ({ homePageData, ...rest }) => {
  const router = useRouter();
  // console.log("homePageData from index", rest);
  return <>
    {homePageData.seoTag && <NextSeo
      title={homePageData.seoTag.title}
      description={homePageData.seoTag.description}
      canonical={`${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`}
      openGraph={{
        url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}${router.asPath}`,
        title: homePageData.seoTag.title,
        description: homePageData.seoTag.description,
        images: homePageData?.seoTag?.openGraph?.images,

        site_name: homePageData.seoTag.title,
      }}
      twitter={{
        cardType: homePageData.seoTag.twitterCard,
      }}
    />}
    {homePageData && <Elearning {...homePageData} />}

    {checkArrNotEmpty(homePageData.schema) && <>
      {homePageData.schema.map(shemaInfo => <GetSchemaJSON key={shemaInfo.id} shemaInfo={shemaInfo} />)}
    </>}
    {homePageData.customScripts && <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageData.customScripts) }} />
    }
  </>;
};

export async function getStaticProps(context) {
  const homePageData = await getHomepageData();
  // console.log("test", context);
  return {
    props: { homePageData }, // will be passed to the page component as props
    revalidate: 1200

  }
}
export default Index;
