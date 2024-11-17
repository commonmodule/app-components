import { BodyNode, DomNode, el } from "@common-module/app";
const nonModalDialogContainer = el(".non-modal-dialog-container").appendTo(BodyNode);
nonModalDialogContainer.onDom("click", (event) => {
    if (event.target === nonModalDialogContainer.htmlElement) {
        for (const dialog of nonModalDialogContainer.children) {
            if (dialog instanceof Modal) {
                dialog.htmlElement.close();
            }
        }
    }
});
export default class Modal extends DomNode {
    closeListener = () => this.remove();
    constructor(classNames, modal = true) {
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
            .appendTo(modal ? BodyNode : nonModalDialogContainer);
        modal ? this.htmlElement.showModal() : this.htmlElement.show();
    }
}
//# sourceMappingURL=Modal.js.map