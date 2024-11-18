import { el } from "@common-module/app";
import Button from "../button/Button.js";
import StructuredModal from "../modal/StructuredModal.js";
export default class AlertDialog extends StructuredModal {
    constructor(classNamesOrOptions, optionsOrUndefined) {
        let classNames = "";
        let options;
        if (typeof classNamesOrOptions === "string") {
            classNames = classNamesOrOptions;
            if (optionsOrUndefined === undefined) {
                throw new Error("Expected options to be provided");
            }
            options = optionsOrUndefined;
        }
        else {
            options = classNamesOrOptions;
        }
        super(`.alert-dialog${classNames}`);
        this
            .appendToHeader(el("h1", options.icon, options.title))
            .appendToMain(el("p", ...(Array.isArray(options.message)
            ? options.message
            : [options.message])))
            .appendToFooter(new Button(".confirm", {
            title: options.confirmButtonTitle ?? "OK",
            onClick: async () => {
                if (options.onConfirm)
                    await options.onConfirm();
                this.remove();
            },
        }));
    }
}
//# sourceMappingURL=AlertDialog.js.map