import { DomNode, DomUtils } from "@common-module/app";
export default class Tab extends DomNode {
    options;
    constructor(options) {
        super(".tab");
        this.options = options;
        this.text = options.label;
        this.onDom("click", () => this.select());
        if (this.options.openContextMenu) {
            DomUtils.enhanceWithContextMenu(this, (event) => {
                this.options.openContextMenu?.(event.clientX, event.clientY);
            });
        }
    }
    getValue() {
        return this.options.value;
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