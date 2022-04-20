import React from 'react';
import withHydrationOnDemand from "react-hydration-on-demand";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import Input from '@mui/material/Input';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { alpha, useTheme } from '@mui/material/styles';
import { Image as DatoCMSImage } from "react-datocms"

import Container from 'components/Container';
const LeftSide = ({ label, shortDescription, CTAbtn }) => {
  // const theme = useTheme();

  return (
    <Box >
      {label && <Box marginBottom={2}>
        <Typography variant="h1" color="text.primary" style={{ fontSize: 50 }} >
          {label}
        </Typography>
      </Box>}
      {shortDescription && <Box marginBottom={3}>
        <Typography variant="caption" component="div" color="text.secondary" fontSize={25} dangerouslySetInnerHTML={{ __html: shortDescription }} />
      </Box>}
      {CTAbtn &&
        <Link href={CTAbtn?.linkTo?.seoLinks ?? "/"} passHref>
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            height={54}
            marginTop={{ xs: 2, sm: 0 }}
          // marginLeft={{ sm: 2 }}
          >
            {CTAbtn?.title}
          </Box>
        </Link>}
    </Box>
  );
}
const RightSide = ({ headerImage }) => {
  return (
    <Box
      sx={{
        height: { xs: 'auto', md: 1 },
        '& img': {
          objectFit: 'cover',
        },
      }}
    >
      <Box
        component={DatoCMSImage}
        // effect="blur"
        data={headerImage.responsiveImage}
        // src={'https://assets.maccarianagency.com/backgrounds/img2.jpg'}
        height={{ xs: 'auto', md: 1 }}
        maxHeight={{ xs: 300, md: 1 }}
        width={1}
        maxWidth={1}
      />
    </Box>
  );
};
const Hero = ({ headerImage, label, shortDescription, CTAbtn }) => {
  // console.log("Hero", { headerImage, label, shortDescription, CTAbtn })
  return (
    <Box
      sx={{
        bgcolor: 'alternate.main',
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <Container paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
        <Box
          display={'flex'}
          flexDirection={{ xs: 'column', md: 'row' }}
          position={'relative'}
        >
          <Box width={1} order={{ xs: 2, md: 1 }}>
            <Container>
              <LeftSide label={label} shortDescription={shortDescription} CTAbtn={CTAbtn} />
            </Container>
          </Box>
          <Box
            sx={{
              flex: { xs: '0 0 100%', md: '0 0 50%' },
              position: 'relative',
              maxWidth: { xs: '100%', md: '50%' },
              order: { xs: 1, md: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: 1, md: '50vw' },
                height: '100%',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    left: '0%',
                    width: 1,
                    height: 1,
                    position: { xs: 'relative', md: 'absolute' },
                    clipPath: {
                      xs: 'none',
                      md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
                    },
                    shapeOutside: {
                      xs: 'none',
                      md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
                    },
                  }}
                >
                  {headerImage && headerImage?.responsiveImage ? <RightSide headerImage={headerImage} /> : <></>}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Divider />
    </Box>
  );
};

export default withHydrationOnDemand({ on: ["visible"] })(Hero);
