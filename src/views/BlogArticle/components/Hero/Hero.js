import React from 'react';
// import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import {
//   Avatar, ListItemText, Typography, Box, alpha
// } from '@mui/material';
import Container from 'components/Container';
import { Image } from 'react-datocms';

const Hero = ({ pageTitle, headerImage, _publishedAt, _modelApiKey, location }) => {
  // useEffect(() => {
  //   const jarallaxInit = async () => {
  //     const jarallaxElems = document.querySelectorAll('.jarallax');
  //     if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
  //       return;
  //     }

  //     const { jarallax } = await import('jarallax');
  //     jarallax(jarallaxElems, { speed: 0.2 });
  //   };

  //   jarallaxInit();
  // });

  return (<Box
    position={'relative'}
    minHeight={{ xs: 400, sm: 500, md: 600 }}
    display={'flex'}
    marginTop={-13}
    paddingTop={13}
    alignItems={'center'}
  >
    {(headerImage && headerImage.responsiveImage) && <Image data={headerImage.responsiveImage} 
    layout={"fill"} 
    objectFit={"cover"} 
    objectPosition="50% 50%"
    lazyLoad={false}
    />}
    {/* <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 1,
        height: 1,
        background: alpha('#161c2d', 0.6),
        zIndex: 1,
      }}
    /> */}
    <Container position={'relative'} zIndex={2}>
      <Box >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 400,
            color: 'common.grey',
            marginBottom: 2,
          }}
        >
          {pageTitle}
        </Typography>
        <Box display={'flex'} alignItems={'center'}>
          {/* <Avatar
          sx={{ width: 60, height: 60, marginRight: 2 }}
          src={'https://assets.maccarianagency.com/avatars/img3.jpg'}
        /> */}
          <ListItemText
            sx={{ margin: 0 }}
            primary={_publishedAt}
            // secondary={'May 19, 2021'}
            primaryTypographyProps={{
              variant: 'h6',
              // sx: { color: 'common.white' },
            }}
            secondaryTypographyProps={{
              // sx: { color: alpha('#ffffff', 0.8) },
            }}
          />
        </Box>
      </Box>
    </Container >
  </Box>
  );
};

export default Hero;
