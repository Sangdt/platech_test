const blocksToHtml = require("@sanity/block-content-to-html");

const checkArrNotEmpty = arr => Array.isArray(arr) && arr.length > 0;
module.exports = async function getCMSLayoutConent(preview = false) {
  // const { callDatoCMSGraphQLAPI, datoCMSHeaderQuery } = require("./datoCMSContentFetcher")
  const { LayoutQuery, defaultSeoQuery } = require("./sanityQueryCollection")
  // console.log("LayoutQuery",LayoutQuery)
  // const convertArrayToObject = require("../../Helper/convertArrayToObject ")
  const chunkArray = require("../../Helper/chunkArray")

  const imageUrlBuilder = require('@sanity/image-url');

  const sanityClient = require('@sanity/client')
  const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: new Date().toISOString().slice(0, 10), // use current UTC date - see "specifying API version"!
    useCdn: false, // `false` if you want to ensure fresh data
  });
  console.log("projectId,dataset",process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, process.env.NEXT_PUBLIC_SANITY_DATASET)

  const builder = imageUrlBuilder(client)

  function imgUrlGenerate(source) {
    return builder.image(source)
  }
  function responsiveImgBuilder({ asset, Title = null, alt = null }, imgWH = null) {
    // console.log("asset", asset)
    let imgWHDefault = {
      width: {
        "1024w": 320,
        "640w": 320,
        "320w": 320,
      },
      // height: {
      //   "1024w": 220,
      //   "640w": 220,
      //   "320w": 220,
      // }
    }
    return {
      "responsiveImage": {
        "width": asset.metadata.dimensions.width,
        "webpSrcSet": `${imgUrlGenerate(asset)
          .format("webp").fit("max")
          .width(imgWH ? imgWH["width"]["1024w"] : imgWHDefault["width"]["1024w"])
          .url()
          } 1024w, ${imgUrlGenerate(asset)
            .format("webp")
            .width(imgWH ? imgWH["width"]["640w"] : imgWHDefault["width"]["640w"])
          } 640w, ${imgUrlGenerate(asset)
            .format("webp").width(imgWH ? imgWH["width"]["320w"] : imgWHDefault["width"]["320w"])
          } 320w`,
        "title": Title ?? asset.title,
        "alt": alt ?? asset.altText,
        "srcSet": `${imgUrlGenerate(asset)
          .auto("format")
          .width(imgWH ? imgWH["width"]["1024w"] : imgWHDefault["width"]["1024w"])
          .url()
          } 1024w, ${imgUrlGenerate(asset)
            .auto("format")
            .width(imgWH ? imgWH["width"]["640w"] : imgWHDefault["width"]["640w"])
          } 640w, ${imgUrlGenerate(asset)
            .auto("format").width(imgWH ? imgWH["width"]["320w"] : imgWHDefault["width"]["320w"])

          } 320w`,
        "src": asset.url,
        "sizes": `(max-width: ${asset.metadata.dimensions.width}px) 100vw,${asset.metadata.dimensions.width}px`,
        "height": asset.metadata.dimensions.height,
        "aspectRatio": asset.metadata.dimensions.aspectRatio,
        "base64": asset.metadata.lqip,
      }
    }
  }
  try {
    // const {
    //   //  pageHeader, 
    //   // footer,
    //   _site } = await callDatoCMSGraphQLAPI(datoCMSHeaderQuery, preview);
    let seo = await client.fetch(defaultSeoQuery);
    if (seo.globalSeoConfig.favicon) {
      seo.globalSeoConfig.favicon.url = seo.globalSeoConfig.favicon.asset.url
    }
    if (checkArrNotEmpty(seo.globalSeoConfig.openGraph.images)) {
      seo.globalSeoConfig.openGraph.images = seo.globalSeoConfig.openGraph.images.map(item => {
        // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
        // console.log("url",item.asset)
        return ({
          url: item.asset.url,
          width: item.asset.metadata.dimensions.width,
          height: item.asset.metadata.dimensions.width,
          alt: item.alt ? item.alt : item.asset.altText,
        })
      }
      )
    }
    console.log("Seo", seo)
    let {
      footer,
      pageHeader
    } = await client.fetch(LayoutQuery)
    // console.log("Called me footer !!!", footer)
    // console.log("Called me pageHeader !!!",pageHeader)
    const {
      menuItems,
      pageLogo,
      topPageHeader
    } = pageHeader;
    const {
      other_info, footerInfo, socialLink
    } = footer
    if (checkArrNotEmpty(other_info)) {
      footer["other_info"] = other_info.map(({ _key, infoTitle, infoContent, linkTo }, index) => ({
        id: _key ?? index,
        infoContent: checkArrNotEmpty(infoContent) ? blocksToHtml({
          blocks: infoContent
        }) : null,
        infoTitle,
        linkTo
      }))
    }
    if (checkArrNotEmpty(footerInfo)) {
      footer["footerInfo"] = {
        link_to_page: chunkArray(footerInfo.map(({ _key, ...rest }) => ({
          id: _key,
          ...rest
        })), 3)
      }
    }
    // if (checkArrNotEmpty(socialLink)) {
    //   footer["socialLink"] = socialLink.map(item => {

    //   })
    // }
    if (checkArrNotEmpty(menuItems)) {
      pageHeader["menuItems"] = {
        item_info: menuItems.map(({ _key, linkTo, name, childItems }) => {
          return {
            name,
            id: _key,
            linkTo: linkTo ? linkTo : null,
            childItems: checkArrNotEmpty(childItems) ? childItems.map(({ _key, fieldInfo, childItem }) => {
              if (fieldInfo.headerImage) {
                fieldInfo.headerImage = {
                  ...responsiveImgBuilder(fieldInfo.headerImage)
                }
              }
              return {
                id: _key,
                _modelApiKey: 'menu_item',
                childItem: checkArrNotEmpty(childItem) ? childItem.map(({ _key, fieldInfo }) => {
                  return {
                    "_modelApiKey": "child_item",
                    id: _key,
                    ...fieldInfo
                  }
                }) : [],
                ...fieldInfo
              }
            }) : []
          }
        })
      }
    }
    if (topPageHeader) {
      pageHeader["topPageHeader"] = {
        top_header_item: {
          "_modelApiKey": "top_header_item",
          "itemName": topPageHeader.itemName,
          "linkTo": topPageHeader.linkTo
        },
        telephone_numner: {
          "_modelApiKey": "telephone_numner",
          "phoneNumber": topPageHeader.telephone_numner,
        }
      }
    }
    if (pageLogo) {
      pageHeader["pageLogo"] = {
        "logo_detail": {
          "_modelApiKey": "logo_detail",
          linkTo: pageLogo.linkTo,
          image: {
            ...responsiveImgBuilder(pageLogo.image, {
              width: {
                "1024w": 150,
                "640w": 90,
                "320w": 90,
              },
              height: {
                "1024w": 60,
                "640w": 49,
                "320w": 49,
              }
            })
          },
          name: pageLogo.name
        }
      }
    }

    // if (Object.keys(pageHeader).length > 0) {
    //   Object.keys(pageHeader).forEach(key => {
    //     if (Array.isArray(pageHeader[key])) {
    //       pageHeader[key] = convertArrayToObject(pageHeader[key], "_modelApiKey");
    //     }
    //   })
    // }
    // footer.socialLink = convertArrayToObject(footer.socialLink, "_modelApiKey");

    // if (Array.isArray(footer.footerInfo) && footer.footerInfo.length > 0) {
    //   footer.footerInfo = convertArrayToObject(footer.footerInfo, "_modelApiKey");
    //   footer.footerInfo.link_to_page = chunkArray(footer.footerInfo.link_to_page, 3);
    //   // console.log("footer.footerInfo", footer.footerInfo)

    // }
    // pageHeader.menuItems.item_info.forEach(({ linkTo, childItems, ...rest }) => {
    //   console.log("menuItems linkTo", linkTo)
    //   console.log("menuItems childItems", childItems)
    //   console.log("menuItems rest", rest)
    // });
    // console.log("pageHeader !!!", pageHeader)
    // console.log("topPageHeader !!!", pageHeader.pageLogo)

    return { pageHeader, footer, seo, createdDate: new Date() }
  } catch (err) {
    console.log("Err", err)
  }
}
