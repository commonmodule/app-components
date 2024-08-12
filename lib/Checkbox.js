import { DomNode } from "@common-module/app";
export default class Checkbox extends DomNode {
    constructor() {
        super("input.checkbox");
        this.emit("check");
        this.emit("visible");
        this.on("visible", () => {
        });
    }
}
//# sourceMappingURL=Checkbox.js.map