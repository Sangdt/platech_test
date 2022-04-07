import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// import Main from 'layouts/Main';
import HorizontallyAlignedBlogCardWithShapedImage from '../../blocks/blog/HorizontallyAlignedBlogCardWithShapedImage/HorizontallyAlignedBlogCardWithShapedImage';
import Container from 'components/Container';
// import {
//   Breadcrumb
//   , Newsletter
//   // , Result
// } from '../ProductCategory/components';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';
import Breadcrumb from 'components/SharedComponents/Breadcrumb';

const PageBanner = ({ pageTitle, pageDescription }) => {

  return (<div className="box-top text-center">
    <div className="wrap-main">
      <div className="box-text">
        <h1 className="tt-1">{pageTitle}</h1>
        <div className="mt20" dangerouslySetInnerHTML={{ __html: pageDescription }} />
      </div>
    </div>
  </div>
  );
}

const BlogCategory = ({ blogList, categoryName, pageDescription, slug }) => {
  const theme = useTheme();
  // console.log("blogList",blogList)
  return (
    <>
      <Box bgcolor={'alternate.main'}>
        <Container paddingY={2}>
          <Breadcrumb routeArray={[
            {
              href: '/',
              title: 'Trang chủ',
              isActive: false,
            },
            {
              href: '/blog/',
              title: 'Danh sách các bài viết',
              isActive: false,
            },
            slug.current && {
              href: '/blog/danh-muc/' + slug.current,
              title: categoryName,
              isActive: true,
            },
          ]} />
        </Container>
        <Container paddingY={2}>
          <PageBanner pageTitle={categoryName} pageDescription={pageDescription} />
        </Container>
      </Box>
      <Container>
        {blogList && checkArrNotEmpty(blogList) && blogList.map((item, index) =>
          <HorizontallyAlignedBlogCardWithShapedImage key={`${index}_${item.ID}`}  {...item} />)
        }
        {/* <HorizontallyAlignedBlogCardWithShapedImage />
        <HorizontallyAlignedBlogCardWithShapedImage />
        <HorizontallyAlignedBlogCardWithShapedImage /> */}
      </Container>
      <Box
        position={'relative'}
        marginTop={{ xs: 4, md: 6 }}
        sx={{
          backgroundColor: theme.palette.alternate.main,
        }}
      >
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.alternate.main}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
        {/* <Container>
          <Newsletter />
        </Container> */}
      </Box>
    </>
  );
};

export default BlogCategory;
