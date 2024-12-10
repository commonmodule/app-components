import { DomNode } from "@common-module/app";
export default class Tab extends DomNode {
    constructor(options) {
        super(".tab");
        this.text = options.label;
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
//# sourceMappingURL=Tab.js.map