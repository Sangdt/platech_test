import React from 'react';
import WithLargeImage from 'blocks/productDetails/WithLargeImage/WithLargeImage';
import BlogArticle from 'views/BlogArticle';

import { polyfill } from 'interweave-ssr';

if (typeof window === 'undefined') {
  polyfill();
}

const test = true;
const ProductDetail = () => {
  return test ? <WithLargeImage /> : <BlogArticle />;
};

export default ProductDetail;
