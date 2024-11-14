import { DomChild } from "@common-module/app";
import AlertDialog from "./AlertDialog.js";
export default class ErrorAlertDialog extends AlertDialog {
    constructor(options: {
        title: string;
        message: string | DomChild | DomChild[];
        confirmButtonTitle?: string;
        onConfirm?: () => Promise<void> | void;
    });
}
//# sourceMappingURL=ErrorAlertDialog.d.ts.map