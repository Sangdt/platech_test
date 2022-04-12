/* eslint-disable react/no-unescaped-entities */
import React, { memo } from 'react';
import withHydrationOnDemand from "react-hydration-on-demand";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ShowcaseGrid from './ShowcaseGrid'


const Categories = ({ categoryList }) => {
  return (
    <Box >
      <Box marginBottom={4} >
        <Typography
          variant="h4"
          align='center'
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Danh mục sản phẩm
        </Typography>
      </Box>
      <Box style={{ textAlign: "center", alignItems: "center" }}  >
        <Grid container spacing={4}>
          <ShowcaseGrid categoryList={categoryList} />
        </Grid>
      </Box>
    </Box>
  );
};

export default withHydrationOnDemand({ on: ["visible"] })(memo(Categories));
