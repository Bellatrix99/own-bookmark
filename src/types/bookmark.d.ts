
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
