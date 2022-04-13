import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { alpha, useTheme } from '@mui/material/styles';
import Link from "next/link"
// import Image from "next/Image"
import CircularProgress from '@mui/material/CircularProgress';

import Container from 'components/Container';
import { Image } from 'react-datocms';
import dynamic from "next/dynamic"

const ContactFormModal = dynamic(() => import(
  /* webpackChunkName: "ContactFormModal" */
  /* webpackMode: "lazy" */
  'components/SharedComponents/Modal/ContactFormModal').then(m => m.ContactFormModal),
  {
    ssr: false,
    loading: () => <div className="max-w-2xl mx-auto"><CircularProgress className='mx-auto' /></div>,
  });

const WithCtaButton = ({ productInCategory }) => {
  const [openContactFormModal, setOpenContactFormModal] = useState(null);

  const handleClickOpen = (productName) => {
    setOpenContactFormModal(productName);
    // console.log("filteredSearchResult", filteredSearchResult)
  };

  const handleClose = () => {
    setOpenContactFormModal(null);
  };
  return (
    <Container>
      <Grid container spacing={4}>
        {productInCategory.map((item, i) => (<SingleProductGrid key={`${i}_${item.id}`} {...item} handleClickOpen={handleClickOpen} />))}
      </Grid>
      {openContactFormModal && <ContactFormModal
        modalTitle={"Điền thông tin của bạn vào đây để chúng tôi liên lại nhé"}
        productName={openContactFormModal}
        openModal={!!openContactFormModal}
        handleModalClose={handleClose} />
      }
    </Container>
  );
};
const SingleProductGrid = ({ headerImage, price, productName, seoLinks, handleClickOpen }) => {
  const theme = useTheme();

  return <Grid item xs={12} sm={6} md={3} >
    <Box display={'block'} width={1} height={1}>
      <Card sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        bgcolor: 'transparent',
        backgroundImage: 'none',
      }}
      >
        <ProductCardHeader headerImage={headerImage} price={price} productName={productName} />
        <ProductCardAction handleClickOpen={handleClickOpen} seoLinks={seoLinks} productName={productName} theme={theme} />
      </Card>
    </Box>
  </Grid>
}

const ProductCardHeader = ({ headerImage, price, productName }) => (<>
  {headerImage?.responsiveImage && <CardMedia sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
    <Image data={headerImage.responsiveImage} />
  </CardMedia>}
  <Box
    marginTop={2}
    display={'flex'}
    alignItems={'center'}
    justifyContent={'space-between'}
  >
    <Typography
      fontWeight={700}
      sx={{ textTransform: 'uppercase' }}
    >
      {productName}
    </Typography>
    <Typography fontWeight={700}>{price}</Typography>
  </Box>
</>);

const ProductCardAction = ({ productName, handleClickOpen, seoLinks, theme }) => (<Stack marginTop={2} spacing={1} direction={'row'}>
  <Button
    variant={'contained'}
    color={'primary'}
    size={'large'}
    fullWidth
    onClick={e => handleClickOpen(productName)}
  >
    Mua ngay
    <svg
      style={{ paddingLeft: "5px" }}

      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      width={20}
      height={20}
    >
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  </Button>
  {seoLinks && <Link href={"/san-pham/" + seoLinks} passHref>
    <Button
      // compon
      color={'primary'}
      size={'large'}
      fullWidth
      sx={{ bgcolor: alpha(theme.palette.primary.light, 0.1) }}
    >
      Xem chi tiết
      <svg
        style={{ paddingLeft: "5px" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        width={20}
        height={20}
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  </Link>}
</Stack>);

export default WithCtaButton;
