import { el } from "@common-module/app";
import Button, { ButtonType } from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";
export default class Confirm extends StructuredModal {
    resolveConfirm;
    constructor(options) {
        super(".confirm");
        this
            .appendToHeader(el("h1", options.icon, options.title))
            .appendToMain(el("p", options.message))
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }), new Button(".confirm", {
            type: ButtonType.Contained,
            title: options.confirmButtonTitle ?? "Confirm",
            onClick: () => {
                if (options.onConfirm)
                    options.onConfirm();
                this.resolveConfirm?.();
                this.remove();
            },
        }));
    }
    async waitForConfirmation() {
        return new Promise((resolve) => this.resolveConfirm = resolve);
    }
}
//# sourceMappingURL=Confirm.js.map