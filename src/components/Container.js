import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Container = ({ children, fluidContainer = false, ...rest }) => (
  <Box
    maxWidth={fluidContainer ? null : { sm: 720, md: 1236 }}
    width={1}
    margin={fluidContainer ? null : '0 auto'}
    paddingX={fluidContainer ? null : 2}
    paddingY={{ xs: 4, sm: 6, md: 8 }}
    {...rest}
  >
    {children}
  </Box>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  fluidContainer: PropTypes.bool
};

export default Container;
