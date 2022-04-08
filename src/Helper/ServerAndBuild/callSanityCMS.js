import blocksToHtml from "@sanity/block-content-to-html";
import {
    allPageInfoQuery_feed,
    allPagePathQuery,
    blogInfoQuery,
    blogPageQuery,
    blogCategoryPageQuery,
    blogPathQuery,
    categoryInfoQuery,
    categoryPageQuery,
    categoryPathQuery,
    homePageQuery,
    productInfoQuery,
    productPathQuery,
    serviceInfoQuery,
    servicePageQuery,
    servicePathQuery,
    singlePageFeedInfoQuery,
    blogCategoryPathQuery,
    blogWithCategoryPathQuery
} from "./sanityQueryCollection";

import { ImageWidthSizeNum, ImageWidthSizeNo } from '../PaserUtil/ImageSize';

import { ParseCMSContent, ParseCMSBlogContent } from "Helper/ServerAndBuild/cmsParser";
import chunkArray from 'Helper/chunkArray'
import convertArrayToObject from "../convertArrayToObject ";
import formatter from "components/SharedComponents/currencyForamtter";
import { getURLForModelApiKey } from "components/SharedComponents/LinkForModelApiKey";
import { checkArrNotEmpty } from "../checkArrNotEmpty";
import { client } from "./sanityClient";
import getIframeAttr from "../getIframeAttr";
import imgUrlGenerate from "./imgUrlGenerate";

const h = blocksToHtml.h;
function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
function toPlainText(blocks = []) {
    return blocks
        // loop through each block
        .map(block => {
            // if it's not a text block with children, 
            // return nothing
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            // loop through the children spans, and join the
            // text strings
            return block.children.map(child => child.text).join('')
        })
        // join the paragraphs leaving split by two linebreaks
        .join('\n\n')
}
const BlockRenderer = props => {
    let alignTextPosition;
    if (checkArrNotEmpty(props.children) && props.children.some(item => item.id && item.id.includes("text-align"))) {
        const idStringArr = props.children.find(item => item.id && item.id.includes("text-align")).id.split("-");
        alignTextPosition = {
            textAlign: idStringArr[idStringArr.length - 1]
        }
    }
    // console.log("\props\n", props)
    // console.log("\props\n", props.marks)
    const style = props.node.style || 'normal'
    // const classForStyle = {
    //     h1: "text-4xl",
    //     h2: "text-3xl",
    //     h3: "text-2xl ",
    //     table: "table-auto",
    // }
    if (/^h\d/.test(style)) {
        // let alignTextPosition;
        const node = h(style, {}, props.children);
        const textContent = removeAccents(node.textContent).trim();
        return h(style, {
            style: alignTextPosition ? { ...alignTextPosition } : null,
            // className: classForStyle[style],
            id: textContent.replace(/\s/g, "-")
        }, props.children)
    }
    return style === 'blockquote'
        ? h('blockquote', {
            style: alignTextPosition ? { ...alignTextPosition } : null,
        }, props.children)
        : h('p', {
            style: alignTextPosition ? { ...alignTextPosition } : null,
        }, props.children)
}
// let showLog = true
const textColor = props => (
    h('span', { style: { color: props.mark?.colorCode?.hex } }, props.children)
)
const textAlign = props => (
    h('span', {
        id: `text-align-${props.mark?.posistion}`,
        // className: "w-full"
    }, props.children)
)
const serializers = {
    marks: { textColor, textAlign },
    types: {
        block: BlockRenderer,
        image: ({ node }) => {
            // if (showLog) {
            // console.log("asset info", node.asset)
            //     showLog = false;
            // }
            return (
                h("img.lazyload.w-full.mx-auto", {
                    // "height": asset.metadata.dimensions.height,
                    // "width": asset,
                    width: node.asset?.metadata.dimensions.width,
                    height: node.asset?.metadata.dimensions.height,
                    alt: node.customAlt && node.customAlt != '' ? node.customAlt : node.asset.altText,
                    title: node.customTitle && node.customTitle != '' ? node.customTitle : node.asset.title,
                    "data-srcset": `${imgUrlGenerate(node.asset._id ?? node.asset._ref)
                        .auto("format")
                        .width(1024).url()} 1024w, ${imgUrlGenerate(node.asset._id ?? node.asset._ref)
                            .auto("format").width(640).url()} 640w, ${imgUrlGenerate(node.asset._id ?? node.asset._ref)
                                .auto("format").width(320).url()} 320w`,
                    "data-src": node.asset.url,
                })
            )
        },
        gmap: ({ node }) => {
            // console.log("iframe attr",getIframeAttr(node))
            return (
                h("iframe.lazyload.w-full.h-full", {
                    ...getIframeAttr(node),
                    loading: "lazy"
                })
            )
        },
        // "undefined": () => {}
    }
}

