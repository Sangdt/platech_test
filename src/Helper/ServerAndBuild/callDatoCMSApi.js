import {
    datoCMSHomepageQuery,
    datoCMSBlogPathQuery,
    datoCMSSingleBlogQuery,
    datoCMSAllBlogBasicInfo,
    datoCMSCategoryPageQuery,
    datoCMSCategoryPathQuery,
    datoCMSCategoryListPageQuery,
    datoCMSGetPageListByTagQuery,
    datoCMSGetBlogPageInfoQuery,
    datoCMSAllPagePathQuery_feed,
    datoCMSProductPathQuery,
    datoCMSProductInfoQuery,
    datoCMSServicePathQuery,
    checkProductIDExist,
    datoCMSGetPageRedirectInfo,
    datoCMSSinglePageFeed,
    datoCMSSingleServiceQuery,
    datoCMSRedirectQuery,
    callDatoCMSGraphQLAPI,
    datoCMSRelatedProductQuery,
    datoCMSAllPagePathQuery,
    datoCMSGetPageListByTagQuery_withPag,
    datoCMSGetServicesPageInfoQuery
} from "@/Helper/ServerAndBuild/datoCMSContentFetcher";
import { ParseCMSContent, ParseCMSBlogContent } from "@/Helper/ServerAndBuild/cmsParser";
import chunkArray from '@/Helper/chunkArray'
import convertArrayToObject from "../convertArrayToObject ";
import formatter from "@/SharedComponents/currencyForamtter";
import { getURLForModelApiKey } from "@/SharedComponents/LinkForModelApiKey";
import { checkArrNotEmpty } from "../checkArrNotEmpty";

// import { SiteClient } from 'datocms-client';
// const client = new SiteClient(process.env.DATOCMS_API_TOKEN);
// const PAGE_SIZE = 20;                       // Similar to 'limit'
// const skip = (page - 1) * PAGE_SIZE; 

