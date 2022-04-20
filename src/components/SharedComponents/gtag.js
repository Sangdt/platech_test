export const GA_TRACKING_ID = 'G-ZH5GNPVM70' // This is your GA Tracking ID
export const GA_TAGMANAGER_ID = 'GTM-PP6CF6J' // This is your GA Tracking ID
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
  
  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
}
