import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
// import Avatar from '@mui/material/Avatar';

import Container from 'components/Container';
import Link from 'next/link';
import { Image } from 'react-datocms';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

// const mock = [
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img13.jpg',
//     description:
//       'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
//     title: 'Eiusmod tempor incididunt',
//     author: {
//       name: 'Clara Bertoletti',
//       avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
//     },
//     date: '10 Sep',
//   },
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img14.jpg',
//     description: 'At vero eos et accusamus et iusto odio dignissimos ducimus',
//     title: 'Sed ut perspiciatis',
//     author: {
//       name: 'Jhon Anderson',
//       avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
//     },
//     date: '02 Aug',
//   },
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img17.jpg',
//     description:
//       'Qui blanditiis praesentium voluptatum deleniti atque corrupti',
//     title: 'Unde omnis iste natus',
//     author: {
//       name: 'Chary Smith',
//       avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
//     },
//     date: '05 Mar',
//   },
// ];

const VerticallyAlignedBlogCardOverlappedWithDescriptionBox = ({ pageTitle, pageDescription, blogList }) => {
  // const theme = useTheme();
  return (
    <Container>
      <Box>
        <PageHeader pageDescription={pageDescription} pageTitle={pageTitle} />
        {checkArrNotEmpty(blogList) && <Grid container spacing={4}>
          {blogList.map((item, i) => (<SingleItem
            key={`${i}_${item.ID}`}
            {...item} />
          ))}
        </Grid>}
      </Box>
    </Container>
  );
};

const PageHeader = ({ pageTitle, pageDescription }) => {
  return (<Box
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    flexDirection={{ xs: 'column', sm: 'row' }}
    marginBottom={4}
  >
    <Box>
      {pageTitle && <Typography fontWeight={700} variant={'h4'} gutterBottom>
        {pageTitle}
      </Typography>}
      {pageDescription && <Typography component={"div"} color={'text.secondary'} dangerouslySetInnerHTML={{ __html: pageDescription }}  />}
    </Box>
    <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
      <Link href={"/blog/search"} passHref>
        <Button
          component={'a'}
          variant="outlined"
          color="primary"
          size="large"
        >
          View all
        </Button>
      </Link>
    </Box>
  </Box>);
}

const SingleItem = ({ index, ID, seoLinks, categoryName, headerImage, pageDescription }) => {
  const theme = useTheme();

  return (<Grid item xs={12} md={4}>
    <Link href={seoLinks} passHref>
      <Box component={'a'} display={'block'} width={1} height={1}
        sx={{
          textDecoration: 'none',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            transform: `translateY(-${theme.spacing(1 / 2)})`,
          },
        }}
      >
        <Box component={Card} width={1} height={1} boxShadow={0} sx={{ bgcolor: 'transparent', backgroundImage: 'none' }}>
          {headerImage?.responsiveImage && <HeaderImage {...headerImage}
            theme={theme}
            categoryName={categoryName} />}
          <BoxContent
            pageDescription={pageDescription}
            categoryName={categoryName} />
        </Box>
      </Box>
    </Link>
  </Grid>);
}

const HeaderImage = ({ responsiveImage, categoryName, theme }) => (<CardMedia
  title={categoryName}
  sx={{
    height: { xs: 250 },
    position: 'relative',
    filter:
      theme.palette.mode === 'dark'
        ? 'brightness(0.7)'
        : 'none',
  }}
>
  <Image
    data={responsiveImage}
  />
</CardMedia>

);

const BoxContent = ({ categoryName, pageDescription }) => {
  return (<Box
    width={'90%'}
    margin={'0 auto'}
    display={'flex'}
    flexDirection={'column'}
    boxShadow={3}
    bgcolor={'background.paper'}
    position={'relative'}
    zIndex={3}
    sx={{ transform: 'translateY(-30px)' }}
  >
    <Box component={CardContent} position={'relative'} paddingTop={5}>
      {categoryName && <Typography variant={'h6'} gutterBottom>
        {categoryName}
      </Typography>}
      {pageDescription && <Typography color="text.secondary" component={"div"} dangerouslySetInnerHTML={{ __html: pageDescription }} />}
    </Box>
    <Box flexGrow={1} />
    <Box padding={2} display={'flex'} flexDirection={'column'}>
      <Box marginBottom={2}>
        <Divider />
      </Box>
    </Box>
  </Box>

  );
}
export default VerticallyAlignedBlogCardOverlappedWithDescriptionBox;
