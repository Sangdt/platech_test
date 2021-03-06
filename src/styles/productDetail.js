import css from 'styled-jsx/css'
export default css.global`
.product-content a[href], .product-content ul li a[href] {
    color: #2bb06c;
    background-color: transparent;
    text-decoration: none;
}

.product-content a[href]:hover {
    color: pink;
    background-color: transparent; 
    text-decoration: underline;
}
.ic-search-arrow {
    display: inline-block;
    width: 30px;
    height: 6px;
    background-color: rgb(255, 255, 255);
    mask-image: url(/images/icon/ic_search_arrow.svg)
}

.item-product {
    /* width: 100%; */
    /* max-width: 650px; */
    /* margin-left: auto; */
    /* margin-right: auto; */
    position: relative;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: rgb(255, 255, 255);
    transition: 0.3s ease
}

.item-product img {
    width: 100%
}

.item-product .ic-search-arrow {
    transition: 0.3s ease
}

.item-product:hover .ic-search-arrow {
    transform: translateX(10px)
}

.wrap-swiper {
    position: relative;
    padding-left: 20px;
    padding-right: 20px
}

.wrap-swiper .swiper-slide {
    opacity: 0.4;
}

.wrap-swiper .swiper-slide-thumb-active {
    border: 1px solid rgb(120, 220, 238);
    opacity: 1
}

.wrap-swiper .swiper-button-prev, .wrap-swiper .swiper-button-next {
    width: 10px;
    height: 20px;
    background-size: 10px 20px;
    margin-top: -10px
}

.wrap-swiper .swiper-button-prev {
    left: 0px
}

.wrap-swiper .swiper-button-next {
    right: 0px
}

.listRow .item-product {
    border-bottom: 1px solid #D8D8D8;
    padding-top: 40px;
    padding-bottom: 40px
}

.swiper-slide .item-product {
    opacity: 0.4
}

.swiper-slide .item-product .full-link {
    display: none
}

.banner-parallax {
    width: 100%;
    margin-top: 100px;
    margin-bottom: 100px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 100%;
    position: relative;
    overflow: hidden
}

.banner-parallax:before {
    content: "";
    float: left;
    padding-top: 42%
}

@media (max-width: 768px) {
    .banner-parallax {
        height: 400px
    }
}

.group-detail {
    padding-top: 75px;
    color: rgb(255, 255, 255)
}

.group-detail ul {
    padding: 0;
    margin: 0;
}

.group-detail strong {
    /* font-size: 12px; */
    text-transform: uppercase
}

.group-detail .img-detail {
    position: relative
}

.group-detail .img-detail>img {
    width: 100%
}

.group-detail .img-detail #gallery_01 {
    width: 100%;
    padding-top: 30px
}

.group-detail .img-detail #gallery_01 a {
    display: block;
    border: 1px solid #D0D0D0;
    cursor: pointer
}

.group-detail .img-detail #gallery_01 a:hover {
    border: 1px solid #000
}

.group-detail .img-detail #gallery_01 a img {
    width: 100%
}

.group-detail .brand {
    font-size: 12px
}

.group-detail .brand a {
    font-weight: 600;
    color: #666;
    text-transform: uppercase
}

.group-detail .tt-2 {
    text-transform: none;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 24px
}

@media (max-width: 1024px) {
    .group-detail .tt-2 {
        font-size: 20px
    }
}

@media (max-width: 768px) {
    .group-detail .tt-2 {
        font-size: 16px
    }
}


.add-to-cart-btn {
    @apply bg-transparent text-blue-700  font-semibold py-2 px-4 border border-blue-500 rounded
}

.buy-now-btn {
    @apply bg-transparent inline-flex text-gray-800  cursor-pointer font-semibold py-2 px-4 border border-pink-500 rounded mr-2
}

.group-detail .info-detail {
    padding-top: 30px;
    padding-bottom: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-top: 1px solid #D0D0D0;
    border-bottom: 1px solid #D0D0D0
}

.group-product {
    background-color: rgb(0, 0, 0)
}

.group-product .tt-1 {
    color: rgb(255, 255, 255)
}

@media (max-width: 768px) {
    .group-detail .brand {
        padding-top: 50px
    }
}

`