function parseCMSSchema(JsonSchema, isProduct = false, productInfo = null) {
    // console.log("JsonSchema",JsonSchema)
    let ParsedSchema;
    if (JsonSchema) {
        ParsedSchema = Object.assign([], JsonSchema);
        if (Array.isArray(ParsedSchema) && ParsedSchema.length > 0) {
            // console.log("ParsedSchema",ParsedSchema)
            ParsedSchema = convertArrayToObject(ParsedSchema, "_modelApiKey");
            let { article, schema_product, location, ...rest } = ParsedSchema;
            if (article) {
                if (Array.isArray(article) && article.length > 0) {
                    for (const singleArticle of article) {
                        if (Array.isArray(singleArticle.images) && singleArticle.images.length > 0) {
                            singleArticle.images = singleArticle.images.map(item => item.url);
                        }
                    }
                } else {
                    if (Array.isArray(article.images) && article.images.length > 0) {
                        article.images = article.images.map(item => item.url);
                    }
                }
            } else if (isProduct && productInfo) {
                // console.log("productInfo", productInfo);
                article = {
                    articleType: "BlogPosting",
                    authorName: "Tuấn",
                    title: productInfo?.productName,
                    description: productInfo?.seoTags?.description,
                    _updatedAt: productInfo?._updatedAt,
                    _publishedAt: productInfo?._publishedAt,
                    images: productInfo?.productGallery?.map(item => item?.responsiveImage?.src),
                    linkTo: {
                        _modelApiKey: productInfo?._modelApiKey,
                        seoLinks: productInfo?.seoLinks
                    },
                    logo: {
                        url: productInfo?.productGallery[0]?.responsiveImage?.src || null
                    }
                }
            }

            if (schema_product && schema_product.productLink) {
                if (Array.isArray(schema_product.productLink.productGallery)
                    && schema_product.productLink.productGallery.length > 0) {
                    // console.log("schema_product.productLink.productGallery",schema_product.productLink.productGallery)
                    schema_product.productLink.productGallery =
                        schema_product.productLink.productGallery.map(item => item.url);
                }
                if (schema_product.productLink.price) {
                    schema_product.productLink.price = formatter.format(schema_product.productLink.price)
                }
            }
            if (location) {
                if (location.links) {
                    location.url = process.env.NEXT_PUBLIC_PUBLIC_URL + getURLForModelApiKey({
                        _modelApiKey: location.links._modelApiKey,
                        links: location.links.seoLinks ?? location.links.seoLink
                    })
                }
                if (location.images) {
                    location.images = location.images.map(item => item.url)
                    // console.log("images",location.images)
                }
            }
            ParsedSchema = {
                schema_product: schema_product ?? null,
                article: article ?? null,
                location: location ?? null,
                ...rest ?? null
            }
            // console.log("ParsedSchema", ParsedSchema.schema_product.productLink.productGallery)

        }
    }
    return ParsedSchema || null;
}
function parseCMSCustomScripts(scriptsInfo) {
    try {
        return JSON.parse(scriptsInfo);
    } catch (e) {
        return false;
    }
}
export async function getFullPagePath(preview = false) {
    let allURLs = [];
    const {
        homePage,
        categoryListPage,
        blogPage,
        servicePage,
        blog,
        products,
        service,
        categoryPages
    } = await callDatoCMSGraphQLAPI(datoCMSAllPagePathQuery, { preview });
    if (homePage) {
        allURLs.push({
            isHP: true,
            lastmod: homePage.updatedAt
        })
    }
    if (categoryListPage && categoryListPage.link) {
        categoryListPage.link !== '' && allURLs.push({
            link: categoryListPage.link,
            lastmod: categoryListPage.updatedAt
        });
    }
    if (blogPage && blogPage.link) {
        blogPage.link !== '' && allURLs.push({
            link: blogPage.link,
            lastmod: blogPage.updatedAt
        });
    }
    if (servicePage && servicePage.link) {
        servicePage.link !== '' && allURLs.push({
            link: servicePage.link,
            lastmod: servicePage.updatedAt
        });
    }
    if (blog && (Array.isArray(blog) && blog.length > 0)) {
        blog.forEach(element => {
            if (element) {
                allURLs.push({
                    link: `/blog/${element.seoLink ?? element.seoLinks}`,
                    lastmod: element.updatedAt
                });
            }
        });
    }
    if (service && (Array.isArray(service) && service.length > 0)) {
        service.forEach(element => {
            if (element) {
                allURLs.push({
                    link: `/blog/${element.seoLink ?? element.seoLinks}`,
                    lastmod: element.updatedAt
                });
            }
        });
    }
    if (products && (Array.isArray(products) && products.length > 0)) {
        products.forEach(element => {
            if (element) {
                allURLs.push({
                    link: `/san-pham/${element.seoLink ?? element.seoLinks}`,
                    lastmod: element.updatedAt
                });
            }
        });
    }
    if (categoryPages && (Array.isArray(categoryPages) && categoryPages.length > 0)) {
        categoryPages.forEach(element => {
            if (element) {
                allURLs.push({
                    link: `/danh-muc-san-pham/${element.seoLink ?? element.seoLinks}`,
                    lastmod: element.updatedAt
                });
            }
        });
    }
    return allURLs
}
export async function getFullPagePath_feed(preview = false) {
    let allPageInfoFeed = [];
    const allPages = await callDatoCMSGraphQLAPI(datoCMSAllPagePathQuery_feed, { preview });
    // console.log("allPages",allPages)
    for (const pages in allPages) {
        if (Array.isArray(allPages[pages]) && allPages[pages].length >= 1) {
            allPages[pages].forEach(element => {
                // console.log("element")
                allPageInfoFeed.push({
                    title: element.title,
                    id: `https://barberhouse.vn${getURLForModelApiKey({
                        _modelApiKey: element._modelApiKey,
                        links: element.link
                    })}`,
                    link: `https://barberhouse.vn${getURLForModelApiKey({
                        _modelApiKey: element._modelApiKey,
                        links: element.link
                    })}`,
                    description: element.seoInfo.description,
                    content: (Array.isArray(element.content) && element.content.length >= 1) ? element.content.reduce(
                        (accumulator, currentValue) => accumulator + currentValue.content, "")
                        : element.content,
                    date: new Date(element.date),
                    image: element.seoInfo.image?.url
                });
                // console.log("element.seoInfo.image",element.seoInfo.image)
            });
        } else {
            allPageInfoFeed.push({
                title: allPages[pages].title,
                id: `https://barberhouse.vn${getURLForModelApiKey({
                    _modelApiKey: allPages[pages]._modelApiKey,
                    links: allPages[pages].link
                })}`,
                link: `https://barberhouse.vn${getURLForModelApiKey({
                    _modelApiKey: allPages[pages]._modelApiKey,
                    links: allPages[pages].link
                })}`,
                description: allPages[pages].seoInfo.description,
                content: (Array.isArray(allPages[pages].content) && allPages[pages].content.length >= 1) ? allPages[pages].content.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.content, "") : allPages[pages].content,
                date: new Date(allPages[pages].date),
                image: allPages[pages].seoInfo.image?.url
            })
        }
    }
    // console.log("allPageInfoFeed", allPageInfoFeed)
    return allPageInfoFeed
}

