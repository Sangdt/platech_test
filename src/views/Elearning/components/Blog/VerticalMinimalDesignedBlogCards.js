import React from 'react';
// import withHydrationOnDemand from "react-hydration-on-demand";
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import Avatar from '@mui/material/Avatar';
import Link from 'next/link'
import { Image as DatoCMSImage } from "react-datocms"
import Container from 'components/Container';

// const mock = [
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img2.jpg',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//     title: 'Lorem ipsum dolor sit amet,',
//     author: {
//       name: 'Clara Bertoletti',
//       avatar: 'https://assets.maccarianagency.com/avatars/img4.jpg',
//     },
//     date: '04 Aug',
//   },
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img3.jpg',
//     description: 'Excepteur sint occaecat cupidatat non proident',
//     title: 'Consectetur adipiscing elit',
//     author: {
//       name: 'Jhon Anderson',
//       avatar: 'https://assets.maccarianagency.com/avatars/img5.jpg',
//     },
//     date: '12 Sep',
//   },
//   {
//     image: 'https://assets.maccarianagency.com/backgrounds/img4.jpg',
//     description: 'Eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
//     title: 'Labore et dolore magna aliqua',
//     author: {
//       name: 'Chary Smith',
//       avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg',
//     },
//     date: '22 Nov',
//   },
// ];

const VerticalMinimalDesignedBlogCards = ({ relatedBlog }) => {
  const theme = useTheme();
  // const isMd = useMediaQuery(theme.breakpoints.up('md'), {
  //   defaultMatches: true,
  // });
  return (
    <Container>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          Các bài viết mới nhất của Platechvn
        </Typography>
        <Typography
          variant="h4"
          align={'center'}
          // data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Tìm hiểu thêm về chúng tôi
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {relatedBlog.map((item, i) => (
          <Grid item xs={12} md={4} key={`${i}_${item.id}`} >
            <Link passHref href={item.seoLinks ? '/blog/' + item.seoLinks : '/blog'}>
              <Box
                component={'a'}
                // href={''}
                display={'block'}
                width={1}
                height={1}
                sx={{
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                <Box
                  component={Card}
                  width={1}
                  height={1}
                  boxShadow={4}
                  display={'flex'}
                  flexDirection={'column'}
                  sx={{ backgroundImage: 'none' }}
                >
                  <CardMedia
                    component={DatoCMSImage}
                    data={item.headerImage.responsiveImage}
                    // image={item.image}
                    // title={item.title}
                    sx={{
                      height: { xs: 300, md: 360 },
                      position: 'relative',
                    }}
                  />
                  <Box component={CardContent} position={'relative'}>
                    <Typography variant={'h6'} gutterBottom>
                      {item.pageTitle}
                    </Typography>
                    {/* <Typography color="text.secondary">
                      {item.description}
                    </Typography> */}
                  </Box>
                  <Box flexGrow={1} />
                  <Box padding={2} display={'flex'} flexDirection={'column'}>
                    <Box marginBottom={2}>
                      <Divider />
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      {/* <Box display={'flex'} alignItems={'center'}>
                      <Avatar
                        src={item.author.avatar}
                        sx={{ marginRight: 1 }}
                      />
                      <Typography color={'text.secondary'}>
                        {item.author.name}
                      </Typography>
                    </Box> */}
                      <Typography color={'text.secondary'}>
                        {item.blogDateTime}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
        <Grid item container justifyContent={'center'} xs={12}>
          <Link passHref href={'/blog'}>
            <Button
              fullWidth
              component='a'
              variant={'outlined'}
              size={'large'}
              sx={{ height: 54, maxWidth: 400, justifyContent: 'space-between' }}
              endIcon={
                <Box
                  component={'svg'}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </Box>
              }
            >
              Xem thêm
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

// export default withHydrationOnDemand({ on: ["visible"] })(memo(VerticalMinimalDesignedBlogCards));
export default VerticalMinimalDesignedBlogCards;
