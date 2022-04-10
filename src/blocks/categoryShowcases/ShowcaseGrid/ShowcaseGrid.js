import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import Container from 'components/Container';
import { Image } from 'react-datocms';

// const mock = [
//   {
//     title: 'Adidas shoes',
//     description:
//       'Discover the new collection of Adidas. Starting at just $39.20',
//     href: '#',
//     image: 'https://assets.maccarianagency.com/backgrounds/img56.jpg',
//   },
//   {
//     title: 'Nike',
//     description: 'New arrivals of Nike sport shoes. Starting at just $59.20',
//     href: '#',
//     image: 'https://assets.maccarianagency.com/backgrounds/img57.jpg',
//   },
//   {
//     title: 'Sneakers',
//     description:
//       'Trendy Sneakers designed for everyone. The price is as low as $42.20',
//     href: '#',
//     image: 'https://assets.maccarianagency.com/backgrounds/img58.jpg',
//   },
//   {
//     title: 'Denim',
//     description: 'Denim jeans new arrivals. Starting at just $49.50',
//     href: '#',
//     image: 'https://assets.maccarianagency.com/backgrounds/img59.jpg',
//   },
//   {
//     title: 'Jeans Jackets',
//     description: 'New Jeans Jacket spring collection. Starting at just $22.90',
//     href: '#',
//     image: 'https://assets.maccarianagency.com/backgrounds/img60.jpg',
//   },
//   {
//     title: 'Slim Jeans',
//     description: 'Discover the Slim Jeans at as low as $12.90 price',
//     href: '#',
//     image: 'https://assets.maccarianagency.com/backgrounds/img61.jpg',
//   },
// ];

const ShowcaseGrid = ({ categoryName, id, productInCategory, seoLink }) => {
  // console.log("categoryList", categoryName, id, productInCategory, seoLink)
  return (
    <Box bgcolor={'alternate.main'}>
      <Container>
        <Box marginBottom={2}>
          <Typography variant={'h6'} fontWeight={700}>
            {categoryName} :
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {productInCategory.map((item, i) => (<SingleProductGrid {...item} key={`${i}_${item.id}`} />))}
        </Grid>
      </Container>
    </Box>
  );
};

const SingleProductGrid = ({ seoLinks, headerImage, price, productName, searchResultDisplay = false }) => (<Grid item xs={12} sm={6} md={4} margin={searchResultDisplay ? 5 : ""}>
  <Box width={1} height={1} position={'relative'} paddingTop={searchResultDisplay ? "" : "5"}>
    {headerImage?.responsiveImage && <Image
      data={headerImage.responsiveImage}
      // src={item.image}
      // alt={item.title}
      // loading="lazy"
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
      <Typography
        color={'common.white'}
        fontWeight={700}
        variant={searchResultDisplay ? 'caption' : 'h6'}
      >
        {productName}
      </Typography>
      {price && <Typography color={'common.white'}
        variant={searchResultDisplay ? 'caption' : 'body1'}
      >
        {price}
      </Typography>}
      {searchResultDisplay && <br />}
      {seoLinks && <Link
        href={"/san-pham/" + seoLinks}
      >
        <a className={searchResultDisplay ? " text-yellow-400" : " text-white"}>Mua ngay </a>
      </Link>}
    </Box>
  </Box>
</Grid>);

export default ShowcaseGrid;
export {
  SingleProductGrid
}
