import { DomNode } from "@common-module/app";
import StructuredModal from "./StructuredModal.js";
interface ConfirmOptions {
    icon?: DomNode;
    title: string;
    message: DomNode[] | string;
    confirmButtonTitle?: string;
    onConfirm?: () => Promise<void> | void;
}
export default class Confirm extends StructuredModal {
    private resolveConfirm;
    private rejectConfirm;
    constructor(options: ConfirmOptions);
    waitForConfirmation(): Promise<void>;
}
export {};
//# sourceMappingURL=Confirm.d.ts.map