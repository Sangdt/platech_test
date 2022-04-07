import { GA_TRACKING_ID, GA_TAGMANAGER_ID } from '@/Helper/utils/gtag';
import TagManager from 'react-gtm-module'

import ReactGA from 'react-ga';

ReactGA.initialize(GA_TRACKING_ID, { debug: process.env.NODE_ENV !== "production" });

TagManager.initialize({
    gtmId: GA_TAGMANAGER_ID
})
console.log("DONE !!! doing stuff")
// ReactGA.initialize(
//     [
//         {
//             trackingId: GA_TRACKING_ID,
//             gaOptions: {
//                 name: 'tracker1',
//             }
//         },
//         {
//             trackingId: GA_TAGMANAGER_ID,
//             gaOptions: { name: 'tracker2' }
//         }
//     ],
//     { debug: process.env.NODE_ENV !== "production", alwaysSendToDefaultTracker: false }
// );

export const pageView = () => ReactGA.pageview(window.location.pathname + window.location.search);