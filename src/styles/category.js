import css from 'styled-jsx/css'
export default css.global`


.load-more {
    display: block;
    background: #000;
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    padding: 17px 15px 18px;
    text-transform: uppercase
}

content {
    display: block;
    position: relative
}

.ic-search-arrow {
    display: inline-block;
    width: 30px;
    height: 6px;
    background-color: #000;
    -webkit-mask-image: url(/images/icon/ic_search_arrow.svg);
    mask-image: url(/images/icon/ic_search_arrow.svg)
}


.listRow .item-product {
    border-bottom: 1px solid #D8D8D8;
    padding-top: 40px;
    padding-bottom: 40px
}

.group-product {
    background-color: #000
}

.bg-white {
    background-color: #fff
}

@media (max-width: 768px) {
    .wrap-main {
        padding-left: 20px;
        padding-right: 20px
    }
}


`