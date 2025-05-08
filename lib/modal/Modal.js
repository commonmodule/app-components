import { Body, Dom, el } from "@commonmodule/app";
const nonModalDialogContainer = el(".non-modal-dialog-container").appendTo(Body);
nonModalDialogContainer.on("click", (event) => {
    if (event.target === nonModalDialogContainer.htmlElement) {
        for (const dialog of nonModalDialogContainer.children) {
            if (dialog instanceof Modal) {
                dialog.htmlElement.close();
            }
        }
    }
});
export default class Modal extends Dom {
    modal;
    closeListener = () => this.remove();
    constructor(classNames, modal = true) {
        super(`dialog.modal${classNames}`);
        this.modal = modal;
        this
            .on("close", this.closeListener)
            .on("click", (event) => {
            const rect = this.calculateRect();
            if (event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom) {
                this.htmlElement.close();
            }
        })
            .appendTo(modal ? Body : nonModalDialogContainer);
        modal ? this.htmlElement.showModal() : this.htmlElement.show();
        if (!modal) {
            for (const bodyNodeChild of Body.children) {
                if (bodyNodeChild instanceof Modal && bodyNodeChild.modal) {
                    bodyNodeChild.off("remove", bodyNodeChild.closeListener);
                    bodyNodeChild.htmlElement.close();
                }
            }
            this.on("remove", () => {
                for (const bodyNodeChild of Body.children) {
                    if (bodyNodeChild instanceof Modal && bodyNodeChild.modal) {
                        bodyNodeChild.htmlElement.showModal();
                        bodyNodeChild.on("remove", bodyNodeChild.closeListener);
                    }
                }
            });
        }
    }
}
//# sourceMappingURL=Modal.js.map