export async function getSinglePageFeed(preview = false, pageName, slug, hasSlug) {
    const { pageInfo } = await callDatoCMSGraphQLAPI(datoCMSSinglePageFeed(pageName, hasSlug),
        hasSlug ? {
            variables: {
                slug
            }, preview
        } : { preview });
    // console.log("allPages",pageInfo,{pageName, slug, hasSlug})
    if (Array.isArray(pageInfo) && pageInfo.length >= 1) {
        return {
            title: pageInfo[0].title,
            id: `https://barberhouse.vn${getURLForModelApiKey({
                _modelApiKey: pageInfo[0]._modelApiKey,
                links: pageInfo[0].link
            })}`,
            link: `https://barberhouse.vn${getURLForModelApiKey({
                _modelApiKey: pageInfo[0]._modelApiKey,
                links: pageInfo[0].link
            })}`,
            description: pageInfo[0].seoInfo.description,
            // content: (Array.isArray( pageInfo[0].content) &&  pageInfo[0].content.length >= 1) ?  pageInfo[0].content.reduce(
            //     (accumulator, currentValue) => accumulator + currentValue.content, "") :  pageInfo[0].content,
            updated: new Date(pageInfo[0].date),
            image: pageInfo[0].seoInfo.image?.url
        }
    }
    return {
        title: pageInfo.title,
        id: `https://barberhouse.vn${getURLForModelApiKey({
            _modelApiKey: pageInfo._modelApiKey,
            links: pageInfo.link
        })}`,
        link: `https://barberhouse.vn${getURLForModelApiKey({
            _modelApiKey: pageInfo._modelApiKey,
            links: pageInfo.link
        })}`,
        description: pageInfo.seoInfo.description,
        // content: (Array.isArray(pageInfo.content) && pageInfo.content.length >= 1) ? pageInfo.content.reduce(
        //     (accumulator, currentValue) => accumulator + currentValue.content, "") : pageInfo.content,
        updated: new Date(pageInfo.date),
        image: pageInfo.seoInfo.image?.url
    }
    // console.log("allPageInfoFeed", allPageInfoFeed)
    // return allPageInfoFeed
}

export async function getPageRedirectsInfo(preview = false, pageName, slug, hasSlug) {
    const { pageInfo } = await callDatoCMSGraphQLAPI(datoCMSGetPageRedirectInfo(pageName, hasSlug),
        hasSlug ? {
            variables: {
                slug
            }, preview
        } : { preview });
    return {
        redirectInfo: checkArrNotEmpty(pageInfo) ? {
            ...pageInfo[0].redirect[0]
        } : {
                ...pageInfo.redirect[0]

            }
    }
}

export async function getRedirectInfos(preview = false) {
    const { redirectInfo } = await callDatoCMSGraphQLAPI(datoCMSRedirectQuery, { preview });
    if (checkArrNotEmpty(redirectInfo)) {
        // console.log("before filter",...redirectInfo)
        // filter array to find if we are redirects to a page that already need to redirect to another pages
        redirectInfo = redirectInfo.filter(
            // if id of a redirect item found in "source" of another redirect items then we eliminate it. 
            // to avoid too many redirects
            ({ destination }) => !redirectInfo.find(
                ({ source }) => source.id === destination.id)
        );
    }
}

