import React, { useState } from 'react';
import withHydrationOnDemand from "react-hydration-on-demand";
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
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
import Script from 'next/script'
import useInView from "react-cool-inview";

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
  const [nonceValue, setNonce] = useState(null);
  const [loadCarousel, setloadCarousel] = useState(false);
  const { observe, inView } = useInView({
    threshold: 0.25, // Default is 0
    onEnter: () => {
      console.log("enter view")
      if (!nonceValue) setNonce(document.head.querySelector("[property~=csp-nonce][content]").content)
    },
  });
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (<>
    {/* {loadCarousel && <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.css" />} */}
    <Box ref={observe}>
      <Box marginBottom={4}>
        <Typography variant={"h4"} align={'center'} gutterBottom sx={{ fontWeight: 700, }} >
          C??c s???n ph???m m???i
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
              Xem th??m
            </Button>
          </Link>
        </Box>
      </Box>

      <Box maxWidth={{ xs: 420, sm: 620, md: 1 }} margin={'0 auto'}>
        <Button aria-label="Previous" className="glider-prev flex-1 relative top-72 m-5">??</Button>
        <Button aria-label="Next" className="glider-next float-right top-72 m-5">??</Button>

        <Box className="glider" display={"flex"} >
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
                  maxWidth={450}
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
                    <Link href={"/san-pham/" + item?.seoLinks}>
                      <Button
                        component={'a'}
                        variant="contained" size="medium">
                        Xem th??m
                      </Button>
                    </Link>
                  </CardActions>}
                </Box>
              </Box>
            </Box>
          ))}

        </Box>

      </Box>
      <div role="tablist" className="dots"></div>

    </Box >
    {(nonceValue || inView) && <Script
      nonce={nonceValue}
      id="Glider-js"
      // strategy="lazyOnload"
      src="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js"
      onLoad={() => {
        setloadCarousel(true);
        // eslint-disable-next-line no-undef
        new Glider(document.querySelector('.glider'), {
          slidesToScroll: 1,
          slidesToShow: 3,
          draggable: true,
          dots: '.dots',
          arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
          }
        });
      }}
    />}
    {(nonceValue || inView) && <style jsx global>{`.glider, .glider-contain {
  margin: 0 auto;
  position: relative
}

.glider, .glider-track {
  transform: translateZ(0)
}

.glider-dot, .glider-next, .glider-prev {
  border: 0;
  padding: 0;
  user-select: none;
  outline: 0
}

.glider-contain {
  width: 100%
}

.glider {
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none
}

.glider-track {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  z-index: 1
}

.glider.draggable {
  user-select: none;
  cursor: -webkit-grab;
  cursor: grab
}

.glider.draggable .glider-slide img {
  user-select: none;
  pointer-events: none
}

.glider.drag {
  cursor: -webkit-grabbing;
  cursor: grabbing
}

.glider-slide {
  user-select: none;
  justify-content: center;
  align-content: center;
  width: 100%;
  min-width: 150px
}

.glider-slide img {
  max-width: 100%
}

.glider::-webkit-scrollbar {
  opacity: 0;
  height: 0
}

.glider-next, .glider-prev {
  // position: absolute;
  background: 0 0;
  z-index: 2;
  font-size: 40px;
  text-decoration: none;
  left: -23px;
  // top: 30%;
  cursor: pointer;
  color: #00ff08;
  opacity: 1;
  line-height: 1;
  transition: opacity .5s cubic-bezier(.17, .67, .83, .67), color .5s cubic-bezier(.17, .67, .83, .67)
}

.glider-next:focus, .glider-next:hover, .glider-prev:focus, .glider-prev:hover {
  color: #00ff08;
}

.glider-next {
  right: -23px;
  left: auto
}

.glider-next.disabled, .glider-prev.disabled {
  opacity: .25;
  color: #00ff08;
  cursor: default
}

.glider-hide {
  opacity: 0
}

.glider-dots {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: 0
}

.glider-dot {
  display: block;
  cursor: pointer;
  color: #ccc;
  border-radius: 999px;
  background: #ccc;
  width: 12px;
  height: 12px;
  margin: 7px
}

.glider-dot:focus, .glider-dot:hover {
  background: #ddd
}

.glider-dot.active {
  background: #a89cc8
}

@media(max-width:36em) {
  .glider::-webkit-scrollbar {
    opacity: 1;
    -webkit-appearance: none;
    width: 7px;
    height: 3px
  }

  .glider::-webkit-scrollbar-thumb {
    opacity: 1;
    border-radius: 99px;
    background-color: rgba(156, 156, 156, .25);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .25);
    box-shadow: 0 0 1px rgba(255, 255, 255, .25)
  }
}
`}</style>}
  </>
  );
};
// const responsive = {
//   desktop: {
//     breakpoint: {max: 3000, min: 1024 },
//     items: 3,
//     slidesToSlide: 3 // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: {max: 1024, min: 464 },
//     items: 3,
//     slidesToSlide: 3 // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: {max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1 // optional, default to 1.
//   }
// };
// const sliderOpts = {
//   swipeable: false,
//   draggable: false,
//   showDots: true,
//   responsive: responsive,
//   ssr: true, // means to render carousel on server-side.
//   infinite: true,
//   autoPlay: true,
//   autoPlaySpeed: 4000,
//   // keyBoardControl: true,
//   // customTransition: 'all .5',
//   // transitionDuration: 500,
// };
export default withHydrationOnDemand({ on: ["visible"] })(Spaces);
// export default Spaces
