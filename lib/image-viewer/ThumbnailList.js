import { DomNode } from "@common-module/app";
import ThumbnailListItem from "./ThumbnailListItem.js";
export default class ThumbnailList extends DomNode {
    selectedThumbnailIndex;
    constructor(options) {
        super(".thumbnail-list");
        for (const [index, thumbnailUrl] of options.thumbnailUrls.entries()) {
            const item = new ThumbnailListItem(thumbnailUrl);
            item.on("selected", () => this.selectThumbnail(index));
            this.append(item);
        }
        this.selectThumbnail(options.initialIndex);
    }
    selectThumbnail(index) {
        if (this.selectedThumbnailIndex === index)
            return;
        if (this.selectedThumbnailIndex !== undefined) {
            this.children[this.selectedThumbnailIndex]?.deselect();
        }
        this.selectedThumbnailIndex = index;
        this.children[index]?.select();
        this.emit("thumbnailSelected", index);
    }
}
//# sourceMappingURL=ThumbnailList.js.map