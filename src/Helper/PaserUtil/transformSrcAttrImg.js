/* eslint-disable import/no-anonymous-default-export */

import { selectAll } from 'hast-util-select';

// const { selectAll } = selector;
import {
    datoCMSGetAssetMetadataQuery,
    callDatoCMSGraphQLAPI
} from 'Helper/ServerAndBuild/datoCMSContentFetcher';
import { ImageWidthSizeNum } from './ImageSize';

export default () => {
    return async node => {
        const allNodes = selectAll("img", node);
        for (let i = 0; i <= allNodes.length; i++) {
            if (allNodes[i]) {
                // console.log("allNodes", allNodes[i])
                await write(allNodes[i]);
            }
        }
    }

};

const write = async ({ properties }) => {
    //auto=format&fit=clip&lossless=true
    const { src, width, height } = properties;
    const imgURL = new URL(src);
    // console.log("search", imgURL.pathname)
    properties.src = null;
    // console.log("imgURL", imgURL)
    imgURL.searchParams.append("auto", "format,compress");
    imgURL.searchParams.append("fit", "clip");
    // imgURL.searchParams.append("lossless", "true");
    if ((width && height) && (width !== '' && height !== '')) {
        imgURL.searchParams.append("w", width);
        imgURL.searchParams.append("h", height);
    } else {
        // const largeScreen = new URL(imgURL.href);
        // const mediumScreen = new URL(imgURL.href);
        // const smallScreen = new URL(imgURL.href);
        ImageWidthSizeNum.forEach((size, index) => {
            let imgSrcURL = new URL(imgURL.href);
            imgSrcURL.searchParams.append("w", size);
            if (index === 0) properties["data-srcset"] = `${imgSrcURL.href} ${size}w `
            properties["data-srcset"] +=`,${imgSrcURL.href} ${size}w`
        });
        console.log("assetMetaData",  properties["data-srcset"]);

        // largeScreen.searchParams.append("w", 1024);
        // mediumScreen.searchParams.append("w", 640);
        // smallScreen.searchParams.append("w", 320);
        // properties["data-srcset"] = `${largeScreen.href} 1024w ,${mediumScreen.href} 640w ,${smallScreen.href} 320w  `;
    }
    // console.log("assetMetaData", assetMetaData);
    // properties["data-sizes"] = '100w';
    properties["data-src"] = imgURL.href;
    // properties["class"] ='w-full';
    // const { assetMetaData } = await getImgAltandTitle(imgURL);
    // if (assetMetaData) {
    //     for (const property in assetMetaData) {
    //         // console.log(`${property}-${assetMetaData[property]}`)
    //         properties[`${property}`] = assetMetaData[property]
    //     }
    // }
    // console.log("properties", properties)
};

const getImgAltandTitle = async ({ pathname }) => {
    const fileNameArray = pathname.split("-");
    fileNameArray.shift();
    let fileName = fileNameArray.join('-');
    const { allUploads } = await callDatoCMSGraphQLAPI(datoCMSGetAssetMetadataQuery, {
        variables: {
            fileName
        }, preview: false
    });
    const assetMetaData = allUploads[0];
    // console.log("allUploads",allUploads)
    return {
        assetMetaData
    }
}