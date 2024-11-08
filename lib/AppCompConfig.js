import { DomNode } from "@common-module/app";
class DefaultErrorAlertIcon extends DomNode {
    constructor() {
        super("span.icon.error-alert", "❌");
    }
}
class DefaultAccordionOpenIcon extends DomNode {
    constructor() {
        super("span.icon.accordion-open", "▼");
    }
}
class DefaultAccordionCloseIcon extends DomNode {
    constructor() {
        super("span.icon.accordion-close", "▲");
    }
}
class DefaultLoadingSpinner extends DomNode {
    constructor() {
        super(".loading-spinner");
    }
}
class AppCompConfig {
    ErrorAlertIcon = DefaultErrorAlertIcon;
    AccordionOpenIcon = DefaultAccordionOpenIcon;
    AccordionCloseIcon = DefaultAccordionCloseIcon;
    LoadingSpinner = DefaultLoadingSpinner;
}
export default new AppCompConfig();
//# sourceMappingURL=AppCompConfig.js.map