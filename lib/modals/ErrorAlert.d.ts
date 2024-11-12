import { DomChild } from "@common-module/app";
import Alert from "./Alert.js";
export default class ErrorAlert extends Alert {
    constructor(options: {
        title: string;
        message: string | DomChild | DomChild[];
        confirmButtonTitle?: string;
        onConfirm?: () => Promise<void> | void;
    });
}
//# sourceMappingURL=ErrorAlert.d.ts.map