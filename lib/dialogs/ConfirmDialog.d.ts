import { DomChild, DomNode } from "@common-module/app";
import StructuredModal from "../modal/StructuredModal.js";
interface ConfirmDialogOptions {
    icon?: DomNode;
    title: string;
    message: DomChild[] | string;
    confirmButtonTitle?: string;
    onConfirm?: () => Promise<void> | void;
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