/* eslint-disable no-dupe-keys */
import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
// import {
//   Grid, useTheme, useMediaQuery, Box
// } from '@mui/material';
// import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Content,
  // FooterNewsletter,
  Hero,
  // SidebarArticles,
  // SidebarNewsletter,
  // SimilarStories,
} from './components';
import dynamic from 'next/dynamic';

const SidebarArticles = dynamic(() => import(  /* webpackChunkName: "SidebarArticles" */'./components/SidebarArticles/SidebarArticles'));
const SidebarNewsletter = dynamic(() => import(  /* webpackChunkName: "SidebarNewsletter" */'./components/SidebarNewsletter/SidebarNewsletter'));

const BlogArticle = ({ useToc, location, contactForm, blogDateTime, pageTitle, id, headerImage, tags, relativeBlog, blogBody, _modelApiKey }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    // defaultMatches: true,
  });

  return (<>
    <Box className='js-toc-content'>
      <Container fluidContainer={true}>
        <Hero
          pageTitle={pageTitle}
          _modelApiKey={_modelApiKey}
          location={location}
          headerImage={headerImage}
          _publishedAt={blogDateTime}
        />
        <Grid container >
          {isMd && <Grid item xs={12} md={3} sx={{
            position: '-webkit-sticky',
            position: 'sticky',
            top: {
              xs: 40, // theme.breakpoints.up('xs')
              md: 0, // theme.breakpoints.up('md')
            },
            // bottom: 20,
            paddingTop: '40px',
            // paddingBottom: '40px',
            zIndex: 5,
          }}>
            <SidebarNewsletter />
          </Grid>}

          {blogBody && <Grid item xs={12} md={6} paddingTop={0}>
            <Content blogBody={blogBody} contactForm={contactForm} />
          </Grid>}

          {isMd && useToc ? (<Grid item xs={12} md={3} paddingTop={'40px'}>
            <Box marginBottom={4} sx={{
              position: '-webkit-sticky',
              position: 'sticky',
              top: {
                xs: 40, // theme.breakpoints.up('xs')
                md: 0, // theme.breakpoints.up('md')
              },
              // bottom: 20,
              // paddingTop: '40px',
              // paddingBottom: '40px',
              zIndex: 5,
            }}>
              <SidebarArticles relativeBlog={relativeBlog} />
            </Box>

          </Grid>) : null}
        </Grid>
      </Container>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        sx={{
          marginBottom: -1,
          width: 1,
        }}
      >
        <path
          fill={theme.palette.alternate.main}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path>
      </Box>
    </Box>
    {/* <Box bgcolor={'alternate.main'}>
      <Container>
        <SimilarStories />
      </Container>
      <Container>
        <FooterNewsletter />
      </Container>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        sx={{
          marginBottom: -1,
          width: 1,
        }}
      >
        <path
          fill={theme.palette.background.paper}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path>
      </Box>
    </Box> */}
  </>
  );
};

export default BlogArticle;
