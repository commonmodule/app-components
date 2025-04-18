import { DomNode } from "@commonmodule/app";
export default class DropdownMenuItem extends DomNode {
    constructor(options) {
        super("a.dropdown-menu-item");
        this.append(options.icon, options.label);
        this.onDom("click", () => options.onClick());
    }
}
//# sourceMappingURL=DropdownMenuItem.js.map