import { el } from "@common-module/app";
import Button from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";
export default class Confirm extends StructuredModal {
    constructor(options) {
        super(".confirm");
        this
            .appendToHeader(el("h1", options.icon, options.title))
            .appendToMain(el("p", options.message))
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }), new Button(".confirm", {
            title: options.confirmButtonTitle ?? "Confirm",
            onClick: () => {
                if (options.onConfirm)
                    options.onConfirm();
                this.remove();
            },
        }));
    }
    async wait() {
    }
}
//# sourceMappingURL=Confirm.js.map