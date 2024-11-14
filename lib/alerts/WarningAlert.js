import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";
export default class WarningAlert extends Alert {
    constructor(message) {
        super(".warning", {
            icon: new AppCompConfig.WarningIcon(),
            message,
        });
    }
}
//# sourceMappingURL=WarningAlert.js.map