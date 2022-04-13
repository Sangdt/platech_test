import { Image } from "react-datocms";
import Link from 'next/link';
import {
    memo,
    // useCallback, 
    // useState, 
    // useEffect,
    // useRef,
    useState
} from 'react';
// import { useEmblaCarousel } from 'embla-carousel-react'
// import Glider from 'react-glider'
// import 'glider-js/glider.min.css';
import useInView from "react-cool-inview";
import Carousel from "react-multi-carousel";
// import { useAmp } from 'next/amp'

import "react-multi-carousel/lib/styles.css";
// import Searchicons from "../../../styles/svg/icon/ic_search_arrow.svg";


const SingleItem = ({ index, productName, seoLinks, headerImage }) => {
    // const isAmp = useAmp()
    const LinkWrapper = ({ children }) => (seoLinks ? <Link href={`/san-pham/${seoLinks}`} prefetch={false}>
        <a className="full-link">{children}</a>
    </Link> : children);

    const [alreadyIn, setInview] = useState(false);

    const { observe, inView } = useInView({
        onEnter: () => setInview(true),
    });
    // if (isAmp) {
    //     return (<div className="mx-auto">
    //         <div>
    //             <amp-img
    //                 style={{ width: "66.666667%", marginLeft: "auto", marginRight: "auto" }}
    //                 // layout="flex-item"
    //                 src={headerImage.responsiveImage.src}
    //                 height={headerImage.responsiveImage.height}
    //                 width={headerImage.responsiveImage.width}
    //                 // width="1.33"
    //                 // height="1"
    //                 // sizes={headerImage.responsiveImage.sizes}
    //                 alt={headerImage.responsiveImage.alt}
    //                 title={headerImage.responsiveImage.title}
    //                 layout="responsive"
    //                 srcset={headerImage.responsiveImage.srcSet}
    //             ></amp-img>

    //         </div>
    //         {/* <Image data={headerImage.responsiveImage} /> */}
    //         <div className="mt20 productName">{productName}</div>
    //         {/* <div className="mt20">
    //             <span className="ic-search-arrow" >
    //                 <Searchicons />
    //             </span>
    //         </div> */}
    //         {seoLinks && <Link href="/san-pham/[productSlug]" as={`/san-pham/${seoLinks}`}>
    //             <a className="full-link"></a>
    //         </Link>}

    //     </div>)
    // }
    return (<div className={` w-2/3 mx-auto `} ref={observe}>
        {((index === 0 || index === 1) || (alreadyIn || inView)) && <>
            <LinkWrapper>
                <div>
                    {headerImage && <Image data={headerImage.responsiveImage} />}
                </div>
                <div className="mt20">{productName}</div>
                {/* <div className="mt20">
                <span className="ic-search-arrow" >
                    <Searchicons />
                </span>
            </div> */}
            </LinkWrapper>
        </>}
    </div>)
}


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 2,
        // partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.

    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        // partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.

    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        // partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.

    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        // partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.

    }
};
const Slider = ({ sliderID = null, productList, additionalContainerClassname, useDot = false, useArrow = false, ssr = true }) => {
    // const isAmp = useAmp()
    // if (isAmp) {
    //     return (
    //         <amp-base-carousel
    //             style={{ paddingTop: "45.1880%" }}
    //             id="productSlider-1"
    //             visible-count="2"
    //             advance-count="2"
    //             // layout="responsive"
    //             // width="1"
    //             // height="0.01"
    //             // sizes="(min-width:500px) 300px, 90%"
    //             style={{
    //                 // height:"100%",
    //                 // paddingTop:0,
    //                 overflow: "unset "
    //             }}
    //             // layout="container"
    //             width="auto"
    //             height="500"
    //             heights="(max-width:450px) 50%,0"
    //             layout="fixed-height"
    //             // layout="flex-item"
    //             // type="slides"
    //             // loop=""
    //             role="region"
    //             aria-label="Basic carousel"
    //             data-next-button-aria-label="Go to next slide"
    //             data-previous-button-aria-label="Go to previous slide"
    //         >
    //             {productList.map((productInfo, index) => <SingleItem
    //                 key={index}
    //                 index={index}
    //                 // isAMP={isAMP}
    //                 {...productInfo}
    //             // isActive={(slidesInView.indexOf(index) > -1 || index === 0)}
    //             // isVisible={(slidesInView.indexOf(index) > -1 || index === 0)}
    //             />)}
    //         </amp-base-carousel>

    //     );
    // }
    return (<Carousel

        responsive={responsive}
        ssr={ssr}
        // swipeable
        arrows={useArrow}
        slidesToSlide={2}
        deviceType={"mobile"}
        showDots={useDot}
        sliderClass={additionalContainerClassname}
    >
        {productList.map((productInfo, index) => <SingleItem
            key={index}
            index={index}
            {...productInfo}
        // isActive={(slidesInView.indexOf(index) > -1 || index === 0)}
        // isVisible={(slidesInView.indexOf(index) > -1 || index === 0)}
        />)}
    </Carousel>);
}
export default Slider