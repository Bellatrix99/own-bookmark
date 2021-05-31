export const calculateStringLength = str => {
    let tempStr = String(str);
    let len = 0;
    let hans = 0;
    let chars = 0;
    for (let i = 0; i < tempStr.length; i++) {
        if (tempStr.charCodeAt(i) > 127 || tempStr.charCodeAt(i) === 94) {
            len += 2
            hans++;
        } else {
            len++
            chars++;
        }
    }
    return {len, hans, chars}
}

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