import { DomNode } from "@common-module/app";
class DefaultCloseIcon extends DomNode {
    constructor() {
        super("span.icon.close", "❌");
    }
}
class DefaultShareIcon extends DomNode {
    constructor() {
        super("span.icon.share", "🔗");
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
class DefaultPrevIcon extends DomNode {
    constructor() {
        super("span.icon.prev", "←");
    }
}
class DefaultNextIcon extends DomNode {
    constructor() {
        super("span.icon.next", "→");
    }
}
class DefaultZoomInIcon extends DomNode {
    constructor() {
        super("span.icon.zoom-in", "🔍");
    }
}
class DefaultZoomOutIcon extends DomNode {
    constructor() {
        super("span.icon.zoom-out", "🔍");
    }
}
class DefaultResetZoomIcon extends DomNode {
    constructor() {
        super("span.icon.reset-zoom", "🔍");
    }
}
class DefaultFullscreenIcon extends DomNode {
    constructor() {
        super("span.icon.fullscreen", "⛶");
    }
}
class DefaultExitFullscreenIcon extends DomNode {
    constructor() {
        super("span.icon.exit-fullscreen", "⛶");
    }
}
class AppCompConfig {
    LoadingSpinner = DefaultLoadingSpinner;
    CloseIcon = DefaultCloseIcon;
    ShareIcon = DefaultShareIcon;
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
    PrevIcon = DefaultPrevIcon;
    NextIcon = DefaultNextIcon;
    ZoomInIcon = DefaultZoomInIcon;
    ZoomOutIcon = DefaultZoomOutIcon;
    ResetZoomIcon = DefaultResetZoomIcon;
    FullscreenIcon = DefaultFullscreenIcon;
    ExitFullscreenIcon = DefaultExitFullscreenIcon;
    updateTabBackgroundOnSelect = () => { };
}
export default new AppCompConfig();
//# sourceMappingURL=AppCompConfig.js.map