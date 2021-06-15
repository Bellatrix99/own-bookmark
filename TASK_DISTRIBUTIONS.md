# TASK DISTRIBUTIONS 

## Jun 15, 2021

暂定标签和书签结构如下：

```typescript
// 暂定自增 id
type TagId = number;

// 色值使用 https://vuetifyjs.com/en/styles/colors/#material-colors 中的预设，后续在开放自定义色值
type TagColor = 'default' | 'blue' | 'green' | string;

// 书签 Item
interface BookmarkItem {
    title: string;
    url: string;
    description?: string;
    // 务必保存到本地，否则可能存在失效或加载过慢的情况
    faviconSrc: string;
    // 标签数组
    tags: Array<TagId>;
    createdAt: string;
    updatedAt: string;
}

// 标签 Item
interface Tag {
    id: TagId;
    text: string;
    color: TagColor;
    createdAt: string;
    updatedAt: string;
}

type TagData = Array<Tag>;
type BookmarkData = Array<BookmarkItem>;
```

### Manage 页响应式 UI 重构

使用 [响应式范例](https://vuetifyjs.com/en/examples/wireframes/three-column/) 中的布局样式重构书签管理页，搜索支持文本的[模糊搜索](https://fusejs.io/) ，重构不涉及 `BookMarkInfo.vue`，先保留。

### 简单编辑 manifest 集成 Chrome

根据 [Manifest API](https://developer.chrome.com/docs/extensions/mv3/intro/) 编写 manifest.json 文件，并打通 `npm run serve` 到 reload 插件的流程

### 存储 API 函数编写

- 下载当前页面的 Favicon 并存储至某一目录下，函数返回可访问路径
- 将书签同步保存至 Chrome 自带收藏夹中，创建一个文件夹集中保存
- 保存 `TagData` 和 `BookmarkData`

### 收藏 API 工具类函数

根据 [Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/) ，编写工具类函数，拿到当前页面的标题和页面 SEO Meta 值，并通过这两个字符串进行 [分词](https://github.com/leizongmin/node-segment) ，依照已有的标签结构，选出应当被标记的分词。


```javascript
// 伪代码

export function getTitleInCurrentPage() {
    return chrome.page.title;
}

export function getMetaDataInCurrentPage() {
    return chrome.page.exec(() => {
        return document.querySelectorAll('meta').map(el => {
            const elNameAttr = el.getAttribute('name');
            if(elNameAttr === 'keywords') {
                return el.getAttribute('content')
            }
        }).filter(str => str);
    })
}

export function getSegments(str) {
    return nodeSegment.divide(str);
}

export function selectTags(str, tags) {
    const segments = getSegments(str);
    
    // ....
    return tags.filter(t => {
        // ... 
    })
}

function RunsInVue() {
    const tags = getTagsFromStorage();

    const title = getTitleInCurrentPage();
    const metaString = getMetaDataInCurrentPage().join(',');
    // 最终应当选中的 Tag
    const selectedTags = selectTags(`${title},${metaString}`, tags);
}
```

### 可拖拽编辑标签的书签组件（用于Manage页）

重构 `BookMarkInfo.vue`，优化布局，并集成编辑功能。
编辑时，组件高度增加，增加的高度展示可选标签 + 标签搜索框，点击搜索框高亮选中标签。允许上传自定义图片代替 favicon，标题和描述变为 input 以供修改。

当然如果有其他好的交互效果也可以。

- [增加高度展开效果](https://vuetifyjs.com/en/components/cards/#custom-actions)
- [选中标签效果](https://vuetifyjs.com/en/components/chip-groups/#filter-results)

### 重构 PopUp，打通收藏逻辑(WIP)
