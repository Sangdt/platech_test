export default function ({ url: iframeString = null }) {
    //example :<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2294944135097!2d106.63746051526037!3d10.79372726182453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b6ba7de7edb4d%3A0xae009aaddd129e1c!2sBarber%20House!5e0!3m2!1svi!2s!4v1619178070233!5m2!1svi!2s"
    //  width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    // var test = document.getElementById("iframe_url").value;
    // console.log("iframeString", iframeString)
    if (iframeString) {
        let url = getProps("src", iframeString)
        let width = getProps("width", iframeString)
        let height = getProps("height", iframeString)
        // let style = getProps("style", iframeString)
        let allowfullscreen = getProps("allowfullscreen", iframeString)
        // console.log({
        //     url  , width, height, style, allowfullscreen
        // })
        return {
            src: url,
            width,
            height,
            // style,
            allowfullscreen
        }
    }
    return null

}
function getProps(propsName, iframeString) {
    let match = iframeString.split(`${propsName}=`)[1] ?? null
    if (match) {
        return match.split(/[ >]/)[0].replace(/['"]+/g, '')
    }
    return null
}