export async function getHomepageData(preview) {
    const { homePage } = await callDatoCMSGraphQLAPI(datoCMSHomepageQuery, { preview });
    // console.log("homePage",homePage)
    const { shortDescription,
        pageTitle,
        testimonial,
        relatedBlog,
        productList,
        customScripts,
        categoryList,
        schema,
        ...rest } = homePage

    // console.log(shortDescription);
    const ParsedSchema = parseCMSSchema(schema);
    // console.log("ParsedSchema.article",ParsedSchema.article)
    let categoryListArray = [];
    if (categoryList && categoryList.length > 3) {
        const chunkedArray = chunkArray(categoryList, 3);
        categoryListArray.push(chunkedArray)
    } else if (categoryList) {
        categoryListArray.push(...categoryList)
    }
    // console.log(categoryListArray)
    let testimonialParsedArray = [];
    for (const testi of testimonial) {
        const { name, content, ...otherInfo } = testi;
        const testimonialObj = {
            name: await ParseCMSContent({ cmsData: name, wrapperTag: "div", className: "name" }),
            content: await ParseCMSContent({ cmsData: content, wrapperTag: "div", className: "dsc" })
            , ...otherInfo
        }
        testimonialParsedArray.push(testimonialObj)
    }
    let RelatedBlog = []
    for (const blog of relatedBlog) {
        const blogUpdateDate = new Date(blog.updatedAt).toLocaleDateString('en-GB');
        const blogPublishedDate = new Date(blog._publishedAt).toLocaleDateString('en-GB');
        const blogDateTime = blogUpdateDate > blogPublishedDate ? blogUpdateDate : blogPublishedDate
        const { shortDescription, ...otherInfo } = blog;
        const blogOBJ = {
            shortDescription: await ParseCMSContent({ cmsData: shortDescription, wrapperTag: "div", className: "name" }),
            ...otherInfo,
            blogDateTime
        }
        // console.log(blogOBJ)
        RelatedBlog.push(blogOBJ)
    }
    const homePageData = {
        ...rest,
        pageTitle: await ParseCMSContent({ cmsData: pageTitle, wrapperTag: "h1", className: "tt-1 text-center" }),
        shortDescription: await ParseCMSContent({ cmsData: shortDescription, wrapperTag: "h2", className: "text-center mt10" }),
        testimonial: testimonialParsedArray,
        relatedBlog: RelatedBlog,
        productList: productList,
        schema: ParsedSchema,
        categoryList: categoryListArray,
        customScripts: parseCMSCustomScripts(customScripts)
    };
    // const test= {...rest};
    // const homePageDatatest  =Object.keys(homePageData).map((key) => [key]=homePageData[key]);


    // console.log(ParsedSchema)

    return { homePageData }
}

export async function getAllBlogPath(preview) {
    const { allBlogs } = await callDatoCMSGraphQLAPI(datoCMSBlogPathQuery, { preview });
    // allBlogs= allBlogs.map(element => {
    //     return 
    // });
    return allBlogs
}

export async function getAllServicePath(preview) {
    const { allServices } = await callDatoCMSGraphQLAPI(datoCMSServicePathQuery, { preview });
    // allBlogs= allBlogs.map(element => {
    //     return 
    // });
    return allServices
}


export async function getBlogInfoBySlug(preview, slug) {
    // console.log("Slug to get", slug)
    const { blog } = await callDatoCMSGraphQLAPI(datoCMSSingleBlogQuery, {
        variables: {
            slug
        }, preview
    });
    if (!blog) {
        return false;
    }
    const { blogBody, pageTitle, contactForm, updatedAt, _publishedAt, tags, schema, customScripts, ...otherinfo } = blog;
    const ParsedSchema = parseCMSSchema(schema);

    // console.log("tags",tags)
    let parsedcontactForm = {};
    if (Array.isArray(contactForm) && contactForm.length > 0) {
        parsedcontactForm = convertArrayToObject(contactForm, "_modelApiKey")
    }
    const TagList = tags.split(',');
    //console.log("TagList", TagList)
    let relativeBlog = await getRelativeBlogByTag(preview, TagList);
    // only take the others one not the one user seeing
    // relativeBlog = relativeBlog.filter(blog => blog.seoLinks !== slug);

    // console.log("relativeBlog",relativeBlog);
    const blogContent = [];
    for (const bodyContent of blogBody) {
        blogContent.push({
            id: bodyContent.id,
            videoLink: bodyContent?.videoLink,
            map: bodyContent?.map,
            // title: await ParseCMSContent({ cmsData: bodyContent.title, className: "tt-1", wrapperTag: "h1" }),
            content: await ParseCMSBlogContent({
                cmsData: bodyContent.content,
                tagClssArray: {
                    h1: "text-4xl",
                    h2: "text-3xl",
                    h3: "text-2xl ",
                    table: "table-auto",
                    img: "lazyload w-full"
                }
            }),
        })
    }
    const blogUpdateDate = new Date(updatedAt).toLocaleDateString('en-GB');
    const blogPublishedDate = new Date(_publishedAt).toLocaleDateString('en-GB');
    const blogDateTime = blogUpdateDate > blogPublishedDate ? blogUpdateDate : blogPublishedDate
    return {
        ...otherinfo,
        pageTitle: await ParseCMSContent({ cmsData: pageTitle, className: "tt-1", wrapperTag: "h1" }),
        blogBody: blogContent,
        relativeBlog,
        schema: ParsedSchema,
        contactForm: parsedcontactForm,
        tags: TagList,
        customScripts: parseCMSCustomScripts(customScripts),
        blogDateTime
    }
}

