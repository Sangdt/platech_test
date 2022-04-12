import React from 'react';
// import withHydrationOnDemand from "react-hydration-on-demand";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { colors } from '@mui/material';
import { Image as DatoCMSImage } from "react-datocms"
import Link from 'next/link'


// const mock = [
//   {
//     price: '$59 / month',
//     media: 'https://assets.maccarianagency.com/backgrounds/img5.jpg',
//     title: 'UX & web design',
//     tutor: 'Joshua Karamaki',
//     users: [
//       'https://assets.maccarianagency.com/avatars/img1.jpg',
//       'https://assets.maccarianagency.com/avatars/img2.jpg',
//       'https://assets.maccarianagency.com/avatars/img3.jpg',
//       'https://assets.maccarianagency.com/avatars/img4.jpg',
//       'https://assets.maccarianagency.com/avatars/img5.jpg',
//     ],
//   },
//   {
//     price: '$69 / month',
//     media: 'https://assets.maccarianagency.com/backgrounds/img6.jpg',
//     title: 'Software engineering',
//     tutor: 'Jhon Smith',
//     users: [
//       'https://assets.maccarianagency.com/avatars/img1.jpg',
//       'https://assets.maccarianagency.com/avatars/img2.jpg',
//       'https://assets.maccarianagency.com/avatars/img3.jpg',
//       'https://assets.maccarianagency.com/avatars/img4.jpg',
//       'https://assets.maccarianagency.com/avatars/img5.jpg',
//     ],
//   },
//   {
//     price: '$49 / month',
//     media: 'https://assets.maccarianagency.com/backgrounds/img7.jpg',
//     title: 'Graphic design for beginners',
//     tutor: 'Nicol Adams',
//     users: [
//       'https://assets.maccarianagency.com/avatars/img1.jpg',
//       'https://assets.maccarianagency.com/avatars/img2.jpg',
//       'https://assets.maccarianagency.com/avatars/img3.jpg',
//       'https://assets.maccarianagency.com/avatars/img4.jpg',
//       'https://assets.maccarianagency.com/avatars/img5.jpg',
//     ],
//   },
//   {
//     price: '$59 / month',
//     media: 'https://assets.maccarianagency.com/backgrounds/img9.jpg',
//     title: 'Marketing VS Sales',
//     tutor: 'Joshua Karamaki',
//     users: [
//       'https://assets.maccarianagency.com/avatars/img1.jpg',
//       'https://assets.maccarianagency.com/avatars/img2.jpg',
//       'https://assets.maccarianagency.com/avatars/img3.jpg',
//       'https://assets.maccarianagency.com/avatars/img4.jpg',
//       'https://assets.maccarianagency.com/avatars/img5.jpg',
//     ],
//   },
// ];

const Spaces = ({ productList }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });


  return (
    <Box>
      <Box marginBottom={4}>
        {/* <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          Popular courses
        </Typography> */}
        <Typography
          variant="h4"
          align={'center'}
          // data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Các sản phẩm mới
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          justifyContent={'center'}
          marginTop={2}
        >
          <Link href={"/danh-muc-san-pham"} passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
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
        </Box>
      </Box>
      <Box maxWidth={{ xs: 420, sm: 620, md: 1 }} margin={'0 auto'}>
        <Carousel {...sliderOpts}>
          {productList.map((item, i) => (
            <Box key={`${i}_${item.id}`} padding={{ xs: 1, md: 2, lg: 3 }}>
              <Box
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
                  display={'flex'}
                  flexDirection={'column'}
                  sx={{ backgroundImage: 'none' }}
                >
                  {item?.headerImage?.responsiveImage && <CardMedia
                    // title={item.headerImage.responsiveImage.title}
                    // alt={item.headerImage.responsiveImage.alt}
                    data={item?.headerImage?.responsiveImage ?? null}
                    component={item?.headerImage?.responsiveImage ? DatoCMSImage : null}
                    // image={item.media}
                    sx={{
                      position: 'relative',
                      height: { xs: 240, sm: 340, md: 280 },
                      overflow: 'hidden',
                    }}
                  >
                    {item.price && <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      position={'absolute'}
                      bottom={0}
                      padding={2}
                      width={1}
                      zIndex={2}
                    >
                      <Box
                        padding={1}
                        bgcolor={'background.paper'}
                        boxShadow={1}
                        borderRadius={2}
                      >
                        <Typography sx={{ fontWeight: 600 }}>
                          {item.price}
                        </Typography>
                      </Box>
                    </Box>}
                  </CardMedia>}
                  <CardContent>
                    <Typography
                      variant={'h6'}
                      gutterBottom
                      align={'left'}
                      sx={{ fontWeight: 700 }}
                    >
                      {item.productName}
                    </Typography>
                  </CardContent>
                  <Box flexGrow={1} />
                  {item?.seoLinks && <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Link href={"/chi-tiet-san-pham/" + item?.seoLinks}>
                      <Button
                        component={'a'}
                        variant="contained" size="medium">
                        Xem thêm
                      </Button>
                    </Link>
                  </CardActions>}
                </Box>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box >
  );
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const sliderOpts = {
  swipeable: false,
  draggable: false,
  showDots: true,
  responsive: responsive,
  ssr: true, // means to render carousel on server-side.
  infinite: true,
  autoPlay: true,
  autoPlaySpeed: 4000,
  // keyBoardControl: true,
  // customTransition: 'all .5',
  // transitionDuration: 500,
};
// export default withHydrationOnDemand({ on: ["visible"] })(memo(Spaces));
export default Spaces
