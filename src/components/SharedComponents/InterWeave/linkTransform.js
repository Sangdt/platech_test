import Link from 'next/link';
import LazyLoadingIframe from './LazyLoadingIframe';

export function transform(node, children) {
    const mainUrlRegex = /(https?:)?(\/\/)?(www\.)?barberhouse.vn\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    if (node.tagName.toLowerCase() === 'a' && mainUrlRegex.test(node.getAttribute('href'))) {
        let urlInfo = new URL(node.getAttribute('href'));
        return <Link href={urlInfo.pathname}><a>{children}</a></Link>;
    }
    // console.log("iframe ?",node.tagName === 'iframe',node.tagName)

    if (node.tagName.toLowerCase() === 'iframe') {
        // console.log("iframe nodes", node, children)
        return (<LazyLoadingIframe >
            <iframe src={node.getAttribute("src")} className={node.getAttribute("class")}></iframe>
        </LazyLoadingIframe>)
    }
}
