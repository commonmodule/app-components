import { Dom, DomUtils } from "@commonmodule/app";
export default class Tab extends Dom {
    options;
    constructor(options) {
        super(".tab");
        this.options = options;
        this.text = options.label;
        this.on("click", () => this.select());
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