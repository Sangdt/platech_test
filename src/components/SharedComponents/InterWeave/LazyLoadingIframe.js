import { useEffect, useState } from "react";
import useInView from "react-cool-inview";
// import { SliderLoader } from "../PageLoader";

const LazyLoadingIframe = ({ children }) => {
    const [alreadyIn, setInview] = useState(false);
    const { observe, inView, } = useInView({
        threshold: 0.25,
        onEnter: () => !alreadyIn && setInview(true),
    });
    // useEffect(()=>console.log("loaded"),[])
    return <div ref={observe} className="container sm:h-96">
        {(inView || alreadyIn) && children}
    </div>
}

export default LazyLoadingIframe;