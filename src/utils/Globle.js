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