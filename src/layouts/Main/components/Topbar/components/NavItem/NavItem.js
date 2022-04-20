import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

// import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';

const Popover = dynamic(() => import(  /* webpackChunkName: "Nav_item_material_Popover" */'@mui/material/Popover'));

const NavItem = ({ linkTo, title, itemName, id, items, colorInvert = false }) => {
  const theme = useTheme();
  // console.log("linkTo", linkTo)
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handlePopoverOpen = (event, popoverId) => {
    setAnchorEl(event.target);
    setOpenedPopoverId(popoverId);
    // console.log("openned", event, popoverId)
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
    // console.log("close")
  };
  const linkColor = colorInvert ? 'common.white' : 'text.primary';
  const handleNavigation = e => handlePopoverClose()
  useEffect(() => {
    // setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, []);


  return (
    <Box
      aria-owns={openedPopoverId ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      aria-describedby={id}
    >
      <Box

        display={'flex'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        onClick={(e) => handlePopoverOpen(e, id)}
      >
        <Typography
          fontWeight={openedPopoverId === id || 400}
          color={linkColor}
        >
          {title}
        </Typography>

        {checkArrNotEmpty(items) && <ExpandMoreIcon
          sx={{
            marginLeft: theme.spacing(1 / 4),
            width: 16,
            height: 16,
            transform: openedPopoverId === id ? 'rotate(180deg)' : 'none',
            color: linkColor
          }}
        />}
      </Box>
      {(openedPopoverId === id) && (checkArrNotEmpty(items)) && <Popover
        disableScrollLock={true}
        elevation={3}
        id={id}
        open={openedPopoverId === id}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        // disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '.MuiPaper-root': {
            maxWidth: items?.length > 12 ? 350 : 250,
            padding: 2,
            marginTop: 2,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderTop: `3px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <Grid container spacing={0.5}>
          {linkTo?.seoLinks && <Link
            href={linkTo?.seoLinks ?? "/"}
            passHref
          >
            <Button
              onClick={(e) => handlePopoverOpen(e, id)}
              component={'a'}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                color: theme.palette.text.primary,
                backgroundColor: 'transparent',
                fontWeight: 400,
              }}
            >
              {itemName}
            </Button>
          </Link>}
          {items.map((childMenuInfo, i) => (
            <ChildMenu key={`${childMenuInfo.id}_${i}`}
              {...childMenuInfo}
              length={items.length}
            />
          ))}
        </Grid>
      </Popover>
      }
    </Box>
  );
};

const ChildMenu = ({ id, length, linkTo, itemName, childItem }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handlePopoverOpen = (event, popoverId) => {
    setAnchorEl(event.target);
    setOpenedPopoverId(popoverId);
    // console.log("openned", event, popoverId)
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
    // console.log("close")
  };
  // const linkColor = colorInvert ? 'common.white' : 'text.primary';
  const handleNavigation = e => handlePopoverClose()
  useEffect(() => {
    // setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, []);

  return (<>
    <Grid item xs={length > 12 ? 6 : 12}>
      <Button
        onClick={(e) => handlePopoverOpen(e, id)}
        component={'a'}
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          color: theme.palette.text.primary,
          backgroundColor: 'transparent',
          fontWeight: 400,
        }}
      >
        {itemName}
        <ExpandMoreIcon sx={{ marginLeft: theme.spacing(1 / 4), width: 16, height: 16, transform: openedPopoverId === id ? 'rotate(-95deg)' : 'none', }}
        />
      </Button>
    </Grid>
    {(openedPopoverId === id) && (checkArrNotEmpty(childItem)) && <Popover
      disableScrollLock={true}
      elevation={3}
      id={id}
      open={openedPopoverId === id}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      disableRestoreFocus
      // disableScrollLock
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{
        '.MuiPaper-root': {
          maxWidth: childItem?.length > 12 ? 350 : 250,
          padding: 2,
          marginTop: 2,
          marginLeft: 17.5,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderTop: `3px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <Grid container spacing={0.5}>
        {linkTo?.seoLinks && <Link
          href={linkTo?.seoLinks ?? "/"}
          passHref
        >
          <Button
            onClick={(e) => handlePopoverOpen(e, id)}
            component={'a'}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              color: theme.palette.text.primary,
              backgroundColor: 'transparent',
              fontWeight: 400,
            }}
          >
            {itemName}
          </Button>
        </Link>}
        {checkArrNotEmpty(childItem) && childItem.map((childMenuInfo, i) => (<MenuItem
          key={`${childMenuInfo.id}_${i}`}
          {...childMenuInfo} theme={theme} length={childItem.length} />
        ))}
      </Grid>
    </Popover>}
  </>);
}

const MenuItem = ({ length, linkTo, itemName, theme }) => (<Grid item xs={length > 12 ? 6 : 12}>
  <Link
    href={linkTo?.seoLinks ?? "/"}
    passHref={true}
  >
    <Button
      component={'a'}
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        color: theme.palette.text.primary,
        backgroundColor: 'transparent',
        fontWeight: 400,
      }}
    >
      {itemName}
    </Button>
  </Link>
</Grid>);

// const ReturnLink = ({ href, children, ...rest }) => href ? <>{children}</> : <Link
//   href={href ?? "/"}
//   {...rest}
// >
//   {children}
// </Link>

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.array,
  colorInvert: PropTypes.bool,
};

export default NavItem;
