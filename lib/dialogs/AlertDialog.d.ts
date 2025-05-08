import { Dom, DomChild } from "@commonmodule/app";
import StructuredModal from "../modal/StructuredModal.js";
interface AlertDialogOptions {
    icon?: Dom;
    title: string;
    message: string | DomChild | DomChild[];
    confirmButtonTitle?: string;
    onConfirm?: () => any;
}
export default class AlertDialog extends StructuredModal {
    constructor(options: AlertDialogOptions);
    constructor(classNames: `.${string}`, options: AlertDialogOptions);
}
export {};
//# sourceMappingURL=AlertDialog.d.ts.map