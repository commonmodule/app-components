import { DomChild } from "@common-module/app";
import Modal from "./Modal.js";
export default class StructuredModal extends Modal {
    private header;
    private main;
    private footer;
    constructor(classNames: `.${string}`);
    appendToHeader(...children: DomChild<HTMLDivElement>[]): this;
    appendToMain(...children: DomChild<HTMLDivElement>[]): this;
    appendToFooter(...children: DomChild<HTMLDivElement>[]): this;
}
//# sourceMappingURL=StructuredModal.d.ts.map