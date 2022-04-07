import css from 'styled-jsx/css'
export default css.global`
body{
    overflow-x: unset !important;
}
.blog-content a[href], .blog-content ul li a[href] {
    color: #2bb06c;
    background-color: transparent;
    text-decoration: none;
}
.blog-content a[href]:hover {
    color: pink;
    background-color: transparent;
    text-decoration: underline;
}
.pt50 {
    padding-top: 50px
}
.pt100 {
    padding-top: 100px
}
.wrap-main {
    width: 100%;
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px
}
content {
    display: block;
    position: relative
}
.box-top {
    background: #111
}
.box-top .wrap-main {
    position: relative
}
.box-top .wrap-main:before {
    content: "";
    width: calc(100% - 100px);
    height: 0px;
    /* border-bottom: 1px solid #333; */
    position: absolute;
    bottom: 0;
    left: 50px
}
@media (max-width: 1024px) {
    .box-top .wrap-main:before {
        width: calc(100% - 40px);
        left: 20px
    }
}
.other-news .item-news .img img {
    width: 100%
}

.wrap-content-detail {
    border-bottom: 1px solid #D0D0D0
}



.wrap-content-detail img {
    max-width: 100%
}

.wrap-content-detail .tt-1 {
    padding-bottom: 20px;
    text-transform: none
}

.list-tag {
    margin-top: 40px
}

.item-news .tt-3 {
    font-weight: 500
}

@media (max-width: 768px) {
    .wrap-main {
        padding-left: 20px;
        padding-right: 20px
    }
}

`