import { BodyNode, DomNode } from "@common-module/app";
export default class Modal extends DomNode {
    closeListener = () => this.remove();
    constructor(classNames) {
        super(`dialog.modal${classNames}`);
        this
            .onDom("close", this.closeListener)
            .onDom("click", (event) => {
            const rect = this.calculateRect();
            if (event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom) {
                this.htmlElement.close();
            }
        })
            .appendTo(BodyNode).htmlElement.showModal();
    }
}
//# sourceMappingURL=Modal.js.map