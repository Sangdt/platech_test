/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Content = ({ blogBody }) => (
  <Box paddingX={1}>
    <Box paddingX={{ xs: 0, sm: 0, md: 0 }}>
      <Box component={"div"} dangerouslySetInnerHTML={{ __html: blogBody }} />
      <Box paddingY={4}>
        <Divider />
      </Box>
    </Box>
  </Box>
);
export default Content;
