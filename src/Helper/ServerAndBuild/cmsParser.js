import {rehype} from 'rehype';
import addClasses from 'rehype-add-classes';
import merge from 'deepmerge'
import {defaultSchema as gh} from 'hast-util-sanitize'
import rehypeWrap from 'rehype-wrap';
import sanitize from 'rehype-sanitize'
import * as slug from 'rehype-slug'

import appendStyletoNode from "Helper/PaserUtil/hash-until-append-style";
import appendAttributetoNode from "Helper/PaserUtil/hash-until-append-attr";
import transformSrcAttrImg from "Helper/PaserUtil/transformSrcAttrImg";

var schema = merge(gh, {
    attributes: {
        "*": ["className", "style"],
        "li": ["className", "style"],
        table: ["className", "style"],
        td: ["className", "style"],
        tr: ["className", "style"],
        img: ["class","className", "data*", "alt", "title", "id", "width", "height"],
        iframe: ["style", "src", "class", "className", "height", "width"],
    },
    tagNames: [
        "iframe"
    ],
    "clobberPrefix": ""
});
var cleanClassNameschema = merge(gh, {
    attributes: {
        "*": ["style"],
        "li": ["style"],
        table: ["style"],
        td: ["style"],
        tr: ["style"],
        img: ["class","className", "data*", "alt", "title", "id", "width", "height"],
        iframe: ["class", "className", "src", "height", "width"],
    },
    tagNames: [
        "iframe"
    ],
    "clobberPrefix": ""
})
export async function ParseCMSBlogContent({ cmsData, tagClssArray }) {
    // console.log("cmsData", cmsData)
    const CmsHTML = await CleanClassName(cmsData);
    // console.log("CmsHTML", CmsHTML.toString())
    const processor = rehype()
        .data('settings', { fragment: true })
        .use(addClasses, {
            ...tagClssArray
        })
        // .use(appendAttributetoNode, {
        //     img: {
        //         attrName: "data-sizes",
        //         attrValue: "auto"
        //     },
        // })
        // .use(transformSrcAttrImg)
        .use(slug)
        .use(sanitize, schema)
    const result = await processor.process(CmsHTML);
    // console.log("\nresult\n", result.toString())
    return result.toString();
}

export async function ParseCMSContent({ cmsData, wrapperTag, pecificColor = "#ffffff", className }) {
    const CmsHTML = await CleanClassName(cmsData)
    let titleStyleString = (!pecificColor && pecificColor === "#ffffff") ? '' : `color:${pecificColor}`;
    if (!wrapperTag) {
        wrapperTag = "span"
    }
    const processor = rehype()
        .data('settings', { fragment: true })
        .use(rehypeWrap, { wrapper: `${wrapperTag}.${className}` })
        // .use(addClasses, {
        //     pre: className,
        //     'h1,h2,h3': className,
        //     h1: className,
        //     h2: className,
        //     p: className
        // })
        .use(appendStyletoNode, {
            p: titleStyleString,
            h1: titleStyleString
        })
        .use(slug)
        .use(sanitize, schema)
    const result = await processor.process(CmsHTML);
    return result.toString();
}


/**
 * Clean HTML from CMS first cause it will have some class name if they were coppy from a website
 * @param {String} stringtoClean html string from CMS
 */
async function CleanClassName(stringtoClean) {
    // console.log("")
    const cleanClassname = rehype()
        .data('settings', { fragment: true })
        .use(sanitize, cleanClassNameschema);
    return await cleanClassname.process(stringtoClean);
}