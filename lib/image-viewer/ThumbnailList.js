import { DomNode } from "@common-module/app";
import ThumbnailListItem from "./ThumbnailListItem.js";
export default class ThumbnailList extends DomNode {
    constructor(options) {
        super(".thumbnail-list");
        for (const thumbnailUrl of options.thumbnailUrls) {
            this.append(new ThumbnailListItem(thumbnailUrl));
        }
    }
}
//# sourceMappingURL=ThumbnailList.js.map