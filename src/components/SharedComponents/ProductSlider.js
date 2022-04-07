
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import useInView from "react-cool-inview";
// // import handleViewport from 'react-in-viewport';
// import { SliderLoader } from "./PageLoader";
import Slider from '@/SharedComponents/ProductSliderComps/index'
import { memo } from 'react'
// let options = {
//     threshold: 1.0
// }
// const Slider = dynamic(() => import(   /* webpackChunkName: "SliderProduct" */
// /* webpackMode: "lazy" */'@/SharedComponents/ProductSliderComps/index'),
//     {
//         ssr: false,
//         loading: () => <div className="flex flex-wrap "><SliderLoader className={"mx-auto"} /></div>,

//     });

// const SliderWithViewPortProps = ({ inViewport, forwardedRef, enterCount, productList, setAddPading }) => {
//     const [alreadyIn, setInview] = useState(false);

//     const { observe, inView,
//         // scrollDirection,
//         //  entry, 
//         //  observe, 
//         //  unobserve 
//     } = useInView(
//         {
//             threshold: 0.5, // Default is 0
//             //   onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
//             //     // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]
//             //   },
//             onEnter: () => setInview(true),
//             //   onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
//             //     // Triggered when the target leaves the viewport
//             //   },
//             // More useful options...
//         }
//     );
//     useEffect(() => {
//         alreadyIn&&setAddPading(false)
//     }, [alreadyIn])

//     return (<div
//         className={`${alreadyIn ? '' : 'pt-64'}`}
//         ref={observe}>
//         {(inView || alreadyIn) && <Slider productList={productList} />}
//     </div>);
// }
const ProductSlider = (props) => {
    // console.log("props",props)
    // if (props.useInviewPort) {
    //     return <SliderWithViewPortProps {...props} />
    // }
    return <Slider {...props} />
}
ProductSlider.whyDidYouRender = true

export default ProductSlider
/**
 * <div className="swiper-product">
    <div className="swiper-container">
        <div className="swiper-wrapper">
            <div className="swiper-slide">

            </div>
            <div className="swiper-slide">

            </div>
            <div className="swiper-slide">

            </div>
            <div className="swiper-slide">

            </div>
            <div className="swiper-slide">

            </div>
            <div className="swiper-slide">

            </div>
        </div>
        <div className="swiper-pagination"></div>
    </div>
</div>
 */