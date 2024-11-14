import { el } from "@common-module/app";
import Button, { ButtonType } from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";
export default class ConfirmDialog extends StructuredModal {
    resolveConfirm;
    rejectConfirm;
    constructor(classNamesOrOptions, optionsOrUndefined) {
        let classNames = "";
        let options;
        if (typeof classNamesOrOptions === "string") {
            classNames = classNamesOrOptions;
            if (optionsOrUndefined === undefined) {
                throw new Error("DropdownMenuOptions is required");
            }
            options = optionsOrUndefined;
        }
        else {
            options = classNamesOrOptions;
        }
        super(`.confirm-dialog${classNames}`);
        this
            .on("remove", () => this.rejectConfirm?.(new Error("Canceled by user")))
            .appendToHeader(el("h1", options.icon, options.title))
            .appendToMain(...(typeof options.message === "string"
            ? [el("p", options.message)]
            : options.message))
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }), new Button(".confirm", {
            type: ButtonType.Contained,
            title: options.confirmButtonTitle ?? "Confirm",
            onClick: async () => {
                if (options.onConfirm)
                    await options.onConfirm();
                this.resolveConfirm?.();
                this.rejectConfirm = undefined;
                this.remove();
            },
        }));
    }
    async waitForConfirmation() {
        return new Promise((resolve, reject) => {
            this.resolveConfirm = resolve;
            this.rejectConfirm = reject;
        });
    }
}
//# sourceMappingURL=ConfirmDialog.js.map