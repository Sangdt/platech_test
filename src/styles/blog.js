import css from 'styled-jsx/css'
export default css.global`

ol {
    margin-top: 0;
    margin-bottom: 10px
}

ol ol {
    margin-bottom: 0
}

th {
    text-align: left
}

img {
    vertical-align: middle
}

.mt10 {
    margin-top: 10px
}

.mt20 {
    margin-top: 20px
}

a {
    color: #fff;
    text-decoration: none;
    transition: 200ms ease-in-out
}

a:hover {
    text-decoration: underline
}

a:focus, a:active {
    text-decoration: none
}

.tt-1 {
    font-size: 48px;
    font-weight: 600;
    line-height: 1.2em;
    text-transform: uppercase
}

@media (max-width: 1024px) {
    .tt-1 {
        font-size: 36px
    }
}

@media (max-width: 768px) {
    .tt-1 {
        font-size: 24px
    }
}

.tt-3 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.2em
}

@media (max-width: 1024px) {
    .tt-3 {
        font-size: 20px
    }
}

@media (max-width: 768px) {
    .tt-3 {
        font-size: 16px
    }
}

.pt50 {
    padding-top: 50px
}

.pt100 {
    padding-top: 100px
}

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

.load-more.lm-1 {
    background: #333
}

.breadcrumb {
    background: none
}

.wrap-main {
    width: 100%;
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px
}

.wrap-content ol, ul {
    list-style: initial;
}

content {
    display: block;
    position: relative
}

.box-top {
    @apply bg-gray-50
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

.box-top .breadcrumb {
    padding: 20px 0;
    border-bottom: 1px solid #333;
    font-size: 12px;
    margin-bottom: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    -spec-border-radius: 0;
    border-radius: 0
}

.box-top .breadcrumb a {
    color: #999
}

.box-top .breadcrumb>.active {
    color: #fff
}

.box-top .breadcrumb>li+li:before {
    content: ">";
    color: #999
}

.box-top .box-text {
    width: 100%;
    max-width: 986px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    font-size: 16px;
    padding-top: 100px;
    padding-bottom: 100px;
    text-align: left
}

@media (max-width: 768px) {
    .box-top .box-text {
        padding-left: 20px;
        padding-right: 20px
    }
}

.box-top .box-text .tt-1 {
    text-align: center
}

.other-news .item-news .img img {
    width: 100%
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