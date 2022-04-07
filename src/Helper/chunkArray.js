module.exports= function chunkArray(arr, n) {
    var results = [];
    
    while (arr.length) {
        results.push(arr.splice(0, n));
    }
    
    return results;
}