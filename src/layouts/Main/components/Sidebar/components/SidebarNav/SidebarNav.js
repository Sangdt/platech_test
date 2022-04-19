import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
import { Image } from 'react-datocms'

import NavItem from './components/NavItem';
import Link from 'next/link'
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const SidebarNav = ({ item_info, pageLogo }) => {
  console.log("item_info", item_info)
  // const theme = useTheme();
  // const { mode } = theme.palette;

  // const {
  //   landings: landingPages,
  //   secondary: secondaryPages,
  //   company: companyPages,
  //   account: accountPages,
  //   portfolio: portfolioPages,
  //   blog: blogPages,
  // } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        {pageLogo?.logo_detail && <Box
          display={'flex'}
        // width={{ xs: 100, md: 120 }}
        >
          <PageLogo {...pageLogo?.logo_detail} />
        </Box>}
      </Box>
      {checkArrNotEmpty(item_info) && <Box paddingX={2} paddingY={2}>
        {item_info.map((item, index) => (<Box key={`${item.id}_${index}`}>
          <NavItem {...item} />
        </Box>))}
      </Box>}
    </Box>
  );
};
const PageLogo = ({ linkTo, image }) => {
  // console.log("{linkTo, image}", {linkTo, image})
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
SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
};

export default SidebarNav;
