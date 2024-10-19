import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";
export default class ErrorAlert extends Alert {
    constructor(options) {
        super(".error-alert", {
            icon: new AppCompConfig.ErrorAlertIcon(),
            ...options,
        });
    }
}
//# sourceMappingURL=ErrorAlert.js.map