
type TagId = number;

type TagColor = 'default' | 'blue' | 'green' | string;


interface BookmarkItem {
    title: string;
    url: string;
    description?: string;
    tags: Array<TagId>;
}

interface Tag {
    id: TagId;
    text: string;
    color: TagColor;
    createdAt: string;
    updatedAt: string;
}

type BookmarkData = Array<BookmarkItem>;
