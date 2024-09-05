import { DomNode } from "@common-module/app";
import Modal from "./Modal.js";
export default class Alert extends Modal {
    constructor(options: {
        icon?: DomNode;
        title: string;
        message: string;
        confirmButtonTitle?: string;
        onConfirm?: () => void;
    });
}
//# sourceMappingURL=Alert.d.ts.map