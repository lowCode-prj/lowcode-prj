export function changeGetUrl(urlP,paramsP) {
    let url = urlP
    let params = JSON.parse(JSON.stringify(paramsP))
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.split("?")[1];
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    for (let key in theRequest) {
        let index = params.findIndex((item) => {
            return item.key == key
        })
        if (index == -1) {
            params.push({
                key: key,
                value: theRequest[key]
            })
        }
    }
    // console.log(params)
    return params
}
export function changePostBody(bodyp,paramsP) {
    let params = JSON.parse(JSON.stringify(paramsP))
    var theRequest = JSON.parse(bodyp)
    for (let key in theRequest) {
        let index = params.findIndex((item) => {
            return item.key == key
        })
        if (index == -1) {
            params.push({
                key: key,
                value: theRequest[key]
            })
        }
    }
    // console.log(params)
    return params
}