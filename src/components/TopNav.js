import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ThemeModeToggler from 'components/ThemeModeToggler';

const TopNav = ({ colorInvert = false, topPageHeader }) => {
  // console.log("topPageHeader", topPageHeader)
  return (
    <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
      {topPageHeader && <>
        {topPageHeader.telephone_numner && <CallNow {...topPageHeader.telephone_numner} />}
        {topPageHeader.top_header_item && <TopBarLink {...topPageHeader.top_header_item} colorInvert={colorInvert} />}
      </>}
      <Box>
        <ThemeModeToggler />
      </Box>
    </Box>
  );
};
const CallNow = ({ phoneNumber }) => (<Box marginRight={{ xs: 1, sm: 2 }}>
  <a href={`tel:${phoneNumber}`}>
    Hotline:
    <Box
      padding={0.5}
      display={'inline-flex'}
      borderRadius={1}
      bgcolor={'primary.main'}
      marginLeft={1}
    >
      <Typography
        variant={'caption'}
        sx={{ color: 'common.white', lineHeight: 1 }}
      >
        +{phoneNumber}
      </Typography>
    </Box>
  </a>
</Box>);

const TopBarLink = ({ colorInvert, linkTo, itemName }) => (<Box marginRight={{ xs: 1, sm: 2 }}>
  <Link
    underline="none"
    component="a"
    href={linkTo ?? "/"}
    color={colorInvert ? 'common.white' : 'text.primary'}
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    {itemName}
  </Link>
</Box>)
TopNav.propTypes = {
  colorInvert: PropTypes.bool,
};

export default TopNav;
