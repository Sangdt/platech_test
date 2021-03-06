import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { Image as DatoCMSImage } from "react-datocms"
import Link from 'next/link'

import Container from 'components/Container';

const mock = [
  {
    title: 'Adidas shoes',
    description:
      'Discover the new collection of Adidas. Starting at just $39.20',
    href: '#',
    image: 'https://assets.maccarianagency.com/backgrounds/img56.jpg',
  },
  {
    title: 'Nike',
    description: 'New arrivals of Nike sport shoes. Starting at just $59.20',
    href: '#',
    image: 'https://assets.maccarianagency.com/backgrounds/img57.jpg',
  },
  {
    title: 'Sneakers',
    description:
      'Trendy Sneakers designed for everyone. The price is as low as $42.20',
    href: '#',
    image: 'https://assets.maccarianagency.com/backgrounds/img58.jpg',
  },
];

const SpanningColumns = ({ categoryList }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <Box bgcolor={'alternate.main'}>
      <Container>
        {/* <Box marginBottom={2}>
          <Typography variant={'h6'} fontWeight={700}>
            Categories
          </Typography>
        </Box> */}
        <ImageList
          variant="quilted"
          cols={2}
          rowHeight={'auto'}
          gap={isMd ? 32 : 16}
          sx={{ margin: 0 }}
        >
          {categoryList.map((item, i) => (
            <ImageListItem
              key={item.id ?? i}
              cols={isMd ? 1 : 2}
              rows={isMd ? (i === 0 ? 2 : 1) : 1}
              sx={{ borderRadius: 2 }}
            >
              <img
                src={item.categoryGallery[0].responsiveImage.src}
                srcSet={item.categoryGallery[0].responsiveImage.srcSet}
                alt={item.categoryGallery[0].responsiveImage.alt}
                title={item.categoryGallery[0].responsiveImage.title}
                loading="lazy"
                style={{
                  filter: 'brightness(0.7)',
                  borderRadius: 8,
                }}
              />
              <Box
                position={'absolute'}
                top={0}
                left={0}
                right={0}
                width={1}
                padding={4}
                zIndex={2}
              >
                <Typography
                  color={'common.white'}
                  fontWeight={700}
                  fontSize={50}
                  variant={'subtitle1'}
                >
                  {item.categoryName}
                </Typography>
                {/* <Typography color={'common.white'} variant={'h6'} dangerouslySetInnerHTML={{ __html: item.categoryDescription }} /> */}
                <Link href={'/danh-muc-san-pham/'+item.seoLink} passHref>
                  <Button
                    component={'a'}
                    // href={item.href}
                    variant={'contained'}
                    color={'primary'}
                    sx={{ marginTop: 2 }}
                  >
                    Xem th??m
                  </Button>
                </Link>

              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Box>
  );
};

export default SpanningColumns;
