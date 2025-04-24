import { DomChild } from "@commonmodule/app";
import Modal from "./Modal.js";
export default class StructuredModal extends Modal {
    private header;
    protected main: import("@commonmodule/app").DomNode<HTMLElement, import("@commonmodule/ts").EventRecord>;
    private footer;
    constructor(classNames: `.${string}`, modal?: boolean);
    appendToHeader(...children: DomChild<HTMLDivElement>[]): this;
    appendToMain(...children: DomChild<HTMLDivElement>[]): this;
    appendToFooter(...children: DomChild<HTMLDivElement>[]): this;
}
//# sourceMappingURL=StructuredModal.d.ts.map