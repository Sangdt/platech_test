module.exports= ({ _modelApiKey, links }) => {
    switch (_modelApiKey) {
        case "blog":
            return `/blog/${links}`
        case "product":
            return `/chi-tiet-san-pham/${links}`
        case "category_page":
            return `/danh-muc-san-pham/${links}`
        case "category_list_page":
            return "/danh-muc-san-pham/"
        case "blog_page":
            return "/blog"
        case "service_page":
            return "/dich-vu"
        default:
            return links
    }
}
