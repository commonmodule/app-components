import { Dom, el } from "@commonmodule/app";
export default class ThumbnailListItem extends Dom {
    constructor(thumbnailUrl) {
        super(".thumbnail-list-item");
        this.append(el("img", { src: thumbnailUrl }));
    }
    select() {
        this.addClass("selected");
    }
    deselect() {
        this.removeClass("selected");
    }
}
//# sourceMappingURL=ThumbnailListItem.js.map