function parseCMSSchema(JsonSchema) {
    // console.log("JsonSchema", JsonSchema)
    if (JsonSchema._type === "arcticleBlogNews") {
        let url = null;
        let dateObj = {
            datePublished: new Date().toLocaleDateString('en-GB'),
            dateCreated: new Date().toLocaleDateString('en-GB'),
            dateModified: new Date().toLocaleDateString('en-GB')
        };
        let images = [];
        let {
            // schemaImages,
            schemaImages, linkTo, publisherLogo, _key, ...rest
        } = JsonSchema
        if (checkArrNotEmpty(schemaImages)) {
            images = schemaImages.map(({ asset }) => asset.url)
        }
        if (publisherLogo && publisherLogo.asset) {
            publisherLogo = publisherLogo.asset.url
        }
        if (linkTo) {
            const {
                _type, slug, seoLinks, _createdAt, _updatedAt
            } = linkTo;
            dateObj.datePublished = _createdAt;
            dateObj.dateModified = _updatedAt;
            dateObj.dateCreated = _updatedAt;
            switch (_type) {
                case "blog":
                    url = "/blog/" + seoLinks.current
                    break;
                default:
                    url = "/chi-tiet-san-pham/" + slug.current
                    break;
            }
        }
        return {
            id: _key,
            images,
            url,
            publisherLogo,
            // article,
            ...dateObj,
            ...rest
        }
    }
    if (JsonSchema._type === "schemaProducts") {
        let dateObj = {
            releaseDate: new Date().toLocaleDateString('en-GB'),
            productionDate: new Date().toLocaleDateString('en-GB'),
            releaseDate: new Date().toLocaleDateString('en-GB')
        };
        const {
            linkTo, _key, offers, _type
        } = JsonSchema;
        let productNames = "",
            images = [],
            description = "",
            url = ""
        if (linkTo) {
            let {
                _createdAt, _updatedAt, productGallery, productName, shortDescription, slug, seoLinks, _type
            } = linkTo;
            if (checkArrNotEmpty(productGallery)) {
                // console.log("productGallery", productName, productGallery)
                images = productGallery.map(({ asset }) => asset.url)
            }
            // if (!checkArrNotEmpty(productGallery)) console.log("images", images)
            if (shortDescription) {
                description = toPlainText(shortDescription)
            }
            productNames = productName;
            dateObj.datePublished = _createdAt;
            dateObj.dateModified = _updatedAt;
            dateObj.dateCreated = _updatedAt;
            switch (_type) {
                case "blog":
                    url = "/blog/" + seoLinks.current
                    break;
                default:
                    // console.log("seoLinks,slug", seoLinks, slug)
                    url = "/chi-tiet-san-pham/" + slug.current
                    break;
            }
        }
        // if(!images)
        // console.log("\nJsonSchema",JsonSchema)
        return {
            id: _key,
            offers: offers ?? null,
            url,
            _type,
            productName: productNames,
            images: images ?? [],
            description,
            ...dateObj,
        }
    }
}
function parseCMSCustomScripts(scriptsInfo) {
    try {
        return JSON.parse(scriptsInfo);
    } catch (e) {
        return false;
    }
}
/**
 * 
 * @param {*} param0 
 * @param {Object} imgWH It should go sth like this
 *   {
 *       "1024w": 1024,
 *      "640w": 640,
 *       "320w": 320,
 *  }
 */
