import { el } from "@common-module/app";
import Button from "../button/Button.js";
import Modal from "./Modal.js";
export default class Confirm extends Modal {
    constructor(options) {
        super(".confirm");
        this.append(el("header", el("h1", options.icon, options.title)), el("main", el("p", options.message)), el("footer", new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }), new Button(".confirm", {
            title: options.confirmButtonTitle ?? "Confirm",
            onClick: () => {
                if (options.onConfirm)
                    options.onConfirm();
                this.remove();
            },
        })));
    }
    async wait() {
    }
}
//# sourceMappingURL=Confirm.js.map