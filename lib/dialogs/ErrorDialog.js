import AppCompConfig from "../AppCompConfig.js";
import AlertDialog from "./AlertDialog.js";
export default class ErrorDialog extends AlertDialog {
    constructor(options) {
        super(".error-dialog", {
            icon: new AppCompConfig.ErrorIcon(),
            ...options,
        });
    }
}
//# sourceMappingURL=ErrorDialog.js.map