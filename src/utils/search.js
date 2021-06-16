import Fuse from "fuse.js";
import { fuseJsOptions } from "@/config/fuseJsOptions";

// TODO: use Fuse.js to search
export function fuseSearchInBookmark(keyword, bookmarkItem) {
    const fuse = new Fuse(fuseJsOptions);
    console.log(bookmarkItem);
    fuse.search(keyword);
}
