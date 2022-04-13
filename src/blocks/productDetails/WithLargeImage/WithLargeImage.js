/* eslint-disable no-dupe-keys */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import dynamic from 'next/dynamic';

import { ImageSlider, Details } from './components';

import Container from 'components/Container';
import Content from 'views/BlogArticle/components/Content/Content';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const SidebarArticles = dynamic(() => import(  /* webpackChunkName: "SidebarArticles" */'views/BlogArticle/components/SidebarArticles/SidebarArticles'));
const SidebarNewsletter = dynamic(() => import(  /* webpackChunkName: "SidebarNewsletter" */'views/BlogArticle/components/SidebarNewsletter/SidebarNewsletter'));


const WithLargeImage = ({ productInfo }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    // defaultMatches: true,
  });
  return (<>
    <Container >
      <Box>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} md={5}>
            <Details {...productInfo} />
          </Grid>
          <Grid item xs={12} md={7}>
            {checkArrNotEmpty(productInfo.productGallery) && <ImageSlider  {...productInfo} />}
          </Grid>
        </Grid>
      </Box>
    </Container>

    <Container fluidContainer={true} >
      <Grid container className='js-toc-content'>
        {isMd && <Grid item xs={12} md={3}>
          <SidebarNewsletter />
        </Grid>}

        <Grid item xs={12} md={6}>
          <Content blogBody={productInfo.productInfoDetail} />
        </Grid>

        <Grid item xs={12} md={3} >
          {isMd ? (
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
              <SidebarArticles />
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  </>);
};

export default WithLargeImage;
