import { DomNode } from "@common-module/app";
class DefaultLoadingSpinner extends DomNode {
    constructor() {
        super(".loading-spinner");
    }
}
class AppCompConfig {
    LoadingSpinner = DefaultLoadingSpinner;
}
export default new AppCompConfig();
//# sourceMappingURL=AppCompConfig.js.map