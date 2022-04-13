import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as tocbot from 'tocbot';
import 'tocbot/dist/tocbot.css';
// import 'tocbot/dist/styles.css';



const TableofContent = ({ contentClassName, tocSelector }) => {
    const router = useRouter();
    const tocbotInitObj = {
        // Where to render the table of contents.
        tocSelector: `${tocSelector ? tocSelector : '.js-toc'}`,
        ignoreSelector: 'toc-ignore',

        // Where to grab the headings to build the table of contents.
        contentSelector: `${contentClassName ? contentClassName : '.js-toc-content '}`,
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h1, h2, h3',
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
        positionFixedSelector: '.js-toc',
        collapseDepth: 6,
        // Smooth scrolling enabled.
        // Smooth scroll duration.
    };
    const UpdateWhenRouteChange = (url) => {
        if (url.includes('/blog/') || url.includes('/san-pham/') || url.includes('/dich-vu/')) {
            tocbot.refresh(tocbotInitObj);
        } else {
            tocbot.destroy();
        }
    }
    useEffect(() => {
        tocbot.init(tocbotInitObj);
        router.events.on('routeChangeComplete', UpdateWhenRouteChange);
        return () => {
            router.events.off('routeChangeComplete', UpdateWhenRouteChange);

        }
    }, []);
    return (<>

        <div className={`toc toc-right js-toc relative z-20 transition--300 md:pl-2 text-xl uppercase font-bold lg:pt-0 pt-5  ${tocSelector ? tocSelector : 'js-toc'} sm:max-w-md`} >
            {/* <label className="md:pl-2 sm:text-xl text-base uppercase font-bold" >
                mục lục:
            </label> */}
        </div>

    </>);
}

export default TableofContent;