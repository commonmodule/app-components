import { DomNode } from "@common-module/app";
class DefaultCloseIcon extends DomNode {
    constructor() {
        super("span.icon.close", "❌");
    }
}
class DefaultLoadingSpinner extends DomNode {
    constructor() {
        super(".loading-spinner");
    }
}
class DefaultSuccessIcon extends DomNode {
    constructor() {
        super("span.icon.success", "✅");
    }
}
class DefaultInfoIcon extends DomNode {
    constructor() {
        super("span.icon.info", "ℹ️");
    }
}
class DefaultWarningIcon extends DomNode {
    constructor() {
        super("span.icon.warning", "⚠️");
    }
}
class DefaultErrorIcon extends DomNode {
    constructor() {
        super("span.icon.error", "❌");
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
class DefaultFolderCollapsedIcon extends DomNode {
    constructor() {
        super("span.icon.folder-collapse", "📁");
    }
}
class DefaultFolderExpandedIcon extends DomNode {
    constructor() {
        super("span.icon.folder-expand", "📂");
    }
}
class DefaultMinusIcon extends DomNode {
    constructor() {
        super("span.icon.minus", "-");
    }
}
class DefaultPlusIcon extends DomNode {
    constructor() {
        super("span.icon.plus", "+");
    }
}
class AppCompConfig {
    LoadingSpinner = DefaultLoadingSpinner;
    CloseIcon = DefaultCloseIcon;
    SuccessIcon = DefaultSuccessIcon;
    InfoIcon = DefaultInfoIcon;
    WarningIcon = DefaultWarningIcon;
    ErrorIcon = DefaultErrorIcon;
    AccordionOpenIcon = DefaultAccordionOpenIcon;
    AccordionCloseIcon = DefaultAccordionCloseIcon;
    FolderCollapsedIcon = DefaultFolderCollapsedIcon;
    FolderExpandedIcon = DefaultFolderExpandedIcon;
    MinusIcon = DefaultMinusIcon;
    PlusIcon = DefaultPlusIcon;
    updateTabBackgroundOnSelect = () => { };
}
export default new AppCompConfig();
//# sourceMappingURL=AppCompConfig.js.map