function responsiveImgBuilder({ asset, Title = null, alt = null }, imgW = null) {
    let imageSize = ImageWidthSizeNum;
    if (imgW && checkArrNotEmpty(imgW)) {
        if (imgW.length < ImageWidthSizeNo.length) {
            imageSize = new Array(ImageWidthSizeNo.length).fill(imgW).flat();
        } else {
            imageSize = imgW
        }

    }
    return {
        "responsiveImage": {
            "width": asset.metadata.dimensions.width,
            "webpSrcSet": ImageWidthSizeNo.map((imgSize, index) => {
                return `${imgUrlGenerate(asset._id)
                    .format("webp")
                    .width(imageSize[index]).url()} ${imgSize}`
            }).join(","),
            "srcSet": ImageWidthSizeNo.map((imgSize, index) => {
                return `${imgUrlGenerate(asset._id)
                    .auto("format")
                    .width(imageSize[index]).url()} ${imgSize}`
            }).join(","),
            "src": asset.url,
            "sizes": `(max-width: ${asset.metadata.dimensions.width}px) 100vw,${asset.metadata.dimensions.width}px`,
            "height": asset.metadata.dimensions.height,
            "aspectRatio": asset.metadata.dimensions.aspectRatio,
            "base64": asset.metadata.lqip,
            "title": Title ?? asset.title,
            "alt": alt ?? asset.altText
        }
    }
}
export async function getAllBlogPath(preview = false) {
    const pathArray = await client.fetch(blogPathQuery);
    return pathArray

}
export async function getAllBlogWithCategoryPath(preview = false) {
    const pathArray = await client.fetch(blogWithCategoryPathQuery);
    return pathArray

}
export async function getBlogInfoBySlug(preview = false, slug) {
    try {
        // console.log("slug", slug)
        const {
            Seo, blogBody, _id, pageTitle, seoLinks, _updatedAt, useToc
            , headerImage
        } = await client.fetch(blogInfoQuery, {
            slug: slug
        });
        if (checkArrNotEmpty(Seo?.openGraph?.images)) {
            Seo.openGraph.images = Seo.openGraph.images.map(item => {
                // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
                // console.log("url",item.asset)
                return ({
                    url: item.asset.url,
                    width: item.asset.metadata.dimensions.width,
                    height: item.asset.metadata.dimensions.width,
                    alt: item.alt ?? item.asset.altText,
                })
            }
            )

        }
        const headerImages = headerImage ? {
            ...responsiveImgBuilder(headerImage),

        } : null
        // console.log("blog html before parsing",blocksToHtml({
        //     blocks: blogBody,
        //     serializers: serializers
        // }))
        const blogBodyHTML = await ParseCMSBlogContent({
            cmsData: blocksToHtml({
                blocks: blogBody,
                serializers: serializers
            }),
            tagClssArray: {
                h1: "text-6xl font-medium text-grey-300",
                h2: "text-4xl font-medium text-grey-300",
                h3: "text-2xl font-medium text-grey-300",
                h4: "text-xl font-medium text-grey-300",
                table: "table-auto",
                img: "lazyload w-full"
            }
        });
        // const blogUpdateDate = new Date(updatedAt).toLocaleDateString('en-GB');
        const blogDateTime = new Date(_updatedAt).toLocaleDateString('en-GB');
        // const blogDateTime = blogUpdateDate > blogPublishedDate ? blogUpdateDate : blogPublishedDate
        // console.log("Seo schema", Seo.schema)
        let ParsedSchema = [];
        if (checkArrNotEmpty(Seo.schema)) {
            ParsedSchema = Seo.schema.filter(item => item).map(schemaInfo => parseCMSSchema(schemaInfo))
        }
        return {
            _modelApiKey: "blog",
            seoTag: Seo,
            // pageTitle: await ParseCMSContent({ cmsData: pageTitle, className: "tt-1", wrapperTag: "h1" }),
            pageTitle,
            headerImage: headerImages,
            blogBody: blogBodyHTML,
            useToc: useToc ?? false,
            // relativeBlog,
            schema: ParsedSchema,
            // contactForm: parsedcontactForm,
            // tags: TagList,
            customScripts: parseCMSCustomScripts(Seo.customScripts),
            blogDateTime
        }
    } catch (error) {
        console.error("error while building blog with slug " + slug, error);
        return false;
    }
}

export async function getAllServicePath(preview = false) {
    const pathArray = await client.fetch(servicePathQuery);
    return pathArray

}

export async function getServiceInfoBySlug(preview = false, slug) {
    try {
        // console.log("blogInfoQuery", blogInfoQuery)
        const {
            Seo, blogBody, _id, pageTitle, seoLinks, _updatedAt, useToc
            , headerImage, location
        } = await client.fetch(serviceInfoQuery, {
            slug: slug
        });
        let basedLocation = {};

        if (checkArrNotEmpty(location?.rows)) {
            location?.rows.forEach(({ _key, cells }) => {
                basedLocation[cells[0].toLocaleUpperCase()] = cells[1]
            })
        }
        if (checkArrNotEmpty(Seo.openGraph.images)) {
            Seo.openGraph.images = Seo.openGraph.images.map(item => {
                // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
                // console.log("url",item.asset)
                return ({
                    url: item.asset.url,
                    width: item.asset.metadata.dimensions.width,
                    height: item.asset.metadata.dimensions.width,
                    alt: item.alt ?? item.asset.altText,
                })
            }
            )

        }
        const headerImages = {
            ...responsiveImgBuilder(headerImage),

        }
        const blogBodyHTML = await ParseCMSBlogContent({
            cmsData: blocksToHtml({
                blocks: blogBody,
                serializers: serializers
            }),
            tagClssArray: {
                h1: "text-6xl font-medium text-yellow-300",
                h2: "text-4xl font-medium text-yellow-300",
                h3: "text-2xl font-medium text-yellow-300",
                table: "table-auto",
                img: "lazyload w-full"
            }
        });
        // const blogUpdateDate = new Date(updatedAt).toLocaleDateString('en-GB');
        const blogDateTime = new Date(_updatedAt).toLocaleDateString('en-GB');
        // const blogDateTime = blogUpdateDate > blogPublishedDate ? blogUpdateDate : blogPublishedDate
        // console.log("location", location)
        let ParsedSchema = [];
        if (checkArrNotEmpty(Seo.schema)) {
            ParsedSchema = Seo.schema.filter(item => item).map(schemaInfo => parseCMSSchema(schemaInfo))
        }
        return {
            _modelApiKey: "service",
            seoTag: Seo,
            pageTitle: await ParseCMSContent({ cmsData: pageTitle, className: "tt-1", wrapperTag: "h1" }),
            headerImage: headerImages,
            blogBody: blogBodyHTML,
            useToc: useToc ?? true,
            location: basedLocation ?? null,
            // relativeBlog,
            schema: ParsedSchema,
            // contactForm: parsedcontactForm,
            // tags: TagList,
            customScripts: parseCMSCustomScripts(Seo.customScripts),
            blogDateTime
        }
    } catch (error) {
        console.error("error while building service with slug" + slug, error);
        return false;
    }
}

