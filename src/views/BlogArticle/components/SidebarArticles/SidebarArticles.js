/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import * as tocbot from 'tocbot';
import 'tocbot/dist/tocbot.css';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// // import {
// //   Button,
// //   Grid, 
// //   CardContent,
// //   Card,
// //   Typography,
// //   Box,
// //   useTheme
// // } from '@mui/material';

// const mock = [
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img13.jpg',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     title: 'Lorem ipsum dolor sit amet',
//     author: {
//       name: 'Clara Bertoletti',
//     },
//     date: '04 Aug',
//   },
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img14.jpg',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     title: 'Consectetur adipiscing elit',
//     author: {
//       name: 'Jhon Anderson',
//     },
//     date: '12 Sep',
//   },
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img15.jpg',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     title: 'Lorem ipsum dolor sit amet',
//     author: {
//       name: 'Clara Bertoletti',
//     },
//     date: '04 Aug',
//   },
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img16.jpg',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     title: 'Consectetur adipiscing elit',
//     author: {
//       name: 'Jhon Anderson',
//     },
//     date: '12 Sep',
//   },
// ];

const SidebarArticles = ({ contentClassName, tocSelector }) => {
  // const theme = useTheme();
  const router = useRouter();
  const tocbotInitObj = {
    tocSelector: `${tocSelector ? tocSelector : '.js-toc'}`,
    ignoreSelector: 'toc-ignore',
    contentSelector: `${contentClassName ? contentClassName : '.js-toc-content '}`,
    headingSelector: 'h1, h2, h3, h4 , h5',
    hasInnerContainers: true,
    collapseDepth: 6,
    // disableTocScrollSync: false

  };
  const UpdateWhenRouteChange = (url) => {
    if (url.includes('/blog/') || url.includes('/san-pham/') || url.includes('/dich-vu/')) {
      tocbot.refresh(tocbotInitObj);
    } else {
      tocbot.destroy();
    }
  };
  useEffect(() => {
    tocbot.init(tocbotInitObj);
    // router.events.on('routeChangeComplete', UpdateWhenRouteChange);
    // return () => {
    //   router.events.off('routeChangeComplete', UpdateWhenRouteChange);

    // };
  }, []);
  return (
    <Box component={Card} variant={'outlined'} padding={2} sx={{
      position: 'relative'
    }}>
      <Typography
        variant="h6"
        data-aos={'fade-up'}
        sx={{
          fontWeight: 700,
          marginBottom: 2,
        }}
      >
        Mục lục :
      </Typography>
      <Grid container spacing={2}>
        <CardContent className='js-toc' />
      </Grid>
    </Box>
  );
};

export default SidebarArticles;



/**
 * const SidebarArticles = () => {
  const theme = useTheme();
  return (
    <Box component={Card} variant={'outlined'} padding={2}>
      <Typography
        variant="h6"
        data-aos={'fade-up'}
        sx={{
          fontWeight: 700,
          marginBottom: 2,
        }}
      >
        Upcoming updates
      </Typography>
      <Grid container spacing={2}>
        {mock.map((item, i) => (
          <Grid key={i} item xs={12}>
            <Box
              component={Card}
              width={1}
              height={1}
              boxShadow={0}
              borderRadius={0}
              display={'flex'}
              flexDirection={{ xs: 'column', md: 'row' }}
              sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
            >
              <Box
                sx={{
                  width: { xs: 1, md: '50%' },
                  '& .lazy-load-image-loaded': {
                    height: 1,
                    display: 'flex !important',
                  },
                }}
              >
                <Box
                  component={LazyLoadImage}
                  height={1}
                  width={1}
                  src={item.image}
                  alt="..."
                  effect="blur"
                  sx={{
                    objectFit: 'cover',
                    maxHeight: 120,
                    borderRadius: 2,
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
                  }}
                />
              </Box>
              <CardContent
                sx={{ padding: 1, '&:last-child': { paddingBottom: 1 } }}
              >
                <Typography fontWeight={700}>{item.title}</Typography>
                <Box marginY={1 / 4}>
                  <Typography
                    variant={'caption'}
                    color={'text.secondary'}
                    component={'i'}
                  >
                    {item.author.name} - {item.date}
                  </Typography>
                </Box>
                <Button size={'small'}>Read More</Button>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
 */