import React from 'react';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';
import Link from 'next/link'

const NavItem = ({ linkTo, id, name, childItems = [] }) => (
  <Box>
    <Accordion
      disableGutters
      elevation={0}
      sx={{ backgroundColor: 'transparent' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ padding: 0 }}
      >
        <Typography
          fontWeight={400}
          color={'text.primary'}
        >
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <Grid container spacing={1}>
          {linkTo && <SingleMenuItem {...linkTo} itemName={name} />}
          {checkArrNotEmpty(childItems) && childItems.map((itemInfo, index) => (<SingleMenuItem key={`${itemInfo.id}__${index}`} {...itemInfo} />))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  </Box>
);

const SingleMenuItem = ({ id, seoLinks, itemName, childItem = [] }) => {
  const theme = useTheme();
  if (checkArrNotEmpty(childItem)) {
    return (<Accordion
      disableGutters
      elevation={0}
      sx={{ backgroundColor: 'transparent' }}
    >
      <AccordionSummary
        expandIcon={checkArrNotEmpty(childItem) && <ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ padding: 0 }}
      >
        <Typography
          fontWeight={400}
          color={'text.primary'}
        >
          {itemName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <Grid container spacing={1}>
          {seoLinks && <SingleMenuItem seoLinks={seoLinks} itemName={itemName} />}
          {checkArrNotEmpty(childItem) && childItem.map((itemInfo, index) => (<SingleMenuItem key={`${itemInfo.id}__${index}`} {...itemInfo} />))}
        </Grid>
      </AccordionDetails>
    </Accordion>);
  }
  return (<Grid item xs={12}>
    <Link href={seoLinks ?? "/"} passHref>
      <Button
        size={'large'}
        component={'a'}
        // href={p.href}
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
  </Grid>)
}

export default NavItem;
