/* eslint-disable react/prop-types */
/* eslint-disable no-useless-escape */
import React from 'react';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

import Link from 'next/link';
import LazyLoadingIframe from './LazyLoadingIframe';

export function transform(node, children) {
  //   console.log('start transforming...',node,children);
  let tagName = node.tagName.toLowerCase();
  const mainUrlRegex = /(https?:)?(\/\/)?(www\.)?platechvn.com\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  switch (tagName) {
    case 'a':
      if (mainUrlRegex.test(node.getAttribute('href'))) {
        let urlInfo = new URL(node.getAttribute('href'));
        return <Link href={urlInfo.pathname}>
          <a>{children}</a>
        </Link>;
      }
      break;
    case 'iframe':
      return (<LazyLoadingIframe >
        <iframe title='BlogPageIframes' src={node.getAttribute('src')} className={node.getAttribute('class')}></iframe>
      </LazyLoadingIframe>);
    // case 'blockquote':
    //   return (<Typography variant={'caption'} id={node.getAttribute('id')} color={'primary'} align={'center'} fontSize={'h6.fontSize'} mb={2}>
    //     {children}
    //   </Typography>);
    // case 'ul':
    //   return (<Box marginTop={2}>
    //     <ul>
    //       {children}
    //     </ul>
    //   </Box>);
    // case 'li':
    //   // console.log('test', node.getAttribute('imageList'), node.getAttribute('src'), children);
    //   return (<li>
    //     <Typography>
    //       {Array.isArray(children) && children.length > 0 && children}
    //     </Typography>
    //   </li>);
    default:
      //   console.log('matches heading', tagName,/(h[1-6])/g.test(tagName));

      if (/(h[1-6])/g.test(tagName)) {
        // console.log('matches heading', tagName);
        return (<Typography variant={tagName} id={node.getAttribute('id')}>
          {children}
        </Typography>);
      }
      break;
    // return (<Typography>{children}</Typography>);
  }
}