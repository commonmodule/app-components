import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";
export default class ErrorAlert extends Alert {
    constructor(message) {
        super(".error", {
            icon: new AppCompConfig.ErrorIcon(),
            message,
        });
    }
}
//# sourceMappingURL=ErrorAlert.js.map