export async function getBlogPageInfo(preview = false) {
    const {
        seoTags, pageTitle, _id, pageDescription, blogList,
    } = await client.fetch(blogPageQuery);
    // console.log("seoTags.schema", {
    //     seoTags, pageTitle, _id, pageDescription, blogList,
    // })
    if (checkArrNotEmpty(seoTags?.openGraph?.images)) {
        seoTags.openGraph.images = seoTags.openGraph.images.map(item => {
            // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
            // console.log("url",item.asset)
            return ({
                url: item.asset.url,
                width: item.asset.metadata.dimensions.width,
                height: item.asset.metadata.dimensions.width,
                alt: item.alt ?? item.asset.altText,
            })
        }
        )

    }
    return {
        // _modelApiKey: "blog",
        seoTag: seoTags,
        pageTitle,
        pageDescription: pageDescription ? blocksToHtml({
            blocks: pageDescription,
            serializers: serializers
        }) : null,
        // useToc: true,
        blogList: checkArrNotEmpty(blogList) ? blogList.map(({ _id, seoLinks, headerImage, categoryDescription, categoryName, _updatedAt }) => ({
            _modelApiKey: "blogCategory",
            seoLinks,
            ID: _id,
            categoryName,
            pageDescription: categoryDescription ? blocksToHtml({
                blocks: categoryDescription,
                serializers: serializers
            }) : null,
            updatedAt: new Date(_updatedAt).toLocaleDateString('en-GB'),
            headerImage: headerImage && {
                ...responsiveImgBuilder(headerImage)
            }
        })) : null,
        // blogList: checkArrNotEmpty(blogList) ? blogList.map(({ _id, seoLinks, headerImage, pageTitle, _updatedAt }) => ({
        //     _modelApiKey: "blog",
        //     seoLinks,
        //     ID: _id,
        //     pageTitle,
        //     updatedAt: new Date(_updatedAt).toLocaleDateString('en-GB'),
        //     headerImage: headerImage && {
        //         ...responsiveImgBuilder(headerImage)
        //     }
        // })) : null,
        schema: checkArrNotEmpty(seoTags?.schema) ? seoTags.schema.filter(item => item)
            .map(schemaInfo => parseCMSSchema(schemaInfo)) : null,
        // contactForm: parsedcontactForm,
        // tags: TagList,
        customScripts: parseCMSCustomScripts(seoTags?.customScripts),
        // blogDateTime
    }
}
export async function getAllCategoryBlogPath() {
    const pathArray = await client.fetch(blogCategoryPathQuery);
    return pathArray
}
export async function getBlogCategoryPageInfo(preview = false, categorySlug) {
    const {
        seoTags, categoryName, _id, pageDescription, blogList, slug
    } = await client.fetch(blogCategoryPageQuery, {
        slug: categorySlug
    });
    // console.log("seoTags.schema", blogCategoryPageQuery, {
    //     slug: categorySlug
    // })
    if (checkArrNotEmpty(seoTags?.openGraph?.images)) {
        seoTags.openGraph.images = seoTags.openGraph.images.map(item => {
            // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
            // console.log("url",item.asset)
            return ({
                url: item.asset.url,
                width: item.asset.metadata.dimensions.width,
                height: item.asset.metadata.dimensions.width,
                alt: item.alt ?? item.asset.altText,
            })
        }
        )

    }
    return {
        // _modelApiKey: "blog",
        slug,
        seoTag: seoTags,
        categoryName,
        pageDescription: pageDescription ? blocksToHtml({
            blocks: pageDescription,
            serializers: serializers
        }) : null,
        // useToc: true,
        blogList: checkArrNotEmpty(blogList) ? blogList.map(({ _id, seoLinks, headerImage, shortDescription, pageTitle, _updatedAt }) => ({
            _modelApiKey: "blog",
            seoLinks,
            ID: _id,
            pageTitle,
            shortDescription: shortDescription ? blocksToHtml({
                blocks: shortDescription,
                serializers: serializers
            }) : null,
            updatedAt: new Date(_updatedAt).toLocaleDateString('en-GB'),
            headerImage: headerImage && {
                ...responsiveImgBuilder(headerImage, [187, 375, 750])
            }
        })) : null,
        // blogList: checkArrNotEmpty(blogList) ? blogList.map(({ _id, seoLinks, headerImage, pageTitle, _updatedAt }) => ({
        //     _modelApiKey: "blog",
        //     seoLinks,
        //     ID: _id,
        //     pageTitle,
        //     updatedAt: new Date(_updatedAt).toLocaleDateString('en-GB'),
        //     headerImage: headerImage && {
        //         ...responsiveImgBuilder(headerImage)
        //     }
        // })) : null,
        schema: checkArrNotEmpty(seoTags?.schema) ? seoTags.schema.filter(item => item)
            .map(schemaInfo => parseCMSSchema(schemaInfo)) : null,
        // contactForm: parsedcontactForm,
        // tags: TagList,
        customScripts: parseCMSCustomScripts(seoTags?.customScripts),
        // blogDateTime
    }
}

