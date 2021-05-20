const elementMoveOut = function (el, currentClassName, moveOutClassName, timeout = 500, movingCallBack) {
    return new Promise(resolve => {
        if (currentClassName !== null && currentClassName !== undefined) {
            el.classList.remove(currentClassName);
        }
        el.classList.add(moveOutClassName);
        if (typeof movingCallBack === 'function') {
            movingCallBack();
        }
        setTimeout(() => {
            el.classList.remove(moveOutClassName);
            resolve();
        }, timeout)
    });
}

const elementMoveIn = function (el, className, timeout = 500, beforeMoveIn) {
    if (typeof beforeMoveIn === 'function') {
        beforeMoveIn();
    }
    return new Promise(resolve => {
        el.classList.add(className);
        setTimeout(() => {
            resolve();
        }, timeout)
    })
}

export default{
    elementMoveOut,
    elementMoveIn
}
