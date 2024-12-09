import { el } from "@common-module/app";
import Button, { ButtonType } from "../button/Button.js";
import Input from "../form/Input.js";
import StructuredModal from "../modal/StructuredModal.js";
export default class PromptDialog extends StructuredModal {
    resolveConfirm;
    rejectConfirm;
    input;
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
        super(`.prompt-dialog${classNames}`);
        this
            .on("remove", () => this.rejectConfirm?.(new Error("Canceled by user")))
            .appendToHeader(el("h1", options.icon, options.title))
            .appendToMain(...(typeof options.message === "string"
            ? [el("p", options.message)]
            : options.message), this.input = new Input({ value: options.value }))
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }), new Button(".confirm", {
            type: ButtonType.Contained,
            title: options.confirmButtonTitle ?? "Confirm",
            onClick: async () => {
                if (options.onConfirm)
                    await options.onConfirm();
                this.resolveConfirm?.(this.input.value);
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
//# sourceMappingURL=PromptDialog.js.map