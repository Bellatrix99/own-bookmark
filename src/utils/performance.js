export function awaitAnimation(animationTime) {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve();
        }, animationTime)
    }))
}
