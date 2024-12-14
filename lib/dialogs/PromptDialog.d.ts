import { DomChild, DomNode } from "@common-module/app";
import StructuredModal from "../modal/StructuredModal.js";
interface PromptDialogOptions {
    icon?: DomNode;
    title: string;
    message: DomChild[] | string;
    value?: string;
    confirmButtonTitle?: string;
    onConfirm?: () => any;
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