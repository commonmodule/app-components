import { DomNode } from "@common-module/app";
import StructuredModal from "./StructuredModal.js";
interface AlertOptions {
    icon?: DomNode;
    title: string;
    message: string;
    confirmButtonTitle?: string;
    onConfirm?: () => Promise<void> | void;
}
export default class Alert extends StructuredModal {
    constructor(options: AlertOptions);
    constructor(classNames: `.${string}`, options: AlertOptions);
}
export {};
//# sourceMappingURL=Alert.d.ts.map