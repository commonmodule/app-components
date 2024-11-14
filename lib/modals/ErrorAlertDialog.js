import AppCompConfig from "../AppCompConfig.js";
import AlertDialog from "./AlertDialog.js";
export default class ErrorAlertDialog extends AlertDialog {
    constructor(options) {
        super(".error-alert", {
            icon: new AppCompConfig.ErrorAlertIcon(),
            ...options,
        });
    }
}
//# sourceMappingURL=ErrorAlertDialog.js.map