import React from 'react';
import {
  Box, Divider, useTheme
} from '@mui/material';
// import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Categories,
  Courses,
  Hero,
  PromoNumbers,
  Reviews,
  Subscription,
  VerticalMinimalDesignedBlogCards
} from './components';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';
import WithBrandBgColor from './components/Testimonial/WithBrandBgColor';

const Elearning = ({ pageTitle, shortDescription, welcomeContent, homeBanner, introduction, testimonial, relatedBlog, productList, categoryList, IntroductionSections }) => {
  const theme = useTheme();

  return (<>
    <Hero {...welcomeContent} />
    <Container>
      <PromoNumbers pageTitle={pageTitle}
        shortDescription={shortDescription}
        IntroductionSections={IntroductionSections} />
    </Container>
    <Box
      position={'relative'}
      sx={{
        backgroundColor: theme.palette.alternate.main,
      }}
    >
      <Container>
        {checkArrNotEmpty(categoryList) && <Categories categoryList={categoryList} />}
        <Container>
          <Divider />
        </Container>
        {checkArrNotEmpty(productList) && <Courses productList={productList} />}
        <Container>
          <Divider />
        </Container>
        {checkArrNotEmpty(relatedBlog) && <VerticalMinimalDesignedBlogCards relatedBlog={relatedBlog} />}

      </Container>

      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        sx={{
          width: '100%',
          marginBottom: theme.spacing(-1),
        }}
      >
        <path
          fill={theme.palette.background.paper}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path>
      </Box>
    </Box>
    <Container>
      {checkArrNotEmpty(testimonial) && <WithBrandBgColor testimonial={testimonial} />}
    </Container>
    <Box
      // sx={{
      //   maxHeight:"50%",
      //   background: 'transparent',
      //   backgroundImage: `linear-gradient(180deg, ${theme.palette.background.paper} 40%, ${theme.palette.primary.main} 0%)`,
      // }}
    >
      <Container>
        <Subscription />
      </Container>
    </Box>
  </>
  );
};

export default Elearning;
