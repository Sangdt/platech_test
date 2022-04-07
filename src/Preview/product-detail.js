import React from 'react';
import WithLargeImage from 'blocks/productDetails/WithLargeImage/WithLargeImage';
import { polyfill } from 'interweave-ssr';

if (typeof window === 'undefined') {
  polyfill();
}
const ProductDetail = () => {
  return <WithLargeImage />;
};

export default ProductDetail;
