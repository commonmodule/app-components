import { el } from "@common-module/app";
import Modal from "./Modal.js";
export default class StructuredModal extends Modal {
    header;
    main;
    footer;
    constructor(classNames, modal = true) {
        super(`.structured-modal${classNames}`, modal);
        super.append(this.header = el("header"), this.main = el("main"), this.footer = el("footer"));
    }
    appendToHeader(...children) {
        this.header.append(...children);
        return this;
    }
    appendToMain(...children) {
        this.main.append(...children);
        return this;
    }
    appendToFooter(...children) {
        this.footer.append(...children);
        return this;
    }
}
//# sourceMappingURL=StructuredModal.js.map