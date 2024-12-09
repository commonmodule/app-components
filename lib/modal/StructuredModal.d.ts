import { DomChild } from "@common-module/app";
import Modal from "./Modal.js";
export default class StructuredModal extends Modal {
    protected header: import("@common-module/app").DomNode<HTMLElement, {}>;
    protected main: import("@common-module/app").DomNode<HTMLElement, {}>;
    private footer;
    constructor(classNames: `.${string}`, modal?: boolean);
    appendToHeader(...children: DomChild<HTMLDivElement>[]): this;
    appendToMain(...children: DomChild<HTMLDivElement>[]): this;
    appendToFooter(...children: DomChild<HTMLDivElement>[]): this;
}
//# sourceMappingURL=StructuredModal.d.ts.map