export async function getServiceInfoBySlug(preview, slug) {
    // console.log("Slug to get", slug)
    const { service } = await callDatoCMSGraphQLAPI(datoCMSSingleServiceQuery, {
        variables: {
            slug
        }, preview
    });
    if (!service) {
        return false;
    }
    const { blogBody, pageTitle, customScripts, contactForm, updatedAt, _publishedAt, tags, schema, ...otherinfo } = service;
    const ParsedSchema = parseCMSSchema(schema);

    // console.log("tags",tags)
    let parsedcontactForm = {};
    if (Array.isArray(contactForm) && contactForm.length > 0) {
        parsedcontactForm = convertArrayToObject(contactForm, "_modelApiKey")
    }
    const TagList = tags.split(',');
    //console.log("TagList", TagList)
    let relativeBlog = await getRelativeBlogByTag(preview, TagList);
    // only take the others one not the one user seeing
    // relativeBlog = relativeBlog.filter(blog => blog.seoLinks !== slug);

    // console.log("relativeBlog",relativeBlog);
    const blogContent = [];
    for (const bodyContent of blogBody) {
        blogContent.push({
            id: bodyContent.id,
            videoLink: bodyContent?.videoLink,
            map: bodyContent?.map,
            // title: await ParseCMSContent({ cmsData: bodyContent.title, className: "tt-1", wrapperTag: "h1" }),
            content: await ParseCMSBlogContent({
                cmsData: bodyContent.content,
                tagClssArray: {
                    h1: "text-4xl",
                    h2: "text-3xl",
                    h3: "text-2xl ",
                    table: "table-auto",
                    img: "lazyload"
                }
            }),
        })
    }
    const blogUpdateDate = new Date(updatedAt).toLocaleDateString('en-GB');
    const blogPublishedDate = new Date(_publishedAt).toLocaleDateString('en-GB');
    const blogDateTime = blogUpdateDate > blogPublishedDate ? blogUpdateDate : blogPublishedDate
    return {
        ...otherinfo,
        customScripts: parseCMSCustomScripts(customScripts),
        pageTitle: await ParseCMSContent({ cmsData: pageTitle, className: "tt-1", wrapperTag: "h1" }),
        blogBody: blogContent,
        relativeBlog,
        schema: ParsedSchema,
        contactForm: parsedcontactForm,
        tags: TagList,
        blogDateTime
    }
}

export async function getAllBlogBasicInfo(preview, paginationData) {
    if (paginationData) {
        const { allBlogs } = await callDatoCMSGraphQLAPI(datoCMSAllBlogBasicInfo, { preview });
        return {
            AllBlogBasicInfo: allBlogs
        };
    }
    const { allBlogs } = await callDatoCMSGraphQLAPI(datoCMSAllBlogBasicInfo, { preview });
    return {
        AllBlogBasicInfo: allBlogs
    };
}

export async function getRelativeBlogByTag(preview, TagArray) {
    const result = [];
    // const { FoundArticle } = await getPageListByTag(preview,TagArray);
    for (const tag of TagArray) {
        if (tag && tag !== '') {
            let { FoundArticle } = await getPageListByTag(preview, tag);
            FoundArticle = FoundArticle.filter(function (item) {
                return result.filter(function (item2) {
                    return item.id === item2.id;
                }).length === 0;
            });

            result.push(...FoundArticle)
        }
    }
    // if (Array.isArray(TagArray) && TagArray.length > 0) {
    //     TagArray.forEach(lookupTag => {
    //         if (lookupTag !== '') {
    //             const relativeBlog = AllBlogBasicInfo.find(blogInfo => blogInfo.tags.includes(lookupTag));
    //             if (relativeBlog) {
    //                 const alreadyAdd = result.some(blogInfo => blogInfo.id === relativeBlog.id);
    //                 if (!alreadyAdd) {
    //                     const blogUpdateDate = new Date(relativeBlog.updatedAt).toLocaleDateString('en-GB');
    //                     const blogPublishedDate = new Date(relativeBlog._publishedAt).toLocaleDateString('en-GB');
    //                     const blogDateTime = blogUpdateDate > blogPublishedDate ? blogUpdateDate : blogPublishedDate
    //                     relativeBlog.blogDateTime = blogDateTime;
    //                     console.log("relativeBlog",relativeBlog);
    //                     result.push(relativeBlog);
    //                 }
    //             }
    //         }
    //     });
    // }
    // console.log("result",result);
    return result
}

