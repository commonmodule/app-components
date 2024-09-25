import { DomNode } from "@common-module/app";
import StructuredModal from "./StructuredModal.js";
export default class Alert extends StructuredModal {
    constructor(options: {
        icon?: DomNode;
        title: string;
        message: string;
        confirmButtonTitle?: string;
        onConfirm?: () => void;
    });
}
//# sourceMappingURL=Alert.d.ts.map