export async function getServicePageInfo(preview = false) {
    const {
        seoTags, pageTitle, _id, pageDescription, blogList,
    } = await client.fetch(servicePageQuery);
    // console.log("seoTags.schema", blogPageQuery)
    const selectOptions = [];

    if (checkArrNotEmpty(seoTags?.openGraph?.images)) {
        seoTags.openGraph.images = seoTags.openGraph.images.map(item => {
            // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
            // console.log("url",item.asset)
            return ({
                url: item.asset.url,
                width: item.asset.metadata.dimensions.width,
                height: item.asset.metadata.dimensions.width,
                alt: item.alt ?? item.asset.altText,
            })
        }
        )

    }
    return {
        // _modelApiKey: "blog",
        seoTag: seoTags,
        pageTitle,
        pageDescription: blocksToHtml({
            blocks: pageDescription,
            serializers: serializers
        }),
        selectOptions,
        // useToc: true,
        blogList: checkArrNotEmpty(blogList) ? blogList.map(({ _id, seoLinks, headerImage, pageTitle, _updatedAt, location }) => {
            let basedLocation = {};

            if (checkArrNotEmpty(location?.rows)) {
                location?.rows.forEach(({ _key, cells }) => {
                    basedLocation[cells[0].toLocaleUpperCase()] = cells[1]
                    // let locationObj = {
                    //     key: cells[0],
                    //     [cells[0]]: cells[1]
                    // }
                    let opt = selectOptions.find(el => el.Name === cells[0].toLocaleUpperCase());

                    if (!opt) {

                        selectOptions.push({
                            Name: cells[0].toLocaleUpperCase(),
                            selectObj: [{
                                value: cells[1],
                                label: cells[1]
                            }]
                        });
                    } else {
                        const slectInddex = opt.selectObj.findIndex(el => el.value === cells[1]);
                        if (slectInddex === -1) {
                            opt.selectObj.push({
                                value: cells[1],
                                label: cells[1]
                            })
                        }
                        selectOptions.forEach((element, index) => {
                            if (element.Name === opt.Name) {
                                selectOptions[index] = opt;
                            }
                        });
                    }
                });
            }
            return ({
                _modelApiKey: "service",
                seoLinks,
                ID: _id,
                pageTitle,
                updatedAt: new Date(_updatedAt).toLocaleDateString('en-GB'),
                headerImage: headerImage && {
                    ...responsiveImgBuilder(headerImage)
                },
                location: basedLocation ?? null
            });
        }) : [],
        schema: checkArrNotEmpty(seoTags?.schema) ? seoTags.schema.filter(item => item)
            .map(schemaInfo => parseCMSSchema(schemaInfo)) : null,
        // contactForm: parsedcontactForm,
        // tags: TagList,
        customScripts: parseCMSCustomScripts(seoTags?.customScripts),
        // blogDateTime
    }
}
export async function getHomepageData(preview = false) {
    try {
        const { shortDescription,
            pageTitle,
            testimonial,
            relatedBlog,
            productList,
            introduction,
            seoTags,
            categoryList,
            homeBanner,
            IntroductionSections,
            WelcomeContent
        } = await client.fetch(homePageQuery);
        // console.log("home page info WelcomeContent",
        //     WelcomeContent
        // )
        let homePageDescription;
        let welcomeContent;
        if (WelcomeContent) {
            const {
                headerImage,
                shortDescription,
                ...rest
            } = WelcomeContent
            welcomeContent = {
                headerImage: headerImage ? {
                    ...responsiveImgBuilder(headerImage)
                } : null,
                shortDescription: checkArrNotEmpty(shortDescription) ? await ParseCMSBlogContent({
                    cmsData: blocksToHtml({
                        blocks: shortDescription,
                        serializers: serializers
                    }),
                    tagClssArray: {
                        p: "mb-6 text-gray-400 leading-loose"
                    }
                }) : "",
                ...rest
            }
        }
        // console.log("productList", productList);
        let IntroductionSection = checkArrNotEmpty(IntroductionSections) ? await Promise.all(IntroductionSections.map(async ({ _key, shortDescription, ...rest }) => ({
            id: _key,
            shortDescription: checkArrNotEmpty(shortDescription) ? await ParseCMSBlogContent({
                cmsData: blocksToHtml({
                    blocks: shortDescription,
                    serializers: serializers
                }),
                tagClssArray: {
                    p: "text-gray-500 leading-loose"
                }
            }) : null,
            ...rest
        }))) : [];
        if (checkArrNotEmpty(shortDescription)) {
            homePageDescription = blocksToHtml({
                blocks: shortDescription,
                serializers: serializers,
            })
        }
        if (checkArrNotEmpty(seoTags?.openGraph?.images)) {
            seoTags.openGraph.images = seoTags.openGraph.images.map(item => {
                // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
                // console.log("url",item.asset)
                return ({
                    url: item.asset.url,
                    width: item.asset.metadata.dimensions.width,
                    height: item.asset.metadata.dimensions.width,
                    alt: item.alt ?? item.asset.altText,
                })
            }
            )
        }
        let categoryListArray = [];
        let parsedCategoryList = checkArrNotEmpty(categoryList) ? await Promise.all(categoryList.map(async ({ _id, categoryName, slug, categoryGallery, categoryDescription }) => ({
            categoryName,
            seoLink: slug?.current ?? null,
            id: _id,
            categoryGallery: [{
                ...responsiveImgBuilder(categoryGallery)
            }],
            categoryDescription: categoryDescription ? await ParseCMSContent({
                cmsData: blocksToHtml({
                    blocks: categoryDescription,
                    serializers: serializers
                }), wrapperTag: "div", className: "dsc"
            }) : null,
        }))) : [];
        if (parsedCategoryList && parsedCategoryList.length > 3) {
            const chunkedArray = chunkArray(parsedCategoryList, 3);
            categoryListArray.push(chunkedArray)
        } else if (parsedCategoryList) {
            categoryListArray.push(...parsedCategoryList)
        }
        return {
            welcomeContent,
            IntroductionSections: IntroductionSection,
            pageTitle,
            homeBanner: checkArrNotEmpty(homeBanner) ? {
                assetGallery: homeBanner.map(({ asset }) => ({
                    ...responsiveImgBuilder({ asset: asset })
                }))
            } : null,
            shortDescription: homePageDescription ? await ParseCMSContent({
                cmsData: homePageDescription,
                wrapperTag: "h2",
                className: "text-center mt10"
            }) : null,
            introduction: checkArrNotEmpty(introduction) ? introduction.map(({ _id, _updatedAt, seoLinks, pageTitle, headerImage }) => ({
                headerImage: headerImage ? {
                    ...responsiveImgBuilder(headerImage)
                } : null,
                id: _id,
                pageTitle,
                seoLinks: seoLinks.current,
                blogDateTime: new Date(_updatedAt).toLocaleDateString('en-GB'),
                //  ExternalLinks
            })) : null,
            testimonial: checkArrNotEmpty(testimonial) ? testimonial.map(({ name, content, clientPicture }) => ({
                // name: await ParseCMSContent({ cmsData: name, wrapperTag: "div", className: "name" }),
                name,
                content: content ? blocksToHtml({
                    blocks: content,
                    serializers: serializers
                }) : null,
                clientPicture: clientPicture ? {
                    ...responsiveImgBuilder(clientPicture, [250])
                } : null
            })
            ) : null,
            relatedBlog: checkArrNotEmpty(relatedBlog) ? relatedBlog.map(({ _id, _updatedAt, seoLinks, pageTitle, headerImage }) => ({
                headerImage: headerImage ? {
                    ...responsiveImgBuilder(headerImage)
                } : null,
                id: _id,
                pageTitle,
                seoLinks: seoLinks.current,
                blogDateTime: new Date(_updatedAt).toLocaleDateString('en-GB'),
                //  ExternalLinks
            })) : null,
            productList: checkArrNotEmpty(productList) ? productList.map(({ _id, productName, price, slug, headerImage }) => ({
                productName,
                seoLinks: slug?.current ?? null,
                id: _id,
                price,
                headerImage: headerImage ? {
                    ...responsiveImgBuilder(headerImage)
                } : null
            })) : null,
            categoryList: categoryListArray,

            customScripts: parseCMSCustomScripts(seoTags?.customScripts),
            schema: checkArrNotEmpty(seoTags?.schema) ? seoTags.schema.filter(item => item)
                .map(schemaInfo => parseCMSSchema(schemaInfo)) : null,
            seoTag: seoTags
        }

    } catch (error) {
        console.error("error while getting homepage data", error)
    }
}

