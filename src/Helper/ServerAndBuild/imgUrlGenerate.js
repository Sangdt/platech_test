import { client } from "./sanityClient";

import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export default function imgUrlGenerate(source) {
    return builder.image(source)
}
