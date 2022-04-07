import React from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link'
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const Breadcrumb = ({ routeArray = [] }) => {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        {routeArray && checkArrNotEmpty(routeArray) && routeArray.map((item, index) => (
          <span key={index}>
            {item.isActive ? (
              <Typography color="text.primary">{item.title}</Typography>
            ) : (
              <NextLink
                href={item.href}
                passHref
              >
                <Link
                  sx={{
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {item.title}
                </Link>
              </NextLink>
            )}
          </span>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
