const date = new Date();

const dateStr = date.toDateString();

export let mockBookmarkData = [
    {
        id: 1,
        title: '百度一下，你就知道',
        url: 'https://www.baidu.com',
        favicon: 'https://www.baidu.com/favicon.testerror',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },
    {
        id: 2,
        title: 'Google',
        url: 'https://www.google.com',
        favicon: 'https://www.google.com/favicon.ico',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },
    {
        id: 3,
        title: 'Github,Github,Github,Github,Github',
        url: 'https://github.com',
        favicon: 'https://github.com/favicon.ico',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },
    {
        id: 4,
        title: '存储 API - Google Chrome 应用开发文档',
        url: 'https://crxdoc-zh.appspot.com/apps/app_storage',
        favicon: 'https://crxdoc-zh.appspot.com/favicon.ico',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },
    {
        id: 5,
        title: '掘金 - 代码不止，掘金不停',
        url: 'https://juejin.cn',
        favicon: 'https://juejin.cn/favicon.ico',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },
    {
        id: 6,
        title: 'OSCHINA - 中文开源技术交流社区',
        url: 'https://www.oschina.net',
        favicon: 'https://www.oschina.net/favicon.ico',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },
    {
        id: 6,
        title: 'OSCHINA - 中文开源技术交流社区',
        url: 'https://www.oschina.net',
        favicon: 'https://www.oschina.net/favicon.ico',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },    {
        id: 6,
        title: 'OSCHINA - 中文开源技术交流社区',
        url: 'https://www.oschina.net',
        favicon: 'https://www.oschina.net/favicon.ico',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },    {
        id: 6,
        title: 'OSCHINA - 中文开源技术交流社区',
        url: 'https://www.oschina.net',
        favicon: 'https://www.oschina.net/favicon.ico',
        tags: [
            {
                id: 1,
                text: 'Chrome',
                color: 'blue',
                createdAt: dateStr,
                updateAt: dateStr,
            }
        ],
        createdAt: dateStr,
        updateAt: dateStr,
    },
];

export async function getBookmarkData() {
    return new Promise((res) => {
        setTimeout(() => {
            res(mockBookmarkData);
        })
    })
}

export let tagsArr = [
    'Docker', 'C++', 'Java', 'JavaScript',
    '数据结构', '算法', 'Shell', '教程', '仓库',
    'TypeScript', 'Webpack', 'React', 'Vue', 'jest',
    '测试', '知乎', '掘金'
]

const tags = [
    {
        text: 'Foo',
        description: 'aaa',
        color: 'blue',
    },
    {
        text: 'Bar',
        color: 'red',
    },
    {
        text: 'a',
        color: 'red',
    }, {
        text: 'b',
        color: 'red',
    }, {
        text: 'c',
        color: 'red',
    }, {
        text: 'd',
        color: 'red',
    }, {
        text: 'e',
        color: 'red',
    },
]

export async function fetchAllTags() {
    return new Promise(res => {
        res(tags);
    })
}

export async function storeTag(tag) {
    return new Promise((res) => {
        setTimeout(() => {
            tags.push(tag);
            res();
        }, 100)
    })
}
