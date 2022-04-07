async function getPixelCode() {
    const ReactPixel = await import(
        /* webpackChunkName: "FB_pixel" */
        /* webpackMode: "lazy" */
        'react-facebook-pixel'
    ).then(m => m.default);
    ReactPixel.init('3064238080326420');
    return ReactPixel
    // window.ReactPixel=ReactPixel;
    // return ReactPixel;
}

export default async function pageview() {
    const ReactPixel = await getPixelCode();
    ReactPixel.pageView(); // For tracking page view
}

export async function pixelPageTrack(url) {
    const ReactPixel = await getPixelCode();
    ReactPixel.track("ViewContent");
}

export async function pixelContactTrack(url) {
    const ReactPixel = await getPixelCode();
    ReactPixel.track("SubmitApplication");
    ReactPixel.track("Contact");
}

export async function pixelCheckoutTrack(url) {
    // !window.fbq&& await getPixelCode();
    const ReactPixel =await getPixelCode();
    ReactPixel.track("InitiateCheckout");
}