export async function getCategoryPageData(preview = false) {
    const {
        seoTags, pageTitle, _id, pageDescription, categoryList,
    } = await client.fetch(categoryPageQuery);
    let allProductListing;
    // console.log("blogPageQuery",blogPageQuery)
    if (checkArrNotEmpty(seoTags?.openGraph?.images)) {
        seoTags.openGraph.images = seoTags.openGraph.images.map(item => {
            // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
            // console.log("url",item.asset)
            return ({
                url: item.asset.url,
                width: item.asset.metadata.dimensions.width,
                height: item.asset.metadata.dimensions.width,
                alt: item.alt ?? item.asset.altText,
            })
        }
        )

    }
    if (categoryList && checkArrNotEmpty(categoryList)) {
        allProductListing = categoryList.filter(({ productInCategory }) => productInCategory && checkArrNotEmpty(productInCategory))
            .map(({ productInCategory }) => productInCategory.map(({ _id, productName, slug, headerImage }) => ({
                searchValue: productName,
                productName,
                seoLinks: slug?.current ?? "",
                id: _id,
                headerImage: headerImage && {
                    ...responsiveImgBuilder(headerImage)
                }
            }))).flat();
    }
    // console.log("allProductListing", allProductListing)
    return {
        seoTag: seoTags,
        pageTitle: pageTitle && await ParseCMSContent({ cmsData: pageTitle, className: "tt-1", wrapperTag: "h1" }),
        pageDescription: pageDescription ? await ParseCMSContent({
            cmsData: blocksToHtml({
                blocks: pageDescription,
                serializers: serializers
            }),
        }) : null,
        allProductListing: allProductListing ?? null,
        // useToc: true,
        categoryList: checkArrNotEmpty(categoryList) ? categoryList.map(({ slug, categoryName, productInCategory }) => ({
            // _modelApiKey: "category",
            seoLink: slug.current,
            productInCategory: checkArrNotEmpty(productInCategory) && productInCategory
                .map(({ _id, productName, slug, headerImage }) => ({
                    productName,
                    seoLinks: slug?.current ?? "",
                    id: _id,
                    headerImage: headerImage && {
                        ...responsiveImgBuilder(headerImage)
                    }
                })),
            categoryName,
            id: _id,
        })) : null,
        schema: checkArrNotEmpty(seoTags?.schema) ? seoTags.schema.filter(item => item)
            .map(schemaInfo => parseCMSSchema(schemaInfo)) : null,

        customScripts: parseCMSCustomScripts(seoTags?.customScripts),
    }
}

