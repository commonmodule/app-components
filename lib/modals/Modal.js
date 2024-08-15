import { BodyNode, DomNode } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
export default class Modal extends DomNode {
    constructor(classNames) {
        super(`dialog.modal${classNames}`, {
            removalDelay: AppCompConfig.modalRemovalDelay,
            removalClassName: AppCompConfig.modalRemovalClassName,
        });
        this.appendTo(BodyNode).element.showModal();
        this.onDom("click", (event) => {
            const rect = this.calculateRect();
            if (event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom) {
                this.remove();
            }
        });
    }
}
//# sourceMappingURL=Modal.js.map