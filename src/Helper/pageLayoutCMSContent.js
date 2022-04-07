
const getCMSLayoutConent = require("./ServerAndBuild/getCMSLayoutConent")

module.exports = async () => {
  try {
    const menuItems = await getCMSLayoutConent() // gets items from db or api
    // console.log("menuItem",menuItems)
    return {
      cacheable: true,
      code: `module.exports = ${JSON.stringify(menuItems)}`
    }
  } catch (err) {
    console.log("Err", err)
  }
}