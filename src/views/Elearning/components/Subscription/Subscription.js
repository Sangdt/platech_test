/* eslint-disable react/no-unescaped-entities */
import React, {useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import withHydrationOnDemand from "react-hydration-on-demand";

// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
import useInView from "react-cool-inview";
import dynamic from 'next/dynamic'

const ContactForm = dynamic(() => import(
  /* webpackChunkName: "ContactForm" */
  /* webpackMode: "lazy" */
  'components/SharedComponents/ContactForm').then(m => m.default),
  {
    ssr: false,
    loading: () => <div className="max-w-2xl mx-auto"><CircularProgress className='mx-auto'/></div>,
  });
const Subscription = () => {
  // const theme = useTheme();
  const [alreadyIn, setAlreadyIn] = useState(false);
  const { observe, inView } = useInView({
    threshold: 0.25, // Default is 0
    // onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
    //   // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]

    //   unobserve(); // To stop observing the current target element
    //   observe(); // To re-start observing the current target element
    // },
    // onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
    onEnter: () => {
      // Triggered when the target enters the viewport
      if (!alreadyIn) setAlreadyIn(true)
    },
    // onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
    //   // Triggered when the target leaves the viewport
    // },
    // More useful options...
  });

  return (
    <Box >
      <Box component={Card} boxShadow={4} paddingY={3}>
        <CardContent ref={observe}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={"center"}
          >
            <Box marginBottom={4} justifyContent={'center'}
              alignItems={'center'}>
              <Typography
                variant="h4"
                align={'center'}
                data-aos={'fade-up'}
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Li??n h??? v???i ch??ng t??i ngay ????? ???????c b??o gi?? v?? nh???n ???????c nhi???u ??u ????i kh??c nhau
              </Typography>
              {(inView || alreadyIn) &&<ContactForm />}
              {/* <Typography
                variant="h6"
                align={'center'}
                color={'text.secondary'}
                data-aos={'fade-up'}
              >
                Don't lose a chance to be among the firsts to know about our
                upcoming news and updates.
              </Typography> */}
            </Box>
          </Box>

        </CardContent>
      </Box>
    </Box>
  );
};

export default withHydrationOnDemand({on: ["visible"] })(Subscription);
