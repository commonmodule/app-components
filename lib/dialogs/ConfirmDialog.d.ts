import { Dom, DomChild } from "@commonmodule/app";
import StructuredModal from "../modal/StructuredModal.js";
interface ConfirmDialogOptions {
    icon?: Dom;
    title: string;
    message: DomChild[] | string;
    confirmButtonTitle?: string;
    cancelButtonTitle?: string;
    onConfirm?: () => any;
}
export default class ConfirmDialog extends StructuredModal {
    private resolveConfirm;
    private rejectConfirm;
    constructor(options: ConfirmDialogOptions);
    constructor(classNames: `.${string}`, options: ConfirmDialogOptions);
    waitForConfirmation(): Promise<void>;
}
export {};
//# sourceMappingURL=ConfirmDialog.d.ts.map