import { DomNode } from "@common-module/app";
export default class Modal extends DomNode {
    constructor() {
        super("dialog.modal");
        this.text = "test";
        this.on("visible", () => this.htmlElement.showModal());
    }
}
//# sourceMappingURL=Modal.js.map