export async function getCategoryInfo(preview, categorySlug) {
    const { categoryPage } = await callDatoCMSGraphQLAPI(datoCMSCategoryPageQuery, {
        variables: {
            categorySlug
        }, preview
    });
    if (!categoryPage) {
        return false;
    }
    const { categoryDescription, schema, customScripts, ...otherInfo
    } = categoryPage || {};
    //  console.log("categoryDescription",categoryDescription);
    const ParsedSchema = parseCMSSchema(schema);
    let parsedDescirptionArray = [];

    if (categoryDescription && checkArrNotEmpty(categoryDescription)) {


        for (const description of categoryDescription) {
            //  console.log("description",description)
            let parsedDescription = await ParseCMSContent({ cmsData: description.content })
            parsedDescirptionArray.push({
                id: description.id,
                content: parsedDescription
            })
        }
    }
    return {
        categoryPage: {
            ...otherInfo,
            customScripts: parseCMSCustomScripts(customScripts),
            categoryDescription: parsedDescirptionArray,
            schema: ParsedSchema
        }
    }
}

export async function getAllCategoryPath(preview) {
    const { allCategoryPages } = await callDatoCMSGraphQLAPI(datoCMSCategoryPathQuery, { preview });
    //console.log("allCategoryPages",allCategoryPages)
    return {
        allCategoryPath: allCategoryPages
    }
}

export async function getCategoryPageData(preview) {
    const { categoryListPage } = await callDatoCMSGraphQLAPI(datoCMSCategoryListPageQuery, { preview })
    // console.log("categoryListPage",categoryListPage);
    const { pageDescription, pageTitle, seotag, schema, customScripts, ...otherInfo } = categoryListPage
    const ParsedSchema = parseCMSSchema(schema);

    return {
        categoryListPage: {
            ...otherInfo,
            schema: ParsedSchema,
            pageTitle: await ParseCMSContent({ cmsData: pageTitle, className: "tt-1", wrapperTag: "h1" }),
            pageDescription: await ParseCMSContent({ cmsData: pageDescription }),
            customScripts: parseCMSCustomScripts(customScripts),
            seoTag: seotag
        }
    }
}

export async function getPageListByTag(preview, TagList) {
    const result = [];
    const { allBlogs, allProducts, allCategoryPages } = await callDatoCMSGraphQLAPI(datoCMSGetPageListByTagQuery, {
        variables: {
            TagList
        }, preview
    });
    //console.log("allBlogs", allBlogs)
    // console.log("\n allProducts", allProducts)
    // console.log("\n allCategoryPages", allCategoryPages);
    // const { categoryGallery, ...otherInfo } = allCategoryPages;
    if (Array.isArray(allBlogs) && allBlogs.length > 0) {
        result.push(
            ...allBlogs.map(blogInfo => {
                return {
                    id: blogInfo.id,
                    title: blogInfo.pageTitle,
                    HeaderImage: blogInfo.headerImage || null,
                    updatedDate: new Date(blogInfo.updatedAt).toLocaleDateString('en-GB'),
                    linkTo: {
                        _modelApiKey: blogInfo._modelApiKey,
                        links: blogInfo.seoLinks
                    }
                }
            })
        )
    }
    if (Array.isArray(allProducts) && allProducts.length > 0) {
        result.push(
            ...allProducts.map(productInfo => {
                return {
                    id: productInfo.id,
                    title: productInfo.productName,
                    HeaderImage: productInfo.headerImage || null,
                    updatedDate: new Date(productInfo.updatedAt).toLocaleDateString('en-GB'),
                    linkTo: {
                        _modelApiKey: productInfo._modelApiKey,
                        links: productInfo.seoLinks
                    }
                }
            })
        )
    }
    if (Array.isArray(allCategoryPages) && allCategoryPages.length > 0) {
        result.push(
            ...allCategoryPages.map(categoryInfo => {
                return {
                    id: categoryInfo.id,
                    title: categoryInfo.categoryName,
                    updatedDate: new Date(categoryInfo.updatedAt).toLocaleDateString('en-GB'),
                    HeaderImage: categoryInfo.categoryGallery[Math.floor(Math.random() * categoryInfo.categoryGallery.length)] || null,
                    linkTo: {
                        _modelApiKey: categoryInfo._modelApiKey,
                        links: categoryInfo.seoLink
                    }
                }
            })
        )
    }
    return {
        FoundArticle: result
    }
}

