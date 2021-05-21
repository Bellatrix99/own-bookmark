export function getCurrentTab() {
    return new Promise(((resolve, reject) => {
        chrome.tabs.query(
            {active: true, currentWindow: true},
            function (tabs) {
                if (tabs.length !== 0) {
                    resolve(tabs)
                } else {
                    reject(new Error('没有激活的页面'));
                }
            });
    }))
}


export function openTab(url) {
    chrome.tabs.create({url});

}
