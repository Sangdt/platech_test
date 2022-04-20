import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Image as DatoCMSImage } from "react-datocms"
import withHydrationOnDemand from "react-hydration-on-demand";

import Container from 'components/Container';

// const mock = [
//   {
//     feedback:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     name: 'Clara Bertoletti',
//     title: 'MUI lover',
//     avatar: 'https://assets.maccarianagency.com/avatars/img4.jpg',
//   },
//   {
//     feedback:
//       'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     name: 'Jhon Anderson',
//     title: 'Senior Frontend Developer',
//     avatar: 'https://assets.maccarianagency.com/avatars/img5.jpg',
//   },
//   {
//     feedback:
//       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     name: 'Chary Smith',
//     title: 'SEO at Comoti',
//     avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg',
//   },
// ];

const WithBrandBgColor = ({ testimonial }) => {
  return (
    <Box>
      <Container>
        <Box>
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              align={'center'}
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'common.white',
              }}
            >
              Review từ các đối tác của Plactech
            </Typography>
            {/* <Typography
              variant="h6"
              align={'center'}
              sx={{ color: 'common.white' }}
            >
              Companies from across the globe have had fantastic experiences
              using theFront.
              <br />
              Here’s what they have to say.
            </Typography> */}
          </Box>
          <Grid container spacing={2}>
            {testimonial.map((item, i) => (
              <Grid item xs={12} md={4} key={`${i}_${item.id}`} >
                <Box
                  width={1}
                  height={1}
                  component={Card}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  boxShadow={0}
                  variant={'outlined'}
                  borderRadius={2}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ paddingBottom: 2 }}>
                      <ListItem
                        component="div"
                        disableGutters
                        sx={{ padding: 0 }}
                      >
                        {item.clientPicture?.responsiveImage && <ListItemAvatar sx={{ marginRight: 3 }}>
                          <Avatar
                            component={DatoCMSImage}
                            data={item.clientPicture?.responsiveImage}
                            // src={item.avatar}
                            variant={'rounded'}
                            sx={{ maxWidth: "150px !important", height: "150px !important", borderRadius: 2 }}
                          />
                        </ListItemAvatar>}
                        {item.name && <ListItemText
                          sx={{ margin: 0 }}
                          primary={item.name}
                        />}
                      </ListItem>
                    </Box>
                    {item.content && <Typography color="text.secondary" component={'div'} className='mx-auto' sx={{
                      minWidth: {
                        xs: '10rem', // theme.breakpoints.up('xs')
                        sm: '44rem', // theme.breakpoints.up('sm')
                        md: '20rem', // theme.breakpoints.up('md')
                        lg: '25rem', // theme.breakpoints.up('lg')
                        xl: '25rem', // theme.breakpoints.up('xl')
                      }
                    }}
                      dangerouslySetInnerHTML={{ __html: item.content }} />}
                    {/* {item.feedback} */}
                    {/* </Typography> */}
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default withHydrationOnDemand({on: ["visible"] })(WithBrandBgColor);
