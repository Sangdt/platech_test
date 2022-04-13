/* eslint-disable no-dupe-keys */
import React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';
// import Grid from '@mui/material/Grid';
const ProductVariants = ({ productVariants }) => {
  return (<div className="info-detail">
    <div className="flex flex-wrap ">
      {productVariants.map(({ id, varinatName, variantValue }, index) => <div key={id || index} className="sm:w-1/2 pr-4 pl-4">
        <ul>
          {varinatName && <li><strong>{varinatName}</strong></li>}
          {variantValue && <li dangerouslySetInnerHTML={{ __html: variantValue }} />}
        </ul>
      </div>)}
    </div>
  </div>);
}

const Details = ({ id, productName, shortDescription, productVariants, localPrice, contactDetail }) => {
  // const theme = useTheme();
  // const [size, setSize] = useState('M');
  // const [color, setColor] = useState('white');
  // const [quantity, setQuantity] = useState(1);
  // const quantityLimit = 4;

  return (
    <Box>
      <Box
        padding={1}
        display={'inline-flex'}
        borderRadius={1}
        bgcolor={'primary.main'}
        marginBottom={1}
      >
        <Typography sx={{ color: 'common.white', lineHeight: 1 }}>
          new
        </Typography>
      </Box>
      <Typography variant={'h4'} fontWeight={700}>
        {productName}
      </Typography>
      <Box marginY={3}>
        <Box display={'flex'}>
          {/* <Typography
            variant={'h5'}
            color={'text.secondary'}
            sx={{ textDecoration: 'line-through', marginRight: 1 }}
          >
            $199.90
          </Typography> */}
          {localPrice && <Typography variant={'h5'} fontWeight={700}>
            {"$" + localPrice}
          </Typography>}
        </Box>
      </Box>
      <Typography component={"div"} dangerouslySetInnerHTML={{ __html: shortDescription }} variant={'subtitle2'} color={'text.secondary'} />
      <Box marginY={3}>
        {checkArrNotEmpty(productVariants) && <ProductVariants productVariants={productVariants} />}
      </Box>
      <Stack marginTop={3} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant={'contained'}
          color={'primary'}
          size={'large'}
          fullWidth
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width={20}
              height={20}
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          }
        >
          Mua ngay
        </Button>
      </Stack>
      {checkArrNotEmpty(contactDetail) && <Box marginY={3}>
        <Typography>Need a support?</Typography>
        <Stack direction={'row'} spacing={2} marginTop={0.5}>
          <div className="contatc-detail">
            {contactDetail.map((contact, index) => <div key={contact.id || index}
              dangerouslySetInnerHTML={{ __html: contact.infoDetail }} />)}
          </div>
        </Stack>
      </Box>}
      <Box>
        <Typography>Chia sẻ ngay:</Typography>
        <Stack direction={'row'} marginTop={0.5}>
          <IconButton color={'primary'}>
            <FacebookIcon />
          </IconButton>
          <IconButton color={'primary'}>
            <InstagramIcon />
          </IconButton>
          <IconButton color={'primary'}>
            <TwitterIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Details;
