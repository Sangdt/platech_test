import React from "react"
import ContentLoader from "react-content-loader"

const PageLoader = (props) => (
  <ContentLoader
    uniqueKey={"Loader"}

    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#363636"
    foregroundColor="#c4edce"
    {...props}
  >
    <circle cx="21" cy="35" r="19" />
    <rect x="58" y="12" rx="2" ry="2" width="200" height="15" />
    <rect x="58" y="34" rx="2" ry="2" width="200" height="16" />
    <rect x="0" y="60" rx="2" ry="2" width="261" height="204" />
  </ContentLoader>
)
const Spinner = ({ style = {} }) => {

  return <svg style={style} className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
}
const SliderLoader = ({ style = {}, className }) => <ContentLoader
uniqueKey={"Loader"}
  style={style}
  speed={2}
  width={400}
  height={460}
  viewBox="0 0 400 460"
  backgroundColor="#363636"
  foregroundColor="#c4edce"
  className={className}
>
  <rect x="4" y="302" rx="2" ry="2" width="200" height="15" />
  <rect x="3" y="322" rx="2" ry="2" width="200" height="16" />
  <rect x="6" y="10" rx="2" ry="2" width="356" height="278" />
</ContentLoader>

export {
  Spinner, SliderLoader
}

export default PageLoader