export async function getPageListByTag_withPag(preview, TagList, first = 2, skip = 0) {
    const result = [];
    const { allBlogs, allProducts, allCategoryPages } = await callDatoCMSGraphQLAPI(datoCMSGetPageListByTagQuery_withPag, {
        variables: {
            TagList, first, skip
        }, preview
    });
    //console.log("allBlogs", allBlogs)
    // console.log("\n allProducts", allProducts)
    // console.log("\n allCategoryPages", allCategoryPages);
    // const { categoryGallery, ...otherInfo } = allCategoryPages;
    if (Array.isArray(allBlogs) && allBlogs.length > 0) {
        result.push(
            ...allBlogs.map(blogInfo => {
                return {
                    id: blogInfo.id,
                    title: blogInfo.pageTitle,
                    HeaderImage: blogInfo.headerImage || null,
                    updatedDate: new Date(blogInfo.updatedAt).toLocaleDateString('en-GB'),
                    linkTo: {
                        _modelApiKey: blogInfo._modelApiKey,
                        links: blogInfo.seoLinks
                    }
                }
            })
        )
    }
    if (Array.isArray(allProducts) && allProducts.length > 0) {
        result.push(
            ...allProducts.map(productInfo => {
                return {
                    id: productInfo.id,
                    title: productInfo.productName,
                    HeaderImage: productInfo.headerImage || null,
                    updatedDate: new Date(productInfo.updatedAt).toLocaleDateString('en-GB'),
                    linkTo: {
                        _modelApiKey: productInfo._modelApiKey,
                        links: productInfo.seoLinks
                    }
                }
            })
        )
    }
    if (Array.isArray(allCategoryPages) && allCategoryPages.length > 0) {
        result.push(
            ...allCategoryPages.map(categoryInfo => {
                return {
                    id: categoryInfo.id,
                    title: categoryInfo.categoryName,
                    updatedDate: new Date(categoryInfo.updatedAt).toLocaleDateString('en-GB'),
                    HeaderImage: categoryInfo.categoryGallery[Math.floor(Math.random() * categoryInfo.categoryGallery.length)] || null,
                    linkTo: {
                        _modelApiKey: categoryInfo._modelApiKey,
                        links: categoryInfo.seoLink
                    }
                }
            })
        )
    }
    return {
        FoundArticle: result
    }
}

export async function getBlogPageInfo(preview) {
    const { blogPage } = await callDatoCMSGraphQLAPI(datoCMSGetBlogPageInfoQuery, { preview });
    const { pageDescription, blogList, schema, customScripts, ...otherInfo } = blogPage;
    const description = await ParseCMSContent({ cmsData: pageDescription });
    const ParsedSchema = parseCMSSchema(schema);

    const updatedBlogList = [];
    for (const blog of blogList) {
        const { updatedAt, ...otherbloginfo } = blog;
        const updatedDate = new Date(updatedAt).toLocaleDateString('en-GB');
        updatedBlogList.push({
            updatedAt: updatedDate,
            ...otherbloginfo
        })
    }
    return {
        blogPage: {
            schema: ParsedSchema,
            customScripts: parseCMSCustomScripts(customScripts),
            pageDescription: description,
            blogList: updatedBlogList,
            ...otherInfo
        }
    }
}
export async function getServicePageInfo(preview) {
    const { servicePage } = await callDatoCMSGraphQLAPI(datoCMSGetServicesPageInfoQuery, { preview });
    const { pageDescription, blogList, schema, customScripts, ...otherInfo } = servicePage;
    const description = await ParseCMSContent({ cmsData: pageDescription });
    const ParsedSchema = parseCMSSchema(schema);
    // const filterList = new Set();
    const selectOptions = [];
    // const filterValueList = new Set();
    const updatedBlogList = [];
    for (const blog of blogList) {
        const { updatedAt, location, ...otherbloginfo } = blog;
        for (const key in location) {
            if (location.hasOwnProperty(key)) {
                const opt = selectOptions.find(el => el.Name === key.toLocaleUpperCase());
                if (!opt) {
                    selectOptions.push({
                        Name: key.toLocaleUpperCase(),
                        selectObj: [{
                            value: location[key],
                            label: location[key]
                        }]
                    });
                } else {
                    const slectInddex = opt.selectObj.findIndex(el => el.value === location[key]);
                    if (slectInddex === -1) {
                        opt.selectObj.push({
                            value: location[key],
                            label: location[key]
                        })
                    }
                    selectOptions.forEach((element, index) => {
                        if (element.Name === opt.Name) {
                            selectOptions[index] = opt;
                        }
                    });
                }
            }
        }
        const updatedDate = new Date(updatedAt).toLocaleDateString('en-GB');
        updatedBlogList.push({
            updatedAt: updatedDate,
            location: location,
            ...otherbloginfo
        })
    }
    return {
        servicePage: {
            customScripts: parseCMSCustomScripts(customScripts),
            schema: ParsedSchema,
            pageDescription: description,
            blogList: updatedBlogList,
            selectOptions,
            ...otherInfo
        }
    }
}
export async function getProductPath(preview = false) {
    const { productPath } = await callDatoCMSGraphQLAPI(datoCMSProductPathQuery, { preview });
    // console.log("productPath",productPath)
    return { productPath };
}