export async function getAllCategoryPath(preview = false) {
    let allCategoryPath = await client.fetch(categoryPathQuery);
    return {
        allCategoryPath: allCategoryPath.map(({ slug }) => slug.current)
    }
}

export async function getCategoryInfo(preview = false, categorySlug) {
    try {
        let {
            productInCategory, categoryDescription, categoryName, seoTags
        } = await client.fetch(categoryInfoQuery, {
            slug: categorySlug
        });
        if (checkArrNotEmpty(seoTags?.openGraph?.images)) {
            seoTags.openGraph.images = seoTags.openGraph.images.map(item => {
                // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
                // console.log("url",item.asset)
                return ({
                    url: item.asset.url,
                    width: item.asset.metadata.dimensions.width,
                    height: item.asset.metadata.dimensions.width,
                    alt: item.alt ?? item.asset.altText,
                })
            }
            )

        }
        // console.log("productInCategory",productInCategory)
        return {
            seoTag: seoTags,
            categoryName,
            schema: checkArrNotEmpty(seoTags?.schema) ? seoTags.schema.filter(item => item)
                .map(schemaInfo => parseCMSSchema(schemaInfo)) : null,
            customScripts: parseCMSCustomScripts(seoTags?.customScripts),
            categoryDescription: categoryDescription ? await ParseCMSContent({
                cmsData: blocksToHtml({
                    blocks: categoryDescription,
                    serializers: serializers
                })
            }) : null,
            productInCategory: checkArrNotEmpty(productInCategory) ? productInCategory
                .map(({ _id, productName, slug, headerImage }) => ({
                    productName,
                    seoLinks: slug?.current ?? "",
                    id: _id,
                    headerImage: headerImage && {
                        ...responsiveImgBuilder(headerImage)
                    }
                })) : null,
        }
    } catch (error) {
        console.error("error while building category with slug" + categorySlug, error);
        return false;
    }
}

