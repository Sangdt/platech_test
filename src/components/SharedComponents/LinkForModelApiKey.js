import Link from "next/link";

// const LinkForModelApiKey = ({ _modelApiKey, children, links, prefetch = true }) => {
//     const getPrefetch = () => !prefetch ? { prefetch: false } : ""
//     if (!links) console.log("LinkForModelApiKey", { _modelApiKey, children, links, prefetch })
//     switch (_modelApiKey) {
//         case "blog":
//             return (<Link href={`/blog/${links}`}  {...getPrefetch()}>
//                 {children}
//             </Link>);
//         case "service":
//             return (<Link href={`/dich-vu/${links}`}  >
//                 {children}
//             </Link>);
//         case "product":
//             return (<Link href={`/san-pham/${links}`} {...getPrefetch()}>
//                 {children}
//             </Link>);
//         case "category_page":
//             // console.log("HIT ",_modelApiKey,links)
//             return (<Link href={`/danh-muc-san-pham/${links}`} {...getPrefetch()}>
//                 {children}
//             </Link>);
//         case "category_list_page":
//             return (<Link href="/danh-muc-san-pham/"  {...getPrefetch()}>
//                 {children}
//             </Link>);
//         case "blog_page":
//             return (<Link href="/blog"  {...getPrefetch()}>
//                 {children}
//             </Link>);
//         case "service_page":
//             return (<Link href="/dich-vu"  {...getPrefetch()}>
//                 {children}
//             </Link>);
//         default:
//             return (<Link href={links}  {...getPrefetch()}>
//                 {children}
//             </Link>);
//     }
// }


export function getURLForModelApiKey({ _modelApiKey, links }) {
    // if (!links) console.log("LinkForModelApiKey", { _modelApiKey, links, })

    switch (_modelApiKey) {
        case "blog":
            return `/blog/${links}`
        case "product":
            return `/san-pham/${links}`;
        case "category_page":
            return `/danh-muc-san-pham/${links}`;
        case "category_list_page":
            return "/danh-muc-san-pham/";
        case "blog_page":
            return "/blog";
        case "service_page":
            return "/dich-vu"
        case "service":
            return `/dich-vu/${links}`;
        default:
            return links;
    }
}


// export default LinkForModelApiKey