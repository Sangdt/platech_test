const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`
let localBuild = process.env.LOCAL_ENV == "local"
// console.log("test local build",process.env.LOCAL_ENV =="local")
// for now just coppy stuff from API explorer 
//#region Landing Query Content  
const metatagQuery = `   metatag {
    description
    title
    twitterCard
    image {
      url
      copyright
      customData
      title
      alt
      height
      width
    }
  }`;
const heroQuery = ` hero {
    heroGallery {
      video {
        mp4Url(res: medium)
        thumbnailUrl(format: png)
      }
    }
    smallIntroText
    heroTitle
    heroDescription
    callToActionContentButton
    displayButton
  }`;
const productIntroductionQuery = `productIntroduction {
    ... on ProductIntroRecord {
      introDescription
      introTitle
      note
      descriptionImage {
        url(imgixParams: {fit: clip, h: "240", w: "512", lossless: true})
        alt
        title
        customData
      }
    }
    ... on IntroTitleRecord {
      introTitle
    }
  }`;
const contactInputQuery = `contactInput {
    callToActionContent
    showCallToAction
    infoText
    title
  }`;
const footerQuery = ` footer {
    ... on SocialInfoRecord {
      instagram
      lazada
      shopee
      tiki
      twitter
      facebook
    }
  }`;
const pricingTableQuery = `pricingTable {
    pricing
    productName
    highLightThis
    productDisplayImage {
      url(imgixParams: {fit: fill, h: "250", w: "400", fill: blur})
      customData
      alt
    }
    selectedProductFeature {
      id
    }
  }
}`;
const allProductFeatureDetailsQuery = `allProductFeatureDetails(filter: {displayThisFeature: {eq: "true"}}, orderBy: featureName_ASC)  {
    id
    featureName
  }`;
//#endregion


const datoCMSHomepageQuery = `query MyQuery {
  homePage {
    customScripts
    pageTitle
    homeBanner {
      id
      updatedAt
      assetGallery {
        id
        responsiveImage(imgixParams: {auto: [format,compress], fit: clip, lossless: "true",h:"600",w:"970"}) {
          width
          title
          srcSet
          webpSrcSet
          src
          sizes
          height
          bgColor
          base64
          aspectRatio
          alt
        }
        title
        tags
        smartTags
      }
    }
    seoTag {
      description
      title
      twitterCard
      image {
        url(imgixParams: {h: "300", w: "500", fit: clip, auto: [format,compress]})
        title
        height
        width
      }
    }
    shortDescription
    relatedBlog {
      shortDescription
      pageTitle
      seoLinks
      _publishedAt
      updatedAt
      headerImage {
        responsiveImage(imgixParams: {w: "900", h: "650", fit: clip, auto: [format,compress]}) {
          width
          webpSrcSet
          title
          srcSet
          src
          height
          bgColor
          sizes
          base64
          aspectRatio
        }
      }
    }
    testimonial {
      externalLink
      id
      name
      content
      clientPicture {
        id
        responsiveImage(imgixParams: {w: "100", h: "150", fit: clip, auto: [format,compress]}) {
          width
          webpSrcSet
          title
          srcSet
          src
          height
          bgColor
          sizes
          base64
          aspectRatio
        }
      }
    }
    productList {
      id
      productName
      seoLinks
      headerImage {
        id
        responsiveImage(imgixParams: {w: "500", h: "200", fit: clip, auto: [format,compress]}) {
          width
          webpSrcSet
          title
          srcSet
          src
          height
          bgColor
          sizes
          base64
          aspectRatio
        }
        title
        tags
        smartTags
      }
    }
    categoryList {
      categoryName
      id
      seoLink
      categoryGallery {
        responsiveImage(imgixParams: { fit: clip, auto: [format,compress]}) {
          width
          webpSrcSet
          title
          srcSet
          src
          height
          bgColor
          sizes
          base64
          aspectRatio
        }
        title
        tags
        smartTags
      }
    }
    introduction {
      ... on BlogRecord {
        id
        seoLinks
        headerImage {
          responsiveImage(imgixParams: {auto: [format,compress], fit: clip, w: "760", h: "760"}) {
            width
            webpSrcSet
            title
            srcSet
            src
            sizes
            height
            bgColor
            base64
            aspectRatio
            alt
          }
        }
        pageTitle
      }
    }
    link
    schema {
      ... on ArticleRecord {
        id
        _modelApiKey
        title
        description
        _updatedAt
        _publishedAt
        authorName
        authorType
        articleType
        images {
          url(imgixParams: {auto: [format,compress], fit: clamp, maxH: "200", maxW: "250"})
        }
        logo {
          url(imgixParams: {auto: [format,compress], fit: clamp, maxH: "200", maxW: "250"})
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
      }
      ... on SchemaProductRecord {
        id
        _modelApiKey
        productLink {
          _modelApiKey
          price
          seoLinks
          description:shortDescription
          productName
          updatedAt
          productGallery {
            url(imgixParams: {auto: [format,compress], fit: clamp, maxH: "200", maxW: "250"})
          }
        }
      }
      ... on SchemaLogoRecord {
        id
        _modelApiKey
        url
        updatedAt
        logo {
          url(imgixParams: {auto: [format,compress], fit: clamp, maxH: "200", maxW: "250"})
        }
      }
      ... on LocationRecord {
        _modelApiKey
        name
        type:bussinessType
        id:idLinks
        address
        images {
          url(imgixParams: {auto: [format, compress], fit: clip})
        }
        openinghours
        telephone
        updatedAt
        links:url {
          ... on CategoryPageRecord {
            id
            _modelApiKey
            seoLink
          }
          ... on ProductRecord {
            id
            _modelApiKey
            seoLinks
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
        description
        geo {
          latitude
          longitude
        }
      }
    }
  }
}
 `;

const datoCMSHeaderQuery = `query HeaderQuery {
  _site {
    favicon {
      url(imgixParams: {fit: clip, h: "195", w: "195"})
      title
      width
      alt
      mimeType
    }
    globalSeo {
      siteName
      facebookPageUrl
      fallbackSeo {
        description
        title
        twitterCard
        image {
          url(imgixParams: {auto: format, h: "300", w: "500", fit: clip})
          height
          width
          title
          alt
        }
      }
      twitterAccount
    }
  }
  pageHeader {
    menuItems {
      name
      id
      linkTo {
        ... on HomePageRecord {
          id
          _modelApiKey
          link
        }
        ... on BlogPageRecord {
          id
          _modelApiKey
          link
        }
        ... on CategoryListPageRecord {
          id
          link
          _modelApiKey
          pageTitle
        }
        ...on ServicePageRecord{
            id
            _modelApiKey
            link
          }
      }
      childItems {
        _modelApiKey
        externalUrl
        itemName
        headerImage {
          responsiveImage(imgixParams: {auto: format, fit: clip, lossless: "true"}) {
            width
            webpSrcSet
            title
            srcSet
            src
            sizes
            height
            bgColor
            base64
            aspectRatio
            alt
          }
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            seoLinks
            _modelApiKey
            pageTitle
          }
          ... on BlogPageRecord {
            id
            link
            _modelApiKey
            pageTitle
          }
          ... on CategoryPageRecord {
            id
            _modelApiKey
            seoLink
          }
          ... on CategoryListPageRecord {
            id
            _modelApiKey
            link
          }
          ...on ServicePageRecord{
            id
            _modelApiKey
            link
          }
        }
        childItem {
          _modelApiKey
          itemName
          id
          externalUrl
          linkTo {
            ... on BlogRecord {
              id
              seoLinks
              _modelApiKey
              pageTitle
            }
            ... on ProductRecord {
              id
              productName
              _modelApiKey
              seoLinks
            }
            ... on CategoryPageRecord {
              id
              categoryName
              _modelApiKey
              seoLink
            }
          }
        }
      }
      externalLink
      _modelApiKey
    }
    id
    topPageHeader {
      ... on TopHeaderItemRecord {
        id
        _modelApiKey
        itemName
        linkTo {
          ... on HomePageRecord {
            id
            link
          }
          ... on CategoryPageRecord {
            id
            seoLink
            _modelApiKey
          }
          ... on CategoryListPageRecord {
            id
            link
          }
        }
      }
      ... on TelephoneNumnerRecord {
        _modelApiKey
        phoneNumber
        id
      }
    }
    pageLogo {
      _modelApiKey
      linkTo {
        ... on HomePageRecord {
          _modelApiKey
          id
          link
        }
        ... on BlogPageRecord {
          _modelApiKey
          id
          link
        }
        ... on CategoryListPageRecord {
          _modelApiKey
          id
          link
        }
      }
      name
      image {
        responsiveImage(imgixParams: {fit: clip, w: "150", h: "30", auto: [format,compress]}) {
          alt
          base64
          bgColor
          title
          width
          webpSrcSet
          srcSet
          src
          sizes
          height
          aspectRatio
        }
      }
    }
  }
  footer {
    id
    socialLink {
      ... on FacebookRecord {
        id
        linkToSocial
        _modelApiKey
      }
      ... on ZaloRecord {
        id
        linkToSocial
        zaloPhoneNumer
        _modelApiKey
      }
      ... on TwitterRecord {
        id
        linkToSocial
        _modelApiKey
      }
      ... on InstagramRecord {
        id
        _modelApiKey
        linkToSocial
      }
      ... on YoutubeRecord {
        id
        youtubeLink
        _modelApiKey
      }
    }
    footerInfo {
      ... on LinkToPageRecord {
        id
        name
        _modelApiKey
        linkTo {
          ... on HomePageRecord {
            id
            link
            _modelApiKey
          }
          ... on BlogPageRecord {
            id
            link
            _modelApiKey
          }
          ... on CategoryListPageRecord {
            id
            link
            _modelApiKey
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
          ... on ServiceRecord{
            id 
            _modelApiKey
            seoLinks
          }
          ... on ServicePageRecord{
            id 
            _modelApiKey
            link
          }
        }
      }
      ... on OtherInfoRecord {
        id
        infoContent
        infoTitle
        _modelApiKey
        linkTo {
          ... on HomePageRecord {
            id
            link
            _modelApiKey
          }
          ... on BlogPageRecord {
            id
            link
            _modelApiKey
          }
          ... on CategoryListPageRecord {
            id
            link
            _modelApiKey
          }
          ... on CategoryPageRecord {
            id
            seoLink
            categoryName
          }
            ... on ServiceRecord{
            id 
            _modelApiKey
            seoLinks
          }
          ... on ServicePageRecord{
            id 
            _modelApiKey
            link
          }
        }
      }
    }
  }
}
`

const datoCMSSingleBlogQuery = `query SingleBlogQuery($slug: String) {
  blog(filter: {seoLinks: {eq: $slug}}) {
    contactForm {
      _modelApiKey
      title
    }
    customScripts
    _modelApiKey
    seoTag {
      description
      title
      twitterCard
      image {
        width
        url(imgixParams: {h: "300", w: "500", fit: clip, auto: format})
        title
        tags
        smartTags
        size
      }
    }
    tags
    _publishedAt
    updatedAt
    seoLinks
    pageTitle
    useToc
    id
    headerImage {
      responsiveImage(imgixParams: {fit: clip, auto: format, lossless: "true"}) {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
    schema {
      ... on ArticleRecord {
        id
        _modelApiKey
        title
        description
        _updatedAt
        _publishedAt
        authorName
        authorType
        articleType
        images {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
      }
      ... on SchemaProductRecord {
        id
        _modelApiKey
        productLink {
          _modelApiKey
          price
          seoLinks
          description:shortDescription
          productName
          updatedAt
          productGallery {
            url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
          }
        }
      }
      ... on SchemaLogoRecord {
        id
        _modelApiKey
        url
        updatedAt
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
      }
      ... on LocationRecord {
        _modelApiKey
        name
        type:bussinessType
        id:idLinks
        address
        images {
          url(imgixParams: {auto: [format, compress], fit: clip})
        }
        openinghours
        telephone
        updatedAt
        links:url {
          ... on CategoryPageRecord {
            id
            _modelApiKey
            seoLink
          }
          ... on ProductRecord {
            id
            _modelApiKey
            seoLinks
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
        description
        geo {
          latitude
          longitude
        }
      }
    }
    blogBody {
      _modelApiKey
      id
      content
      map{
        longitude,
        latitude
      }
      videoLink{
        url,
        thumbnailUrl,
        providerUid
      }
    }
    
  }
}
`;

const datoCMSSingleServiceQuery = `query SingleBlogQuery($slug: String) {
  service(filter: {seoLinks: {eq: $slug}}) {
    _modelApiKey
    contactForm {
      _modelApiKey
      title
    }
    customScripts
    seoTag {
      description
      title
      twitterCard
      image {
        width
        url(imgixParams: {h: "300", w: "500", fit: clip, auto: format})
        title
        tags
        smartTags
        size
      }
    }
    tags
    _publishedAt
    updatedAt
    seoLinks
    pageTitle
    useToc
    id
    headerImage {
      responsiveImage(imgixParams: {fit: clip, auto: format, lossless: "true"}) {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
    schema {
      ... on ArticleRecord {
        id
        _modelApiKey
        title
        description
        _updatedAt
        _publishedAt
        authorName
        authorType
        articleType
        images {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
      }
      ... on SchemaProductRecord {
        id
        _modelApiKey
        productLink {
          _modelApiKey
          price
          seoLinks
          description:shortDescription
          productName
          updatedAt
          productGallery {
            url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
          }
        }
      }
      ... on SchemaLogoRecord {
        id
        _modelApiKey
        url
        updatedAt
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
      }
      ... on LocationRecord {
        _modelApiKey
        name
        type:bussinessType
        id:idLinks
        address
        images {
          url(imgixParams: {auto: [format, compress], fit: clip})
        }
        openinghours
        telephone
        updatedAt
        links:url {
          ... on CategoryPageRecord {
            id
            _modelApiKey
            seoLink
          }
          ... on ProductRecord {
            id
            _modelApiKey
            seoLinks
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
        description
        geo {
          latitude
          longitude
        }
      }
    }
    location
    useToc
    blogBody {
      _modelApiKey
      id
      content
      map{
        longitude,
        latitude
      }
      videoLink{
        url,
        thumbnailUrl,
        providerUid
      }
    }
    
  }
}
`;


const datoCMSAllBlogBasicInfo = `query MyQuery {
  allBlogs {
    id
    tags
    seoLinks
    pageTitle
    _publishedAt
    updatedAt
    headerImage {
      responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
        width
        webpSrcSet
        title
        srcSet
        src
        height
        bgColor
        sizes
        base64
        aspectRatio
      }
    }
  }
}`;

const datoCMSBlogPathQuery = `query BlogPathQuery {
  allBlogs(first: ${localBuild ? "2" : "100"}){
    seoLinks
    id
  }
}
`;

const datoCMSServicePathQuery = `query BlogPathQuery {
  allServices(first: "100"){
    seoLinks
    id
  }
}
`;


const datoCMSCategoryPageQuery = `
query MyQuery($categorySlug: String) {
  categoryPage(filter: {seoLink: {eq: $categorySlug}}) {
    customScripts
    seoTag {
      description
      title
      twitterCard
      image {
        url(imgixParams: {h: "300", w: "500", fit: clip, auto: format})
        title
        tags
        smartTags
        size
      }
    }
    categoryName
    seoLink
    categoryDescription {
      id
      content
      _modelApiKey
    }
    productInCategory {
      id
      price
      productName
      seoLinks
      headerImage {
        responsiveImage(imgixParams: {auto: format, fit: clip, maxH: "300", maxW: "450"}) {
          width
          webpSrcSet
          title
          srcSet
          src
          sizes
          bgColor
          base64
          height
          aspectRatio
          alt
        }
      }
      shortDescription
    }
     schema {
      ... on ArticleRecord {
        id
        _modelApiKey
        title
        description
        _updatedAt
        _publishedAt
        authorName
        authorType
        articleType
        images {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
      }
      ... on SchemaProductRecord {
        id
        _modelApiKey
        productLink {
          _modelApiKey
          price
          seoLinks
          description:shortDescription
          productName
          updatedAt
          productGallery {
            url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
          }
        }
      }
      ... on SchemaLogoRecord {
        id
        _modelApiKey
        url
        updatedAt
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
      }
    }
  }
}
`;

const datoCMSCategoryPathQuery = `
query MyQuery {
  allCategoryPages(first: ${localBuild ? "2" : "100"}) {
    id
    seoLink
  }
}
`

const datoCMSCategoryListPageQuery = `query MyQuery {
  categoryListPage {
    customScripts
    schema {
      ... on ArticleRecord {
        id
        _modelApiKey
        title
        description
        _updatedAt
        _publishedAt
        authorName
        authorType
        articleType
        images {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
      }
      ... on SchemaProductRecord {
        id
        _modelApiKey
        productLink {
          _modelApiKey
          price
          seoLinks
          description:shortDescription
          productName
          updatedAt
          productGallery {
            url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
          }
        }
      }
      ... on SchemaLogoRecord {
        id
        _modelApiKey
        url
        updatedAt
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
      }
      ... on LocationRecord {
        _modelApiKey
        name
        type:bussinessType
        id:idLinks
        address
        images {
          url(imgixParams: {auto: [format, compress], fit: clip})
        }
        openinghours
        telephone
        updatedAt
        links:url {
          ... on CategoryPageRecord {
            id
            _modelApiKey
            seoLink
          }
          ... on ProductRecord {
            id
            _modelApiKey
            seoLinks
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
        description
        geo {
          latitude
          longitude
        }
      }
    }
    seotag {
      description
      title
      twitterCard
      image {
        url(imgixParams: {h: "300", w: "500", fit: clip, auto: format})
        title
        tags
        smartTags
        size
      }
    }
    pageDescription
    pageTitle
    categoryList {
      seoLink
      categoryName
      _modelApiKey
      productInCategory {
        _modelApiKey
        id
        price
        seoLinks
        productName
        headerImage {
          responsiveImage(imgixParams: {maxH: "470", maxW: "660", auto: format, fit: clip}) {
            width
            webpSrcSet
            title
            srcSet
            src
            sizes
            height
            bgColor
            base64
            aspectRatio
            alt
          }
        }
      }
      id
    }
  }
}`

const datoCMSGetAssetMetadataQuery = `query MyQuery($fileName:String!) {
  allUploads(filter: {filename: {matches: {pattern:$fileName}}}) {
    id
    alt
    title
  }
}`

const datoCMSGetPageListByTagQuery = `query TagQuery($TagList: String!) {
  allBlogs(filter: {tags: {matches: {pattern: $TagList}}}) {
    id
    tags
    _modelApiKey
    seoLinks
    pageTitle
    _publishedAt
    updatedAt
    headerImage {
      responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
        width
        webpSrcSet
        title
        srcSet
        src
        height
        bgColor
        sizes
        base64
        aspectRatio
      }
    }
  }
  allProducts(filter: {tags: {matches: {pattern: $TagList}}}) {
    id
    tags
    seoLinks
    _modelApiKey
    productName
    updatedAt
    headerImage {
      responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
        width
        webpSrcSet
        title
        srcSet
        src
        height
        bgColor
        sizes
        base64
        aspectRatio
      }
    }
  }
  allCategoryPages(filter: {tags: {matches: {pattern: $TagList}}}) {
    id
    tags
    _modelApiKey
    categoryName
    seoLink
    updatedAt
    categoryGallery {
      responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
        width
        webpSrcSet
        title
        srcSet
        src
        height
        bgColor
        sizes
        base64
        aspectRatio
      }
    }
  }
}
`;

const datoCMSGetPageListByTagQuery_withPag = `query TagQuery($TagList: String!, $first: IntType, $skip: IntType) {
  allBlogs(filter: {tags: {matches: {pattern: $TagList}}}, first: $first, skip:$skip) {
    id
    tags
    _modelApiKey
    seoLinks
    pageTitle
    _publishedAt
    updatedAt
    headerImage {
      responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
        width
        webpSrcSet
        title
        srcSet
        src
        height
        bgColor
        sizes
        base64
        aspectRatio
      }
    }
  }
  allProducts(filter: {tags: {matches: {pattern: $TagList}}}, first: $first, skip:$skip) {
    id
    tags
    seoLinks
    _modelApiKey
    productName
    updatedAt
    headerImage {
      responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
        width
        webpSrcSet
        title
        srcSet
        src
        height
        bgColor
        sizes
        base64
        aspectRatio
      }
    }
  }
  allCategoryPages(filter: {tags: {matches: {pattern: $TagList}}}, first: $first, skip:$skip) {
    id
    tags
    _modelApiKey
    categoryName
    seoLink
    updatedAt
    categoryGallery {
      responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
        width
        webpSrcSet
        title
        srcSet
        src
        height
        bgColor
        sizes
        base64
        aspectRatio
      }
    }
  }
}

`;

const datoCMSGetBlogPageInfoQuery = `query TagQuery {
  blogPage {
    customScripts
    link
    pageDescription
    pageTitle
    seoTags {
      description
      title
      twitterCard
      image {
        url(imgixParams: {auto: format, h: "300", w: "500", fit: clip})
        height
        width
        title
        alt
      }
    }
    schema {
      ... on ArticleRecord {
        id
        _modelApiKey
        title
        description
        _updatedAt
        _publishedAt
        authorName
        authorType
        articleType
        images {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
      }
      ... on SchemaProductRecord {
        id
        _modelApiKey
        productLink {
          _modelApiKey
          price
          seoLinks
          description:shortDescription
          productName
          updatedAt
          productGallery {
            url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
          }
        }
      }
      ... on SchemaLogoRecord {
        id
        _modelApiKey
        url
        updatedAt
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
      }
      ... on LocationRecord {
        _modelApiKey
        name
        type:bussinessType
        id:idLinks
        address
        images {
          url(imgixParams: {auto: [format, compress], fit: clip})
        }
        openinghours
        telephone
        updatedAt
        links:url {
          ... on CategoryPageRecord {
            id
            _modelApiKey
            seoLink
          }
          ... on ProductRecord {
            id
            _modelApiKey
            seoLinks
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
        description
        geo {
          latitude
          longitude
        }
      }
    }
    blogList {
      id
      pageTitle
      seoLinks
      _modelApiKey
      updatedAt
      headerImage {
        responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
          width
          webpSrcSet
          title
          srcSet
          src
          height
          bgColor
          sizes
          base64
          aspectRatio
        }
      }
    }
  }
}
`

const datoCMSGetServicesPageInfoQuery = `query servicePageQuery {
  servicePage {
    customScripts
    link
    pageDescription
    pageTitle
    seoTags {
      description
      title
      twitterCard
      image {
        url(imgixParams: {auto: format, h: "300", w: "500", fit: clip})
        height
        width
        title
        alt
      }
    }
    schema {
      ... on ArticleRecord {
        id
        _modelApiKey
        title
        description
        _updatedAt
        _publishedAt
        authorName
        authorType
        articleType
        images {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
      }
      ... on SchemaProductRecord {
        id
        _modelApiKey
        productLink {
          _modelApiKey
          price
          seoLinks
          description: shortDescription
          productName
          updatedAt
          productGallery {
            url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
          }
        }
      }
      ... on SchemaLogoRecord {
        id
        _modelApiKey
        url
        updatedAt
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
      }
      ... on LocationRecord {
        _modelApiKey
        name
        type: bussinessType
        id: idLinks
        address
        images {
          url(imgixParams: {auto: [format, compress], fit: clip})
        }
        openinghours
        telephone
        updatedAt
        links: url {
          ... on CategoryPageRecord {
            id
            _modelApiKey
            seoLink
          }
          ... on ProductRecord {
            id
            _modelApiKey
            seoLinks
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
        description
        geo {
          latitude
          longitude
        }
      }
    }
    blogList {
      id
      pageTitle
      _modelApiKey
      seoLinks
      location
      updatedAt
      headerImage {
        responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
          width
          webpSrcSet
          title
          srcSet
          src
          height
          bgColor
          sizes
          base64
          aspectRatio
        }
      }
    }
  }
}

`

const datoCMSProductPathQuery = `query ProductPathQuery {
  productPath:allProducts(first: ${localBuild ? "2" : "100"}) {
    seoLinks
  }
}`

const datoCMSProductInfoQuery = `query ProductInfoQuery($slug: String) {
  productInfo: product(filter: {seoLinks: {eq: $slug}}) {
    customScripts
    seoTags {
      description
      title
      twitterCard
      image {
        url(imgixParams: {auto: format, fit: clip, h: "300", w: "500"})
      }
    }
    id
    seoLinks
    available
    useToc
    shortDescription
    tags
    _modelApiKey
    productName
    _updatedAt
    _publishedAt
    contactDetail{
      id
      infoDetail
    }
    productVariants {
      id
      varinatName
      variantValue
      _modelApiKey
    }
    productInfoDetail {
      _modelApiKey
      id
      content
      map{
        longitude,
        latitude
      }
      videoLink{
        url,
        thumbnailUrl,
        providerUid
      }
    }
    productGallery {
      responsiveImage(imgixParams: {auto:format, fit: clip, h: "460", w: "500",lossless: "true"}) {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        aspectRatio
        base64
        alt
      }
    }
    productGallerythumbs:productGallery {
      responsiveImage(imgixParams: {auto:format, fit: crop, maxH: "103", maxW: "73",lossless: "true"}) {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        aspectRatio
        base64
        alt
      }
    }
    schema {
      ... on ArticleRecord {
        id
        _modelApiKey
        title
        description
        _updatedAt
        _publishedAt
        authorName
        authorType
        articleType
        images {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
        linkTo {
          ... on HomePageRecord {
            id
            _modelApiKey
            link
          }
          ... on BlogRecord {
            id
            _modelApiKey
            seoLinks
          }
        }
      }
      ... on SchemaProductRecord {
        id
        _modelApiKey
        productLink {
          _modelApiKey
          price
          seoLinks
          description:shortDescription
          productName
          updatedAt
          productGallery {
            url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
          }
        }
      }
      ... on SchemaLogoRecord {
        id
        _modelApiKey
        url
        updatedAt
        logo {
          url(imgixParams: {auto: format, fit: clamp, maxH: "200", maxW: "250"})
        }
      }
    }
  }
}
`

const datoCMSRelatedProductQuery = `query RelatedProductQuery($tag: String!) {
  relatedProductInfo: allProducts(filter: {tags: {matches: {pattern: $tag}}}, first: "2") {
    id
    seoLinks
    productName
    headerImage {
      id
      responsiveImage(imgixParams: {maxW: "500", maxH: "300", fit: clip, auto: format}) {
        width
        webpSrcSet
        title
        srcSet
        src
        height
        bgColor
        sizes
        base64
        aspectRatio
      }
      title
      tags
      smartTags
    }
  }
}
`

const checkProductIDExist = `query SingleProductQuery($productID: ItemId) {
  product(filter: {id: {eq: $productID}}) {
    id
  }
}
`
const checkBlogIDExist = `query SingleBlogQuery($blogID: ItemId) {
  blog(filter: {id: {eq: $blogID}}) {
    id
  }
}
`
const datoCMSCartQuery = `query cartItemsQuery($productID: ItemId) {
  product(filter: {id: {eq: $productID}}) {
    id
    seoLinks
    productName
    price
    headerImage {
      responsiveImage(imgixParams: {auto: [format, compress], fit: clip, w: "90", h: "73"}) {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
    
  }
}
`

const datoCMSSaleQuery = `query saleQuery {
  salesInfo {
    id
    dateEnd
    dateAvailable
    percentageSales
    placeShowSale
    popupDurantion
    popupTitle
    showAvailableDate
    displayType
    linkTo {
      ... on HomePageRecord {
        id
        link
      }
      ... on CategoryListPageRecord {
        id
        link
        _modelApiKey
      }
      ... on CategoryPageRecord {
        id
        seoLink
        _modelApiKey
      }
      ... on ProductRecord {
        id
        _modelApiKey
        seoLinks
      }
      ... on BlogRecord {
        id
        seoLinks
        _modelApiKey
      }
    }
  }
}
`

const datoCMSAllPagePathQuery = `query AllPagePathQuery {
  homePage{
    updatedAt
  }
  categoryListPage {
    link
    updatedAt
  }
  blogPage {
    link
    updatedAt
  }
  servicePage {
    link
    updatedAt
  }
  blog: allBlogs(first: "100") {
    seoLinks
    updatedAt
  }
  service: allServices(first: "100") {
    seoLinks
    updatedAt
  }
  products:allProducts(first: "100"){
    seoLinks
    updatedAt
  }
  categoryPages:allCategoryPages(first: "100") {
    seoLink
    updatedAt
  }
} 
`
const datoCMSAllPagePathQuery_feed = `query AllPagePathQuery {
  homePage {
    _modelApiKey
    title: pageTitle
    content: shortDescription
    link
    date: updatedAt
    seoInfo: seoTag {
      description
      image {
        url
      }
    }
  }
  categoryListPage {
    _modelApiKey
    title: pageTitle
    content: pageDescription
    link
    date: updatedAt
    seoInfo: seotag {
      description
      image {
        url
      }
    }
  }
  blogPage {
    _modelApiKey
    title: pageTitle
    content: pageDescription
    link
    date: updatedAt
    seoInfo: seoTags {
      description
      image {
        url
      }
    }
  }
  servicePage {
    _modelApiKey
    title: pageTitle
    content: pageDescription
    link
    date: updatedAt
    seoInfo: seoTags {
      description
      image {
        url
      }
    }
  }
  blog: allBlogs(first: "100") {
    _modelApiKey
    title: pageTitle
    content: shortDescription
    link: seoLinks
    date: updatedAt
    seoInfo: seoTag {
      description
      image {
        url
      }
    }
  }
  service: allServices(first: "100") {
    _modelApiKey
    title: pageTitle
    content: shortDescription
    link: seoLinks
    date: updatedAt
    seoInfo: seoTag {
      description
      image {
        url
      }
    }
  }
  products: allProducts(first: "100") {
    _modelApiKey
    title: productName
    content: shortDescription
    link: seoLinks
    date: updatedAt
    seoInfo: seoTags {
      description
      image {
        url
      }
    }
  }
  categoryPages: allCategoryPages(first: "100") {
    _modelApiKey
    title: categoryName
    content: categoryDescription {
      content
    }
    link: seoLink
    date: updatedAt
    seoInfo: seoTag {
      description
      image {
        url
      }
    }
  }
}
`
const datoCMSSinglePageFeed = (pageName, hasSlug = false) => {
  switch (pageName) {
    case "blog":
      if (hasSlug) {
        return `query AllPagePathQuery($slug: String) {
          pageInfo: allBlogs(filter: {seoLinks: {eq: $slug}}) {
          _modelApiKey
          title: pageTitle
          content: shortDescription
          link: seoLinks
          date: updatedAt
          seoInfo: seoTag {
            description
            image {
              url
            }
          }
        }
      }`
      }
      return `query AllPagePathQuery {
        pageInfo:blogPage {
        _modelApiKey
        title: pageTitle
        content: pageDescription
        link
        date: updatedAt
        seoInfo: seoTags {
          description
          image {
            url
          }
        }
      }
    }`;

    case "san-pham":
      return `query AllPagePathQuery($slug: String) {
        pageInfo: allProducts(filter: {seoLinks: {eq: $slug}}) {
          _modelApiKey
          title: productName
          content: shortDescription
          link: seoLinks
          date: updatedAt
          seoInfo: seoTags {
            description
            image {
              url
            }
          }
        }
      }`

    case "danh-muc-san-pham":
      if (hasSlug) {
        return ` query AllPagePathQuery($slug: String) {
          pageInfo: allCategoryPages(filter: {seoLink: {eq: $slug}}) {
          _modelApiKey
          title: categoryName
          content: categoryDescription {
            content
          }
          link: seoLink
          date: updatedAt
          seoInfo: seoTag {
            description
            image {
              url
            }
          }
        }
      }`
      }
      return `query AllPagePathQuery {
        pageInfo:categoryListPage {
          _modelApiKey
          title: pageTitle
          content: pageDescription
          link
          date: updatedAt
          seoInfo: seotag {
            description
            image {
              url
            }
          }
        }
      }`;

    case "dich-vu":
      if (hasSlug) {
        return ` query AllPagePathQuery($slug: String) {
          pageInfo: allServices(filter: {seoLinks: {eq: $slug}}) {
        _modelApiKey
        title: pageTitle
        content: shortDescription
        link: seoLinks
        date: updatedAt
        seoInfo: seoTag {
          description
          image {
            url
          }
        }
      }
    }`
      }
      return `query AllPagePathQuery {
        pageInfo:servicePage {
      _modelApiKey
      title: pageTitle
      content: pageDescription
      link
      date: updatedAt
      seoInfo: seoTags {
        description
        image {
          url
        }
      }
    }
  }`;

    default:
      return false
  }
}

const datoCMSGetPageRedirectInfo = (pageName, hasSlug = false) => {
  switch (pageName) {
    case "blog":
      if (hasSlug) {
        return `query AllPageRedirectInfoQuery($slug: String) {
          pageInfo: allBlogs(first: "100", filter: {seoLinks: {eq: $slug}}) {
            _modelApiKey
            link: seoLinks
            redirect {
              statusCode
              active
              linkTo {
                ... on BlogRecord {
                  _modelApiKey
                  link:seoLinks
                }
                ... on BlogPageRecord {
                  _modelApiKey
                  link
                }
                ... on CategoryPageRecord {
                  link:seoLink
                  _modelApiKey
                }
                ... on CategoryListPageRecord {
                  _modelApiKey
                  link
                }
                ... on ServiceRecord {
                  _modelApiKey
                  link:seoLinks
                }
                ... on ServicePageRecord {
                  _modelApiKey
                  link
                }
                ... on HomePageRecord {
                  id
                  link
                  _modelApiKey
                }
                ... on ProductRecord {
                  id
                  link:seoLinks
                  _modelApiKey
                }
              }
            }
          }
      }`
      }
      return `query AllPagePathQuery {
        pageInfo:blogPage {
          _modelApiKey
          link
          redirect {
            statusCode
            active
            linkTo {
              ... on BlogRecord {
                _modelApiKey
                link:seoLinks
              }
              ... on BlogPageRecord {
                _modelApiKey
                link
              }
              ... on CategoryPageRecord {
                seoLink
                _modelApiKey
              }
              ... on CategoryListPageRecord {
                _modelApiKey
                link
              }
              ... on ServiceRecord {
                _modelApiKey
                link:seoLinks
              }
              ... on ServicePageRecord {
                _modelApiKey
                link
              }
              ... on HomePageRecord {
                id
                link
                _modelApiKey
              }
              ... on ProductRecord {
                id
                link:seoLinks
                _modelApiKey
              }
            }
          }
        }
    }`;

    case "san-pham":
      return `query AllPagePathQuery($slug: String) {
        pageInfo: allProducts(filter: {seoLinks: {eq: $slug}}) {
          _modelApiKey
          link: seoLinks
          redirect {
            statusCode
            active
            linkTo {
              ... on BlogRecord {
                _modelApiKey
                link: seoLinks
              }
              ... on BlogPageRecord {
                _modelApiKey
                link
              }
              ... on CategoryPageRecord {
                link:seoLink
                _modelApiKey
              }
              ... on CategoryListPageRecord {
                _modelApiKey
                link
              }
              ... on ServiceRecord {
                _modelApiKey
                link:seoLinks
              }
              ... on ServicePageRecord {
                _modelApiKey
                link
              }
              ... on HomePageRecord {
                id
                link
                _modelApiKey
              }
              ... on ProductRecord {
                id
                link:seoLinks
                _modelApiKey
              }
            }
          }
        }
      }`

    case "danh-muc-san-pham":
      if (hasSlug) {
        return ` query AllPagePathQuery($slug: String) {
          pageInfo: allCategoryPages(filter: {seoLink: {eq: $slug}}) {
            _modelApiKey
            link: seoLink
            redirect {
              statusCode
              active
              linkTo {
                ... on BlogRecord {
                  _modelApiKey
                  link:seoLinks
                }
                ... on BlogPageRecord {
                  _modelApiKey
                  link
                }
                ... on CategoryPageRecord {
                  link:seoLink
                  _modelApiKey
                }
                ... on CategoryListPageRecord {
                  _modelApiKey
                  link
                }
                ... on ServiceRecord {
                  _modelApiKey
                  link:seoLinks
                }
                ... on ServicePageRecord {
                  _modelApiKey
                  link
                }
                ... on HomePageRecord {
                  id
                  link
                  _modelApiKey
                }
                ... on ProductRecord {
                  id
                  link:seoLinks
                  _modelApiKey
                }
              }
            }
        }
      }`
      }
      return `query AllPagePathQuery {
        pageInfo:categoryListPage {
          _modelApiKey
          link
          redirect {
            statusCode
            active
            linkTo {
              ... on BlogRecord {
                _modelApiKey
                link:seoLinks
              }
              ... on BlogPageRecord {
                _modelApiKey
                link
              }
              ... on CategoryPageRecord {
                link: seoLink
                _modelApiKey
              }
              ... on CategoryListPageRecord {
                _modelApiKey
                link
              }
              ... on ServiceRecord {
                _modelApiKey
                link:seoLinks
              }
              ... on ServicePageRecord {
                _modelApiKey
                link
              }
              ... on HomePageRecord {
                id
                link
                _modelApiKey
              }
              ... on ProductRecord {
                id
                link:seoLinks
                _modelApiKey
              }
            }
          }
        }
      }`;

    case "dich-vu":
      if (hasSlug) {
        return ` query AllPagePathQuery($slug: String) {
          pageInfo: allServices(filter: {seoLinks: {eq: $slug}}) {
            _modelApiKey
            link: seoLinks
            redirect {
              statusCode
              active
              linkTo {
                ... on BlogRecord {
                  _modelApiKey
                  link:seoLinks
                }
                ... on BlogPageRecord {
                  _modelApiKey
                  link
                }
                ... on CategoryPageRecord {
                  link:seoLink
                  _modelApiKey
                }
                ... on CategoryListPageRecord {
                  _modelApiKey
                  link
                }
                ... on ServiceRecord {
                  _modelApiKey
                  link:seoLinks
                }
                ... on ServicePageRecord {
                  _modelApiKey
                  link
                }
                ... on HomePageRecord {
                  id
                  link
                  _modelApiKey
                }
                ... on ProductRecord {
                  id
                  link:seoLinks
                  _modelApiKey
                }
              }
            }
      }
    }`
      }
      return `query AllPagePathQuery {
        pageInfo:servicePage {
          _modelApiKey
          link
          redirect {
            statusCode
            active
            linkTo {
              ... on BlogRecord {
                _modelApiKey
                link:seoLinks
              }
              ... on BlogPageRecord {
                _modelApiKey
                link
              }
              ... on CategoryPageRecord {
                link:seoLink
                _modelApiKey
              }
              ... on CategoryListPageRecord {
                _modelApiKey
                link
              }
              ... on ServiceRecord {
                _modelApiKey
                link:seoLinks
              }
              ... on ServicePageRecord {
                _modelApiKey
                link
              }
              ... on HomePageRecord {
                id
                link
                _modelApiKey
              }
              ... on ProductRecord {
                id
                link:seoLinks
                _modelApiKey
              }
            }
          }
    }
  }`;

    default:
      return false
  }
}

const datoCMSRedirectQuery =`query RedirectInfoQuery {
  redirectInfo: allRedirectsInfos(filter: {active: {eq: "true"}}) {
    id
    pageName
    statusCode
    externalLink
    source: sourceLink {
      ... on ServicePageRecord {
        id
        _modelApiKey
        links: link
      }
      ... on BlogPageRecord {
        id
        _modelApiKey
        links: link
      }
      ... on CategoryListPageRecord {
        id
        _modelApiKey
        links: link
      }
      ... on ServiceRecord {
        id
        links: seoLinks
        _modelApiKey
      }
      ... on CategoryPageRecord {
        id
        _modelApiKey
        links: seoLink
      }
      ... on ProductRecord {
        id
        _modelApiKey
        links: seoLinks
      }
      ... on BlogRecord {
        id
        _modelApiKey
        links: seoLinks
      }
    }
    destination: redirectTo {
      ... on HomePageRecord {
        id
        _modelApiKey
        links: link
      }
      ... on ServicePageRecord {
        id
        _modelApiKey
        links: link
      }
      ... on BlogPageRecord {
        id
        _modelApiKey
        links: link
      }
      ... on CategoryListPageRecord {
        id
        _modelApiKey
        links: link
      }
      ... on ServiceRecord {
        id
        links: seoLinks
        _modelApiKey
      }
      ... on CategoryPageRecord {
        id
        _modelApiKey
        links: seoLink
      }
      ... on ProductRecord {
        id
        _modelApiKey
        links: seoLinks
      }
      ... on BlogRecord {
        id
        _modelApiKey
        links: seoLinks
      }
    }
  }
}
`

async function callDatoCMSGraphQLAPI(query, { variables, preview } = {}) {
  // console.log("variables",variables)
  // sales && console.log("Called me from the api sales")

  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

module.exports = {
  datoCMSHomepageQuery,
  datoCMSAllPagePathQuery_feed,
  datoCMSHeaderQuery,
  datoCMSAllPagePathQuery,
  datoCMSBlogPathQuery,
  datoCMSSingleBlogQuery,
  datoCMSAllBlogBasicInfo,
  datoCMSCategoryPageQuery,
  datoCMSCategoryPathQuery,
  datoCMSCategoryListPageQuery,
  datoCMSGetServicesPageInfoQuery,
  datoCMSServicePathQuery,
  datoCMSRedirectQuery,
  datoCMSSingleServiceQuery,
  datoCMSSinglePageFeed,
  datoCMSGetPageRedirectInfo,
  datoCMSGetAssetMetadataQuery,
  datoCMSGetPageListByTagQuery,
  datoCMSGetBlogPageInfoQuery,
  datoCMSGetPageListByTagQuery_withPag,
  datoCMSProductPathQuery,
  datoCMSProductInfoQuery,
  datoCMSRelatedProductQuery,
  checkProductIDExist,
  checkBlogIDExist,
  datoCMSCartQuery,
  datoCMSSaleQuery,
  callDatoCMSGraphQLAPI
}
