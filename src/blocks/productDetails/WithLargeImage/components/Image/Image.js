import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Image } from 'react-datocms'
// const mock = [
//   {
//     title: '',
//     src: 'https://assets.maccarianagency.com/backgrounds/img54.jpg',
//   },
//   {
//     title: '',
//     src: 'https://assets.maccarianagency.com/backgrounds/img53.jpg',
//   },
//   {
//     title: '',
//     src: 'https://assets.maccarianagency.com/backgrounds/img55.jpg',
//   },
// ];

const ImageSlider = ({ productGallery, productGallerythumbs }) => {
  // console.log("productGallery, productGallerythumbs", productGallery, productGallerythumbs)
  const [current, setCurrent] = useState(productGallery[0]);
  const getItemByID = (id) => productGallery.find(item => item.id === id)
  return (
    <Box>
      {current && (
        <Box
          sx={{
            marginBottom: 2,
            width: 1,
            height: 'auto',
            '& img': {
              width: 1,
              height: 1,
              objectFit: 'cover',
              borderRadius: 2,
            },
          }}
        >
          <Image data={current.responsiveImage} />
        </Box>
      )}
      <Stack
        direction={'row'}
        spacing={2}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        {productGallerythumbs.map((item, i) => (
          <Box
            key={`${i}_${item.id}`}
            onClick={() => setCurrent(getItemByID(item.id))}
            sx={{
              width: 80,
              height: 'auto',
              cursor: 'pointer',
              '& img': {
                width: 1,
                height: 1,
                objectFit: 'cover',
                borderRadius: 2,
              },
            }}
          >
            <Image data={item.responsiveImage} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ImageSlider;
