

module.exports = function convertArrayToObject(array, key) {
    const initialValue = {};
    // console.log("ORIGINAL ARRAY \n",array)
    //get dublicate items in arrays
    const duplicate = Object.values(array.reduce((c, v) => {
        let k = v[key];
        c[k] = c[k] || [];
        c[k].push(v);
        return c;
    }, {})).reduce((c, v) => v.length > 1 ? c.concat(v) : c, []);

    return array.reduce((obj, item) => {
        let dupItems = duplicate.find(dupitem => item[key] === dupitem[key]);
        if (dupItems) {
            // console.log("dupItems \n", obj[item[key]])

            if (!Array.isArray(obj[item[key]])) {
                obj[item[key]] = []
            }
            obj[item[key]].push(item)
            return {
                ...obj
            }
        }
        else {
            if (item[key]) {
                return {
                    ...obj,
                    [item[key]]: item?item:null,
                };
            } else {
                // the key passed not exist in the array, take the first key name
                let objKeyName = Object.keys(item)[0];
                //console.log("objKeyName", objKeyName)
                return {
                  ...obj,
                  [objKeyName]: item[objKeyName]?item[objKeyName]:null,
                };
            }
        }
    }, initialValue);
};