export async function getProductinfo(preview, productSlug) {
    try {
        const {
            useToc,
            slug,
            seoTags,
            shortDescription,
            productInfoDetail,
            productName,
            price,
            _id,
            productGallery,
            contactDetail,
            productVariants
        } = await client.fetch(productInfoQuery, {
            slug: productSlug
        });
        // console.log("productInfoDetail", productInfoDetail)
        const contactDetailArray = [];
        if (Array.isArray(contactDetail) && contactDetail.length > 0) {
            for (const contact of contactDetail) {
                contactDetailArray.push({
                    id: contact._key,
                    infoDetail: await ParseCMSContent({
                        cmsData: blocksToHtml({
                            blocks: contact.simpleBlockContent,
                            serializers: serializers
                        })
                    })
                })
            }
        }
        let localPrice = null;
        if (price) {
            localPrice = formatter.format(price)
        }
        if (checkArrNotEmpty(seoTags?.openGraph?.images)) {
            seoTags.openGraph.images = seoTags.openGraph.images.map(item => {
                // let url = imgUrlGenerate(item.asset._id).width(500).height(300);
                // console.log("url",item.asset)
                return ({
                    url: item.asset.url,
                    width: item.asset.metadata.dimensions.width,
                    height: item.asset.metadata.dimensions.width,
                    alt: item.alt ?? item.asset.altText,
                })
            }
            )

        }
        return {
            seoTags,
            productGallery: checkArrNotEmpty(productGallery) ? productGallery.map(({ asset, Title = null, alt = null }) => ({
                ...responsiveImgBuilder({ asset: asset, Title: Title, alt: alt },
                    {
                        "1024w": 670,
                        "640w": 500,
                        "320w": 320,
                    })
            })) : null,
            productGallerythumbs: checkArrNotEmpty(productGallery) ? productGallery.map(({ asset }) => ({
                ...responsiveImgBuilder({ asset: asset }, {
                    "1024w": 150,
                    "640w": 80,
                    "320w": 50,
                })
            })) : null,
            id: _id,
            productName,
            useToc: useToc ?? false,
            productInfoDetail: checkArrNotEmpty(productInfoDetail) ? await ParseCMSBlogContent({
                cmsData: blocksToHtml({
                    blocks: productInfoDetail,
                    serializers: serializers
                }),
                tagClssArray: {
                    h1: "text-6xl text-teal-300 text-center",
                    h2: "text-4xl text-teal-300 text-center",
                    h3: "text-2xl text-teal-300",
                    table: "table-auto mb-2 break-words mx-auto",
                    // img: "lazyload mx-auto ",
                    td: "border break-words"
                }
            }) : null,
            // productInfoDetail: [],
            shortDescription: checkArrNotEmpty(shortDescription) ? await ParseCMSContent({
                cmsData: blocksToHtml({
                    blocks: shortDescription,
                    serializers: serializers
                })
            }) : null,
            productVariants: productVariants ?? null,
            localPrice,
            contactDetail: contactDetailArray,
            schema: checkArrNotEmpty(seoTags?.schema) ? seoTags.schema.filter(item => item)
                .map(schemaInfo => parseCMSSchema(schemaInfo)) : null,
            // contactForm: parsedcontactForm,
            // tags: TagList,
            customScripts: parseCMSCustomScripts(seoTags?.customScripts),
        }
    } catch (error) {
        console.error("error while building product with slug" + productSlug, error);
        return false;
    }
}
export async function getProductPath(preview = false) {
    let productPath = await client.fetch(productPathQuery);
    return {
        productPath: productPath.filter(item => item.slug).map(item => item?.slug)
    }
}
export async function getSinglePageFeed(preview = false, pageName, slug, hasSlug) {
    try {
        // console.log("params",{ pageName, slug, hasSlug})
        const pageMapping = {
            "danh-muc-san-pham": "category",
            "blog": "blogPage",
            "dich-vu": "servicePage",
        }
        let pagesInfo = await client.fetch(singlePageFeedInfoQuery(hasSlug), {
            slug: hasSlug ? slug : pageMapping[pageName]
        });
        console.log("pagesInfo", pagesInfo)
        const { image, content, date, ...rest } = pagesInfo;

        return {
            ...rest,
            date: new Date(date),
            content: content ? blocksToHtml({
                blocks: content,
                serializers: serializers
            }) : "",
            image: image?.asset?.url
        }
    } catch (error) {
        return false;
    }
}

export async function getFullPagePath_feed() {
    let allPagesInfo = await client.fetch(allPageInfoQuery_feed);
    // console.log("allPagesInfo",allPagesInfo)
    return allPagesInfo.map(item => {
        const { image, content, date, ...rest } = item;
        return {
            ...rest,
            date: new Date(date),
            content: content ? blocksToHtml({
                blocks: content,
                serializers: serializers
            }) : "",
            image: image?.asset?.url
        }
    })
}
export async function getFullPagePath() {
    return await client.fetch(allPagePathQuery);
}