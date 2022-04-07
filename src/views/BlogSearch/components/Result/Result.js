/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Image } from 'react-datocms';
import Link from 'next/link';
// import InputAdornment from '@mui/material/InputAdornment';

const mock = [
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img2.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    title: 'Lorem ipsum dolor sit amet,',
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img4.jpg',
    },
    date: '04 Aug',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img3.jpg',
    description: 'Excepteur sint occaecat cupidatat non proident',
    title: 'Consectetur adipiscing elit',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img5.jpg',
    },
    date: '12 Sep',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img4.jpg',
    description: 'Eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    title: 'Labore et dolore magna aliqua',
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg',
    },
    date: '22 Nov',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img23.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    title: 'Eiusmod tempor incididunt',
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
    },
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img24.jpg',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus',
    title: 'Sed ut perspiciatis',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
    },
    date: '02 Aug',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img25.jpg',
    description:
      'Qui blanditiis praesentium voluptatum deleniti atque corrupti',
    title: 'Unde omnis iste natus',
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
    },
    date: '05 Mar',
  },
];

const Result = ({ blogList }) => {
  console.log("blogList", blogList)
  const theme = useTheme();
  return (
    <Box>
      <SearchBar />
      <Grid container spacing={4}>
        {blogList.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={item.ID ?? i}>
            <Link passHref href={item.seoLinks}>
              <Box
                component={'a'}
                href={''}
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
                    // image={item.image}
                    title={item.categoryName}
                    sx={{
                      height: { xs: 250 },
                      position: 'relative',
                    }}
                  >
                    {item.headerImage?.responsiveImage && <Image
                      data={item?.headerImage?.responsiveImage}
                    />}
                  </CardMedia>
                  <Box component={CardContent} position={'relative'}>
                    <Typography variant={'h6'} gutterBottom>
                      {item.categoryName}
                    </Typography>
                    <Typography color="text.secondary" component={"div"} dangerouslySetInnerHTML={{ __html: item.pageDescription }} />
                  </Box>
                  <Box flexGrow={1} />
                  <Box padding={2} display={'flex'} flexDirection={'column'}>
                    <Box marginBottom={2}>
                      <Divider />
                    </Box>
                    {/* <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Box display={'flex'} alignItems={'center'}>
                      <Avatar
                        src={item.author.avatar}
                        sx={{ marginRight: 1 }}
                      />
                      <Typography color={'text.secondary'}>
                        {item.author.name}
                      </Typography>
                    </Box>
                    <Typography color={'text.secondary'}>
                      {item.date}
                    </Typography>
                  </Box> */}
                  </Box>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
        <Grid item container justifyContent={'center'} xs={12}>
          <Button
            fullWidth
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
            Load more
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
const SearchBar = () => {
  const [searchVal, setSearchVal] = useState('');
  return (<Box
    padding={2}
    width={1}
    component={Card}
    boxShadow={4}
    marginBottom={4}
  >
    <Box display="flex" alignItems={'center'}>
      <Box width={1} marginRight={1}>
        <Input
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          sx={{
            height: 54,
            '& .MuiOutlinedInput-notchedOutline': {
              border: '0 !important',
            },
          }}
          variant="outlined"
          color="primary"
          size="medium"
          placeholder="Search an article"
          fullWidth
          startAdornment={<SearchAdornment />}
        />
      </Box>
      <ResultCount />
      <Box>
        <Button
          sx={{ height: 54, minWidth: 100, whiteSpace: 'nowrap' }}
          variant="contained"
          color="primary"
          size="medium"
          fullWidth
        >
          Search
        </Button>
      </Box>
    </Box>
  </Box>

  );
};
const ResultCount = ({ numberOfItems = 12 }) => (<Box display={{ xs: 'none', sm: 'block' }} marginRight={2}>
  <Typography
    color={'text.secondary'}
    variant={'subtitle2'}
    sx={{ whiteSpace: 'nowrap' }}
  >
    {numberOfItems} Results
  </Typography>
</Box>);

const SearchAdornment = () => (<Box
  component={'svg'}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  width={24}
  height={24}
  color={'primary.main'}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  />
</Box>);
export default Result;
