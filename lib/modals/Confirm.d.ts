import { DomNode } from "@common-module/app";
import Modal from "./Modal.js";
export default class Confirm extends Modal {
    constructor(options: {
        icon?: DomNode;
        title: string;
        message: string;
        onConfirm?: () => void;
    });
    wait(): Promise<void>;
}
//# sourceMappingURL=Confirm.d.ts.map