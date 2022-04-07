

const blogPathQuery = `*[_type=="blog"]{
    seoLinks{
    current
  }
 }`;

 const blogWithCategoryPathQuery = `*[_type=="blogCategory" && references(*[_type=="blog"]._id)]
 {
   slug,
   "blogInCategory":blogInCategory[]->{
     seoLinks
   }
 }`;
 const blogCategoryPathQuery = `*[_type=="blogCategory"]{
  "seoLinks":slug{
  current
}
}`;
 const singleLinkblogPathQuery = `*[_type=="blog" &&  singleLink == true]{
  seoLinks{
  current
}
}`;

const linkToPartQuery = ` linkTo->{    
  _type=="category"=>{
  _id,
  "seoLinks":"/danh-muc-san-pham"
},
_type=="childCategory"=>{
  _id,
  "seoLinks":"/danh-muc-san-pham/"+slug.current
},
  _type=="homePage"=>{
  _id,
  "seoLinks":"/"
},
  _type=="blogPage"=>{
  _id ,
  "seoLinks":"/blog"
},
  _type=="blog"=>{
  _id ,
  "seoLinks":"/blog/"+seoLinks.current
},
  _type=="product"=>{
  _id,
  "seoLinks":"/chi-tiet-san-pham/"+slug.current
},
  _type=="service"=>{
  _id,
  "seoLinks":"/dich-vu/"+seoLinks.current
},
_type=="servicePage"=>{
  _id,
  "seoLinks":"/dich-vu/"
},
},
`;

const servicePathQuery = `*[_type=="service"]{
  seoLinks{
  current
}
}`;

const assetBasedQuery = `
 asset->{
  url,
       _id,
       _type,
       altText,
        title,
       metadata{
      dimensions,
       lqip
     }
},
 `;
const seoBodyQuery = `
...,
schema[]{
  ...,
  linkTo->{
    _id,_type,
    seoLinks,
    productName,
    shortDescription,
    slug,
    _updatedAt,
    _createdAt,
    productGallery[]{
      _type=="figure"=>{
...,
        ${assetBasedQuery}
      }
    }
   },
  publisherLogo{
    ...,
    _type == "image" => {
    ${assetBasedQuery}
    }
  },
  "schemaImages":images[]{
    _type=="figure"=>{
...,
${assetBasedQuery}
}
}
},
openGraph{
images[]{
  _type == "figure" =>{
  ...,
  ${assetBasedQuery}
}
},
},
`;

const blogInfoQuery = `
*[_type=="blog" && seoLinks.current==$slug][0]{
    ...,
    Seo{
      ${seoBodyQuery}
      },
    blogBody[]{
      ...,
       _type == "image" => {
        ${assetBasedQuery}
      },
    },
    headerImage{
     _type == "figure" => {
    ...,
    ${assetBasedQuery}
          }
      }
  }
`;

const blogCategoryPageQuery = `
*[_type == "blogCategory"  && slug.current == $slug][0]{
  ...,
  seoTags{
      ${seoBodyQuery}
      },
      "blogList":blogInCategory[]->{_id,
        headerImage{
          ${assetBasedQuery}
       }
        ,pageTitle,shortDescription,
        "seoLinks":"/blog/danh-muc/"+^.slug.current+"/"+seoLinks.current ,
                _updatedAt}
}`;
const blogPageQuery = `
*[_type == "blogPage"][0]{
  ...,
  seoTags{
      ${seoBodyQuery}
      },
      "blogList":blogList[]->{_id,
        "headerImage":categoryGallery{
          _type == "figure" =>{
          ${assetBasedQuery}
          }
       }
        ,categoryName,categoryDescription,
      "seoLinks":"/blog/danh-muc/"+slug.current ,
        _updatedAt}
}`;
const servicePageQuery = `
*[_type == "servicePage"][0]{
  ...,
  seoTags{
      ${seoBodyQuery}
      },
      "blogCategoryList":blogInCategory[]->{_id,location,
        headerImage{
          ${assetBasedQuery}
       }
        ,pageTitle,"seoLinks":"/dich-vu/"+seoLinks.current 
        ,_updatedAt}
}`;

