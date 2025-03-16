import { DomNode, el } from "@common-module/app";
export default class ThumbnailListItem extends DomNode {
    constructor(thumbnailUrl) {
        super(".thumbnail-list-item");
        this.append(el("img", { src: thumbnailUrl }));
        this.onDom("click", () => this.select());
    }
    select() {
        this.addClass("selected");
        this.emit("selected");
    }
    deselect() {
        this.removeClass("selected");
        this.emit("deselected");
    }
}
//# sourceMappingURL=ThumbnailListItem.js.map