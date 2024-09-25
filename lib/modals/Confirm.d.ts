import { DomNode } from "@common-module/app";
import StructuredModal from "./StructuredModal.js";
export default class Confirm extends StructuredModal {
    constructor(options: {
        icon?: DomNode;
        title: string;
        message: string;
        confirmButtonTitle?: string;
        onConfirm?: () => void;
    });
    wait(): Promise<void>;
}
//# sourceMappingURL=Confirm.d.ts.map