const homePageQuery = `
*[_type == "homePage"][0]{
  ...,
  WelcomeContent{
    ...,
    CTAbtn{
      ...,
      linkTo->{
        _type=="blog"=>{
          _id ,
          "seoLinks":"/blog/"+seoLinks.current
        },
      },
    },
    headerImage{
    _type == "figure"=>{
      ${assetBasedQuery}
    }
}
  },
  testimonial[]{
    ...,
   clientPicture{
    _type == "figure"=>{
      ${assetBasedQuery}
    }
}
  },
  seoTags{
    ${seoBodyQuery}
    },
      "relatedBlog":relatedBlog[]->{_id,
        headerImage{
          ${assetBasedQuery}
       }
        ,pageTitle,seoLinks,_updatedAt},
        "introduction":introduction[]->{_id,
          headerImage{
            ${assetBasedQuery}
         }
          ,pageTitle,seoLinks,_updatedAt},
        "productList":productList[]->{
          _id,
          _type,
          price,
          headerImage{
            ${assetBasedQuery}
  }
          ,productName,slug,_updatedAt},
   "categoryList":categoryList[]->{
          _id,
          _type,
          categoryGallery{
           _type == "figure"=>{
            ${assetBasedQuery}
          }
  }
          ,categoryName,slug,_updatedAt},
          homeBanner[]{
            _type == "figure"=>{
              ${assetBasedQuery}
   }
 }
}`;

const serviceInfoQuery = `
*[_type=="service" && seoLinks.current==$slug][0]{
    ...,
    Seo{
      ${seoBodyQuery}
      },
    blogBody[]{
      ...,
       _type == "image" => {
        ${assetBasedQuery}
      },
    },
    headerImage{
     _type == "figure" => {
    ...,
    ${assetBasedQuery}
          }
      }
  }
`;

const categoryPageQuery = `
*[_type == "category"][0]{

...,
seoTags{
    ${seoBodyQuery}
    },
"categoryList":categoryList[]->{
  _id,
  _type,
  slug,
  categoryName,
  "productInCategory":productInCategory[]->{
    productName,
    headerImage{
      ${assetBasedQuery}
  },
slug,_id,_type
}
}
}`;

const categoryPathQuery = `*[_type == "childCategory"]{
  slug
}`;

const categoryInfoQuery = `*[_type == "childCategory" && slug.current == $slug][0]{
  ...,
  seoTags{
      ${seoBodyQuery}
      },
      "productInCategory":productInCategory[]->{
        productName,
        headerImage{
          ${assetBasedQuery}
      },
    slug,_id,_type
    },
       categoryGallery{
               _type == "figure"=>{
                ${assetBasedQuery}
              }
      }
}
`;

const productPathQuery = `*[_type == "product"]{
  slug,
}
`;

const productInfoQuery = `
*[_type == "product"&& slug.current==$slug][0]{
  ...,
  price,
  seoTags{
    ${seoBodyQuery}
    },
    productInfoDetail[]{
      ...,
      _type == "image" => {
        ...,
         ${assetBasedQuery}
       },
   },
  productGallery[]{
  _type == "figure"=>{
    ...,
  asset->{
  url,
       _id,
       _type,
       altText,
        title,
       metadata{
      dimensions,
       lqip
     }
}
}
}
}
`;

const footerPartQuery = ` footer{
  ...,
  other_info[]{
    ...,
    linkTo->{
  _type=="category"=>{
  _id,
  "seoLinks":"/danh-muc-san-pham"
},
_type=="childCategory"=>{
  _id,
  "seoLinks":"/danh-muc-san-pham/"+slug.current
},
  _type=="homePage"=>{
  _id,
  "seoLinks":"/"
},
  _type=="blogPage"=>{
  _id ,
  "seoLinks":"/blog"
},
  _type=="blog"=>{
  _id ,
  "seoLinks":"/blog/"+seoLinks.current
},
  _type=="product"=>{
  _id,
  "seoLinks":"/chi-tiet-san-pham/"+slug.current
},
  _type=="service"=>{
  _id,
  "seoLinks":"/dich-vu/"+seoLinks.current
},
_type=="servicePage"=>{
  _id,
  "seoLinks":"/dich-vu/"
},
},
  },
  footerInfo[]{
    ...,
    _type=="menuInfoLink"=>{
      ${linkToPartQuery}
  }
}
},`;

const topPageHeaderPartQuery = `
topPageHeader{
  ...,
  ${linkToPartQuery}
},`;

const pageLogoPartQuery = `pageLogo{
  ...,
  ${linkToPartQuery}
 image{
 _type=="figure"=>{
...,
${assetBasedQuery}
}
}
},`;

const menuItemPartQuery = `menuItems[]{
  ...,
  childItems[]{
    ...,
   childItem[]{
     ...,
     fieldInfo{
     ...,
    ${linkToPartQuery}
   }
   },
    fieldInfo{
    ...,
     headerImage{
      ${assetBasedQuery}
  },
  ${linkToPartQuery}
  }
  },
  ${linkToPartQuery}
},`

