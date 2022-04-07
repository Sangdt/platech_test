import React from 'react';
import BlogArticle from 'views/BlogArticle';
import { polyfill } from 'interweave-ssr';

if (typeof window === 'undefined') {
  polyfill();
}
const BlogArticlePage = () => {
  return <BlogArticle />;
};

export default BlogArticlePage;
