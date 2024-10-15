import { DomNode } from "@common-module/app";
export default class DropdownMenuItem extends DomNode {
    constructor(options) {
        super(".dropdown-menu-item");
        this.text = options.label;
        this.onDom("click", () => options.onClick());
    }
}
//# sourceMappingURL=DropdownMenuItem.js.map