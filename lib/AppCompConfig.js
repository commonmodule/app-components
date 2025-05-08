import { Dom } from "@commonmodule/app";
class DefaultCloseIcon extends Dom {
    constructor() {
        super("span.icon.close", "❌");
    }
}
class DefaultShareIcon extends Dom {
    constructor() {
        super("span.icon.share", "🔗");
    }
}
class DefaultDownloadIcon extends Dom {
    constructor() {
        super("span.icon.download", "⬇️");
    }
}
class DefaultLoadingSpinner extends Dom {
    constructor() {
        super(".loading-spinner");
    }
}
class DefaultSuccessIcon extends Dom {
    constructor() {
        super("span.icon.success", "✅");
    }
}
class DefaultInfoIcon extends Dom {
    constructor() {
        super("span.icon.info", "ℹ️");
    }
}
class DefaultWarningIcon extends Dom {
    constructor() {
        super("span.icon.warning", "⚠️");
    }
}
class DefaultErrorIcon extends Dom {
    constructor() {
        super("span.icon.error", "❌");
    }
}
class DefaultAccordionOpenIcon extends Dom {
    constructor() {
        super("span.icon.accordion-open", "▼");
    }
}
class DefaultAccordionCloseIcon extends Dom {
    constructor() {
        super("span.icon.accordion-close", "▲");
    }
}
class DefaultFolderCollapsedIcon extends Dom {
    constructor() {
        super("span.icon.folder-collapse", "📁");
    }
}
class DefaultFolderExpandedIcon extends Dom {
    constructor() {
        super("span.icon.folder-expand", "📂");
    }
}
class DefaultMinusIcon extends Dom {
    constructor() {
        super("span.icon.minus", "-");
    }
}
class DefaultPlusIcon extends Dom {
    constructor() {
        super("span.icon.plus", "+");
    }
}
class DefaultPrevIcon extends Dom {
    constructor() {
        super("span.icon.prev", "←");
    }
}
class DefaultNextIcon extends Dom {
    constructor() {
        super("span.icon.next", "→");
    }
}
class DefaultZoomInIcon extends Dom {
    constructor() {
        super("span.icon.zoom-in", "🔍+");
    }
}
class DefaultZoomOutIcon extends Dom {
    constructor() {
        super("span.icon.zoom-out", "🔍-");
    }
}
class DefaultResetZoomIcon extends Dom {
    constructor() {
        super("span.icon.reset-zoom", "🔍1");
    }
}
class DefaultFullscreenIcon extends Dom {
    constructor() {
        super("span.icon.fullscreen", "⛶");
    }
}
class DefaultExitFullscreenIcon extends Dom {
    constructor() {
        super("span.icon.exit-fullscreen", "⛶");
    }
}
class AppCompConfig {
    LoadingSpinner = DefaultLoadingSpinner;
    CloseIcon = DefaultCloseIcon;
    ShareIcon = DefaultShareIcon;
    DownloadIcon = DefaultDownloadIcon;
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