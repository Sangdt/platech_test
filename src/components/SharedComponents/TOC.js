import dynamic from "next/dynamic";
import { useState } from "react";
import useInView from "react-cool-inview";
import { SliderLoader } from "./PageLoader";

const TableofContent = dynamic(() => import(
    /* webpackChunkName: "TOC" */
    /* webpackMode: "lazy" */
    "@/SharedComponents/tocComps/TableofContent"),
    {
        ssr: false,
        loading: () => <div className="flex flex-wrap "><SliderLoader className={"mx-auto"} /></div>,
    });

const TOC = () => {
    const [alreadyIn, setInview] = useState(false);
    const { observe, inView, } = useInView({
        threshold: 0.25,
        onEnter: () => !alreadyIn && setInview(true),
    });
    return (<div ref={observe}>
        {(inView || alreadyIn) && <TableofContent />}
    </div>);
}

export default TOC;
