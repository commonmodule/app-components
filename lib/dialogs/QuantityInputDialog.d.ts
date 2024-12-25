import { DomChild, DomNode } from "@common-module/app";
import StructuredModal from "../modal/StructuredModal.js";
interface QuantityInputDialogOptions {
    icon?: DomNode;
    title: string;
    message: DomChild[] | string;
    value?: number;
    min?: number;
    max?: number;
    confirmButtonTitle?: string;
    onConfirm?: (value: number) => any;
}
export default class QuantityInputDialog extends StructuredModal {
    private resolveConfirm;
    private rejectConfirm;
    private input;
    constructor(options: QuantityInputDialogOptions);
    constructor(classNames: `.${string}`, options: QuantityInputDialogOptions);
    waitForConfirmation(): Promise<number>;
}
export {};
//# sourceMappingURL=QuantityInputDialog.d.ts.map