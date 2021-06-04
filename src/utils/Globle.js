export function flatten(arr) {
    return [].concat(...arr.map(item => [].concat(item, ...flatten(item.tags))))
}

export function flattenArr(arr) {
    let newArr = [];
    arr.forEach((val) => {
        if (val instanceof Array) {
            newArr = newArr.concat(flattenArr(val))
        } else {
            newArr.push(val)
        }
    })
    return newArr;
}