import { el } from "@common-module/app";
import Button from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";
export default class Alert extends StructuredModal {
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
        super(`.alert${classNames}`);
        this
            .appendToHeader(el("h1", options.icon, options.title))
            .appendToMain(el("p", options.message))
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
//# sourceMappingURL=Alert.js.map