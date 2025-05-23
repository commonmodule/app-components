import { Dom, DomChild } from "@commonmodule/app";
import StructuredModal from "../modal/StructuredModal.js";
interface PromptDialogOptions {
    icon?: Dom;
    title: string;
    message: DomChild[] | string;
    placeholder?: string;
    value?: string;
    confirmButtonTitle?: string;
    cancelButtonTitle?: string;
    onConfirm?: (value: string) => any;
}
export default class PromptDialog extends StructuredModal {
    private resolveConfirm;
    private rejectConfirm;
    private input;
    constructor(options: PromptDialogOptions);
    constructor(classNames: `.${string}`, options: PromptDialogOptions);
    waitForConfirmation(): Promise<string>;
}
export {};
//# sourceMappingURL=PromptDialog.d.ts.map