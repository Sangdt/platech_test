import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import NavItem from './components/NavItem/NavItem';
import { Image } from 'react-datocms'
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const Topbar = ({ onSidebarOpen, pages, colorInvert = false, menuItems, pageLogo }) => {
  // console.log("menuItems", menuItems, pageLogo)
  // console.log("colorInvert",colorInvert)

  const theme = useTheme();
  const { mode } = theme.palette;
  // const {
  //   landings: landingPages,
  //   secondary: secondaryPages,
  //   company: companyPages,
  //   account: accountPages,
  //   portfolio: portfolioPages,
  //   blog: blogPages,
  // } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    // width={1}
    >
      {pageLogo?.logo_detail && <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
        <PageLogo {...pageLogo?.logo_detail} />
      </Box>}

      <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
        {menuItems && checkArrNotEmpty(menuItems.item_info) && menuItems.item_info.map((item, index) => (
        <Box key={item.id ?? index} {...{ marginLeft: index === 0 ? 0 : 4 }}>
          <NavItem
            title={item.name}
            id={item.id ?? index}
            linkTo={item.linkTo}
            items={checkArrNotEmpty(item.childItems) ? item.childItems : null}
            colorInvert={colorInvert}
          />
        </Box>))}


      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};
const PageLogo = ({ linkTo, image }) => {
  // console.log("{ linkTo, image }", { linkTo, image })
  if (linkTo) {
    return (<Link href={linkTo.seoLinks} passHref>
      <Box
        display={'flex'}
        width={{ xs: 100, md: 120 }}
        component={"a"}
        className='logo'
        // href="/"
        title="theFront"
      >
        {image?.responsiveImage && <span className="bg-logo sm:mr-8 mr-0"> <Image
          component={Image}
          data={image.responsiveImage}
          className="sm:w-32 w-30"

        />
        </span>}
      </Box>
    </Link>
    );
  }
  return (<>
    {image && <span className="bg-logo sm:mr-8 mr-0"> <Image
      component={Image}
      data={image.responsiveImage}
      className="sm:w-32 w-30"

    />
    </span>
    }
  </>);


}
export default Topbar;
