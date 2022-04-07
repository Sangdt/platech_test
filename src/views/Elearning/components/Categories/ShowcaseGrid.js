import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import { Image as DatoCMSImage } from "react-datocms"
import Link from 'next/link'
import Button from '@mui/material/Button';

import Container from 'components/Container';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';


const ShowcaseGrid = ({ categoryList }) => {
  return (
    <Box bgcolor={'alternate.main'}>
      <Container className="mx-auto">
        <Grid container spacing={{ xs: 2}} className="mx-auto" >
          {categoryList.map((item, i) => (
            <Grid key={`${i}_${item.id}`} 
              item xs={12} sm={6} md={4} className="mx-auto">
              <Box width={1} height={1} position={'relative'}>
                {checkArrNotEmpty(item.categoryGallery) && item.categoryGallery[0]?.responsiveImage && < DatoCMSImage
                  data={item.categoryGallery[0].responsiveImage}
                  style={{
                    filter: 'brightness(0.7)',
                    borderRadius: 8,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />}
                <Box
                  position={'absolute'}
                  bottom={0}
                  left={0}
                  right={0}
                  width={1}
                  padding={2}
                  zIndex={2}
                >
                  {item.categoryName && <Typography
                    color={'common.white'}
                    fontWeight={700}
                    variant={'h6'}
                  >
                    {item.categoryName}
                  </Typography>}
                  {/* <Typography color={'common.white'}>
                    {item.description}
                  </Typography> */}
                  {item.seoLink && <Link href={'/danh-muc-san-pham/' + item.seoLink} passHref>
                    <Button
                      component={'a'}
                      // href={item.href}
                      variant={'contained'}
                      color={'primary'}
                      sx={{ marginTop: 2 }}
                    >
                      Xem thêm
                    </Button>
                  </Link>}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ShowcaseGrid;
