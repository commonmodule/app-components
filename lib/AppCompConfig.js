import { DomNode } from "@common-module/app";
class DefaultLoadingSpinner extends DomNode {
    constructor() {
        super(".loading-spinner");
    }
}
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
class AppCompConfig {
    LoadingSpinner = DefaultLoadingSpinner;
    ErrorAlertIcon = DefaultErrorAlertIcon;
    AccordionOpenIcon = DefaultAccordionOpenIcon;
    AccordionCloseIcon = DefaultAccordionCloseIcon;
}
export default new AppCompConfig();
//# sourceMappingURL=AppCompConfig.js.map