import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// import Main from 'layouts/Main';
import Container from 'components/Container';
// import {
//   Breadcrumb
//   // , Newsletter
//   // , Result
// } from '../ProductCategory/components';
import Breadcrumb from 'components/SharedComponents/Breadcrumb';

import WithCtaButton from '../../blocks/productGrids/MinimallyDesigned/MinimallyDesigned';
import SearchBar from 'components/SharedComponents/SearchBar';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const ProductCategory = ({ categoryName, categoryDescription, productInCategory, seoLinks, }) => {
  const theme = useTheme();
  return (
    <>
      <Box bgcolor={'alternate.main'}>
        <Container paddingY={2}>
          <Breadcrumb routeArray={[
            {
              href: '/',
              title: 'Home',
              isActive: false,
            },
            {
              href: '/danh-muc-san-pham/',
              title: 'Danh mục sản phẩm',
              isActive: false,
            },
            {
              href: '/danh-muc-san-pham/' + seoLinks,
              title: categoryName,
              isActive: true,
            },
          ]} />
          <div className="box-top">
            <div className="wrap-main">
              <div className="box-text">
                {categoryName && <h1 className="tt-1">{categoryName}</h1>}
              </div>
            </div>
          </div>
        </Container>
      </Box>
      <Container>
        <Box>
          {checkArrNotEmpty(productInCategory) && <>
            <SearchBar searchData={productInCategory}
              inputPlaceholder={"Tìm kiếm một sản phẩm nào đó"} />
            <WithCtaButton productInCategory={productInCategory} />
          </>}
          {/* {checkArrNotEmpty(productInCategory) && } */}
        </Box>
        {/* <Result /> */}
      </Container>
      <Box
        position={'relative'}
        marginTop={{ xs: 4, md: 6 }}
        sx={{
          backgroundColor: theme.palette.alternate.main,
        }}
      >
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.alternate.main}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
        <Container>
          <div className="box-top">
            <div className="wrap-main">
              <div className="box-text">
                {checkArrNotEmpty(categoryDescription) ? <div className="text-center">
                  {categoryDescription.map(descriptionContent =>
                    <div key={descriptionContent.id} dangerouslySetInnerHTML={{ __html: descriptionContent }} />)}
                </div> :
                  !checkArrNotEmpty(categoryDescription) &&
                  <div className="text-center" dangerouslySetInnerHTML={{ __html: categoryDescription }} />
                }
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default ProductCategory;