const LayoutQuery = `
*[_type=="pageLayout" ][0]{
 ${footerPartQuery}
 pageHeader{
  ...,
  ${pageLogoPartQuery}
  ${topPageHeaderPartQuery}
  ${menuItemPartQuery}
},
}
`
const sainityCMSRedirectQuery = `*[_type=="redirectsInfo"&&active==true  ]{
 ...,
 sourceLink->{
   _type=="category"=>{
  _id,
  "seoLinks":"/danh-muc-san-pham"
},
_type=="childCategory"=>{
  _id,
  "seoLinks":"/danh-muc-san-pham/"+slug.current
},
  _type=="homePage"=>{
  _id,
  "seoLinks":"/"
},
  _type=="blogPage"=>{
  _id ,
  "seoLinks":"/blog"
},
  _type=="blog"=>{
  _id ,
  "seoLinks":"/blog/"+seoLinks.current
},
  _type=="product"=>{
  _id,
  "seoLinks":"/chi-tiet-san-pham/"+slug.current
},
  _type=="service"=>{
  _id,
  "seoLinks":"/dich-vu/"+seoLinks.current
},
_type=="servicePage"=>{
  _id,
  "seoLinks":"/dich-vu/"
},
} ,
redirectTo->{
   _type=="category"=>{
  _id,
  "seoLinks":"/danh-muc-san-pham"
},
_type=="childCategory"=>{
  _id,
  "seoLinks":"/danh-muc-san-pham/"+slug.current
},
  _type=="homePage"=>{
  _id,
  "seoLinks":"/"
},
  _type=="blogPage"=>{
  _id ,
  "seoLinks":"/blog"
},
  _type=="blog"=>{
  _id ,
  "seoLinks":"/blog/"+seoLinks.current
},
  _type=="product"=>{
  _id,
  "seoLinks":"/chi-tiet-san-pham/"+slug.current
},
  _type=="service"=>{
  _id,
  "seoLinks":"/dich-vu/"+seoLinks.current
},
_type=="servicePage"=>{
  _id,
  "seoLinks":"/dich-vu/"
},
}
}`
const allPagePathQuery=`
*[_type in ["blog"
            ,"category"
            ,"childCategory"
            ,"product"
            ,"homePage"
            ,"blogPage"
            ,"service"
            ,"servicePage"
           ] && !(_id in path("drafts.**"))
 
 ]{
   "lastmod":_updatedAt,
    _type=="category"=>{
  _id,
  "url":"/danh-muc-san-pham"
},
_type=="childCategory"=>{
  _id,
  "url":"/danh-muc-san-pham/"+slug.current
},
  _type=="homePage"=>{
  _id,
  "url":"/"
},
  _type=="blogPage"=>{
  _id ,
  "url":"/blog"
},
  _type=="blog"=>{
  _id ,
  "url":"/blog/"+seoLinks.current
},
  _type=="product"=>{
  _id,
  "url":"/chi-tiet-san-pham/"+slug.current
},
  _type=="service"=>{
  _id,
  "url":"/dich-vu/"+seoLinks.current
},
_type=="servicePage"=>{
  _id,
  "url":"/dich-vu/"
},
}
`
const defaultSeoQuery = `
*[_type=="siteConfig"][0]{
  globalSeoConfig{
    ...,
    favicon{
      ...,
      _type=="figure"=>{
    ...,
     asset->{
      url
    },
  }
},
  schema[]{
    ...,
    linkTo->{
      _id,_type,
      seoLinks,
      productName,
      shortDescription,
      slug,
      _updatedAt,
      _createdAt,
      productGallery[]{
        _type=="figure"=>{
...,
          ${assetBasedQuery}
        }
      }
     },
    publisherLogo{
      ...,
      _type == "image" => {
      ${assetBasedQuery}
      }
    },
    "schemaImages":images[]{
      _type=="figure"=>{
...,
  ${assetBasedQuery}
  }
  }
  },
  openGraph{
    ...,
  images[]{
    _type == "figure" =>{
    ...,
    ${assetBasedQuery}
  }
  },
  }
  }
  }
`
const allPageInfoQuery_feed=`*[_type in ["blog"
,"category"
,"childCategory"
,"product"
,"homePage"
,"blogPage"
,"service"
,"servicePage"
] && !(_id in path("drafts.**"))

]{
"date":_updatedAt,
_type=="category"=>{
"title":seoTags.title,
"description":seoTags.description,
"content":pageDescription[]{
  ...,
   _type == "image" => {
    ${assetBasedQuery}
  },
},
"image":seoTags.openGraph.images[0]{
asset->{
url
}
},
"id":_id,
"link":"/danh-muc-san-pham"
},
_type=="childCategory"=>{
"id":_id,
"title":seoTags.title,
"description":seoTags.description,
"content":categoryDescription[]{
  ...,
   _type == "image" => {
    ${assetBasedQuery}
  },
},
"image":seoTags.openGraph.images[0]{
asset->{
url
}
},  
"link":"/danh-muc-san-pham/"+slug.current
},
_type=="homePage"=>{
"id":_id,
"title":seoTags.title,
"description":seoTags.description,
"content":shortDescription[]{
  ...,
   _type == "image" => {
    ${assetBasedQuery}
  },
},
"image":seoTags.openGraph.images[0]{
  asset->{
  url
}
},
"link":"/"
},
_type=="blogPage"=>{
"title":seoTags.title,
"description":seoTags.description,
"content":pageDescription[]{
  ...,
   _type == "image" => {
    ${assetBasedQuery}
  },
},
"image":seoTags.openGraph.images[0]{
  asset->{
  url
}
},
"id":_id ,
"link":"/blog"
},
_type=="blog"=>{
"id":_id ,
"title":Seo.title,
"description":Seo.description,
"content":shortDescription[]{
  ...,
   _type == "image" => {
    ${assetBasedQuery}
  },
},
"image":Seo.openGraph.images[0]{
asset->{
url
}
},
"link":"/blog/"+seoLinks.current
},
_type=="product"=>{
"id":_id,
"title":seoTags.title,
"description":seoTags.description,
"content":shortDescription[]{
  ...,
   _type == "image" => {
    ${assetBasedQuery}
  },
},
"image":seoTags.openGraph.images[0]{
asset->{
url
}
},
"link":"/chi-tiet-san-pham/"+slug.current
},
_type=="service"=>{
"id":_id,
"title":seoTags.title,
"description":seoTags.description,
"content":blogBody[]{
  ...,
   _type == "image" => {
    ${assetBasedQuery}
  },
},
"image":seoTags.openGraph.images[0]{
asset->{
url
}
},
"link":"/dich-vu/"+seoLinks.current
},
_type=="servicePage"=>{
"id":_id,
"title":seoTags.title,
"description":seoTags.description,
"content":pageDescription[]{
  ...,
   _type == "image" => {
    ${assetBasedQuery}
  },
},
"image":seoTags.openGraph.images[0]{
asset->{
url
}
},
"link":"/dich-vu/"
},
}`

