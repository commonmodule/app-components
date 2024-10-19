import { DomNode } from "@common-module/app";
class DefaultErrorAlertIcon extends DomNode {
    constructor() {
        super("span.icon.error-alert", "❌");
    }
}
class DefaultLoadingSpinner extends DomNode {
    constructor() {
        super(".loading-spinner");
    }
}
class AppCompConfig {
    ErrorAlertIcon = DefaultErrorAlertIcon;
    LoadingSpinner = DefaultLoadingSpinner;
}
export default new AppCompConfig();
//# sourceMappingURL=AppCompConfig.js.map