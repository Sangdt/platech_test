import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
// import { Image } from 'react-datocms'

// import AppBar from '@mui/material/AppBar';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
import dynamic from 'next/dynamic';

import Container from 'components/Container';
import TopNav from 'components/TopNav';

import {
  // Topbar
  Footer
} from './components';

// import pages from '../navigation';

const Sidebar = dynamic(() => import(  /* webpackChunkName: "Sidebar" */'./components/Sidebar/Sidebar'));
const Topbar = dynamic(() => import(  /* webpackChunkName: "Topbar" */'./components/Topbar/Topbar'));

const Main = ({ children, colorInvert = false, bgcolor = 'transparent', salesInfo = false, pageHeader, footer, showSaleInfo, setShowSaleInfo, UA }) => {
  // console.log("pageHeader", pageHeader)
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: false,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    console.log("isMd",isMd)
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 38,
  // });

  return (
    <Box>
      <Box bgcolor={bgcolor}
        position={'relative'}
        zIndex={theme.zIndex.appBar}>
        <Container paddingTop={'8px !important'} paddingBottom={'0 !important'}>
          <TopNav colorInvert={colorInvert} topPageHeader={pageHeader.topPageHeader} />
        </Container>
      </Box>
      {/* <AppBar
        position={'relative'}
        sx={{
          zIndex: 100,
          // top: 40,
          backgroundColor: bgcolor
        }}
        elevation={0}
      >
        <Container paddingY={1}> */}
      {isMd && <Topbar
        bgcolor={bgcolor}
        onSidebarOpen={handleSidebarOpen}
        {...pageHeader}
        // pages={pages}
        colorInvert={colorInvert}
      />}
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => handleSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            float: "right",
            marginRight:2,
            marginBottom:2,
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
      {/* </Container>
      </AppBar> */}
      {open && <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pageHeader?.menuItems}
      />}
      <main>
        {children}
        <Divider />
      </main>
      <Container paddingY={2} >
        <Footer {...footer} />
      </Container>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
};

export default Main;
