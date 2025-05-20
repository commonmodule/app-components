import { Dom } from "@commonmodule/app";
export default class DropdownMenuItem extends Dom {
    constructor(options) {
        super("a.dropdown-menu-item");
        this.append(options.icon, options.label);
        if (options.onPress)
            this.on("click", () => options.onPress());
    }
}
//# sourceMappingURL=DropdownMenuItem.js.map