export async function getProductinfo(preview, slug) {
    const { productInfo } = await callDatoCMSGraphQLAPI(datoCMSProductInfoQuery, {
        variables: {
            slug
        },
        preview
    });
    const { shortDescription, schema, tags, contactDetail, price, productInfoDetail, customScripts, ...otherInfo } = productInfo;
    let localPrice = null;
    if (price) {
        localPrice = formatter.format(price)
    }

    const ParsedSchema = parseCMSSchema(schema, true, otherInfo);

    const contactDetailArray = []
    const productInfoArray = []
    const relatedProductInfoArray = []
    if (Array.isArray(contactDetail) && contactDetail.length > 0) {
        for (const contact of contactDetail) {
            contactDetailArray.push({
                id: contact.id,
                infoDetail: await ParseCMSContent({ cmsData: contact.infoDetail })
            })
        }
    }
    if (Array.isArray(productInfoDetail) && productInfoDetail.length > 0) {
        for (const productInfo of productInfoDetail) {
            productInfoArray.push({
                id: productInfo.id,
                // title: productInfo.title,
                map: productInfo?.map,
                videoLink: productInfo?.videoLink,
                content: await ParseCMSBlogContent({
                    cmsData: productInfo.content,
                    tagClssArray: {
                        h1: "text-4xl text-teal-300 text-center",
                        h2: "text-3xl text-teal-300 text-center",
                        h3: "text-2xl text-teal-300",
                        table: "table-auto mb-2 break-words mx-auto",
                        img: "lazyload mx-auto ",
                        td: "border break-words"
                    }
                })
            })
        }
    }
    const tagArray = tags.split(",");
    if (tags && tags !== "") {
        if (Array.isArray(tagArray) && tagArray.length > 0) {
            for (let tag of tagArray) {
                if (relatedProductInfoArray.length < 3) {
                    tag = tag.trim();
                    let { relatedProductInfo } = await getRelatedProductInfo(preview, tag);
                    if (Array.isArray(relatedProductInfo) && relatedProductInfo.length > 0) {
                        relatedProductInfo = relatedProductInfo.filter(function (item) {
                            return (item.seoLinks !== productInfo.seoLinks) && relatedProductInfoArray.filter(function (item2) {
                                return item.id === item2.id;
                            }).length === 0;
                        });
                        relatedProductInfoArray.push(...relatedProductInfo)
                    }
                } else {
                    break;
                }
            }
        }
    }

    // console.log("productInfo",productInfo)

    return {
        productInfo: {
            shortDescription: (shortDescription && shortDescription !== '') ? await ParseCMSContent({ cmsData: shortDescription }) : null,
            contactDetail: contactDetailArray,
            productInfoDetail: productInfoArray,
            tags,
            tagArray,
            customScripts: parseCMSCustomScripts(customScripts),
            relatedProductInfo: relatedProductInfoArray,
            localPrice,
            schema: ParsedSchema,
            ...otherInfo
        }
    }
}

export async function getRelatedProductInfo(preview, tag) {
    const { relatedProductInfo } = await callDatoCMSGraphQLAPI(datoCMSRelatedProductQuery, {
        variables: {
            tag
        }, preview
    });
    return { relatedProductInfo }
}