// ["category"
//             ,"homePage"
//             ,"blogPage"
//             ,"servicePage"
//            ]

const singlePageFeedInfoQuery=(hasSlug=false)=>hasSlug? `*[(_type in ["blog"
,"childCategory"
,"product"
,"service"
] && !(_id in path("drafts.**"))&& (slug.current==$slug||seoLinks.current==$slug))
][0]{
"date":_updatedAt,

_type=="childCategory"=>{
_id,
"title":seoTags.title,
"description":seoTags.description,
"image":seoTags.openGraph.images[0]{
asset->{
url
}
},  
"link":"/danh-muc-san-pham/"+slug.current
},


_type=="blog"=>{
_id ,
"title":Seo.title,
"description":Seo.description,
"image":Seo.openGraph.images[0]{
asset->{
url
}
},
"link":"/blog/"+seoLinks.current
},
_type=="product"=>{
_id,
"title":seoTags.title,
"description":seoTags.description,
"image":seoTags.openGraph.images[0]{
asset->{
url
}
},
"link":"/chi-tiet-san-pham/"+slug.current
},
_type=="service"=>{
_id,
"title":seoTags.title,
"description":seoTags.description,
"image":seoTags.openGraph.images[0]{
asset->{
url
}
},
"link":"/dich-vu/"+seoLinks.current
}
}`:`*[_type ==$slug && !(_id in path("drafts.**"))][0]{
  "date":_updatedAt,
   _type=="category"=>{
  "title":seoTags.title,
  "description":seoTags.description,
  "image":seoTags.openGraph.images[0]{
    asset->{
    url
  }
  },
 _id,
 "link":"/danh-muc-san-pham"
},

 _type=="homePage"=>{
 _id,
   "title":seoTags.title,
  "description":seoTags.description,
  "image":seoTags.openGraph.images[0]{
    asset->{
    url
  }
  },
 "link":"/"
},
 _type=="blogPage"=>{
     "title":seoTags.title,
  "description":seoTags.description,
  "image":seoTags.openGraph.images[0]{
    asset->{
    url
  }
  },
 _id ,
 "link":"/blog"
},
_type=="servicePage"=>{
 _id,
  "title":seoTags.title,
  "description":seoTags.description,
"image":seoTags.openGraph.images[0]{
    asset->{
    url
  }
  },
    "link":"/dich-vu/"
},
}`

module.exports = {
  sainityCMSRedirectQuery,
  singlePageFeedInfoQuery,
  blogWithCategoryPathQuery,
  blogCategoryPageQuery,
  allPageInfoQuery_feed,
  defaultSeoQuery,
  allPagePathQuery,
  LayoutQuery,
  serviceInfoQuery,
  servicePathQuery,
  productPathQuery,
  productInfoQuery,
  servicePageQuery,
  blogPathQuery,
  blogInfoQuery,
  categoryPathQuery,
  blogPageQuery,
  homePageQuery,
  categoryPageQuery,
  categoryInfoQuery,
  blogCategoryPathQuery,
}