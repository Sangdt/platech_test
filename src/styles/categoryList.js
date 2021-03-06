import css from 'styled-jsx/css'
export default css.global`

.clearfix:before, .clearfix:after {
    content: " ";
    display: table
}
.react-multi-carousel-list {
    overflow: unset !important;
}
.clearfix:after {
    clear: both
}
.swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    z-index: 1
}

.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box
}

.swiper-wrapper {
   
    transform: translate3d(0px, 0, 0)
}

.swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative
}

.swiper-pagination {
    position: absolute;
    text-align: center;
    transition: 300ms;
    z-index: 10
}

.clearfix:before, .clearfix:after {
    content: " ";
    display: table
}

.clearfix:after {
    clear: both
}


.item-product img {
    width: 100%
}

.top-product {
    width: 100%;
    position: relative
}

.top-product span {
    display: inline-block;
    padding-right: 10px;
    position: relative;
    z-index: 5;
    padding-bottom: 15px;

}

.top-product .tt-2 {
    color: #333333
}

.top-product a {
    display: inline-block;
    position: absolute;
    z-index: 5;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    padding-left: 10px;
}

.top-product:before {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    top: 60%;
    left: 0;
    background: #D3D2D2
}

.filter {
    padding-top: 20px
}

.filter a {
    display: inline-block;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    color: #666;
    margin-right: 40px
}

.filter .mb {
    display: none
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



.group-product .link {
    color: #333333
}

/* .bg-white {
    background-color: rgb(0, 0, 0)
} */



`