import { DomNode } from "@common-module/app";
import StructuredModal from "./StructuredModal.js";
export default class Confirm extends StructuredModal {
    private resolveConfirm;
    private rejectConfirm;
    constructor(options: {
        icon?: DomNode;
        title: string;
        message: string;
        confirmButtonTitle?: string;
        onConfirm?: () => void;
    });
    waitForConfirmation(): Promise<void>;
}
//# sourceMappingURL=Confirm.d.ts.map