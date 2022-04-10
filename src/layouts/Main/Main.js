import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
import dynamic from 'next/dynamic';

import Container from 'components/Container';
import TopNav from 'components/TopNav';

import {
  Topbar
  , Footer
} from './components';

// import pages from '../navigation';

const Sidebar = dynamic(() => import(  /* webpackChunkName: "Sidebar" */'./components/Sidebar/Sidebar'));

const Main = ({ children, colorInvert = false, bgcolor = 'transparent', salesInfo = false, pageHeader, footer, showSaleInfo, setShowSaleInfo,UA }) => {
  console.log("footer",UA)
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
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
          <TopNav colorInvert={colorInvert} />
        </Container>
      </Box>
      <AppBar
        position={'relative'}
        sx={{
          zIndex: 100,
          // top: 40,
          backgroundColor: bgcolor
        }}
        elevation={0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            {...pageHeader}
            // pages={pages}
            colorInvert={colorInvert}
          />
        </Container>
      </AppBar>
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
        <Footer {...footer}/>
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
