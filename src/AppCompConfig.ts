import { Dom } from "@commonmodule/app";
import Tab from "./tab/Tab.js";

type DomConstructor = new () => Dom;

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
  public LoadingSpinner: DomConstructor = DefaultLoadingSpinner;
  public CloseIcon: DomConstructor = DefaultCloseIcon;
  public ShareIcon: DomConstructor = DefaultShareIcon;
  public DownloadIcon: DomConstructor = DefaultDownloadIcon;

  public SuccessIcon: DomConstructor = DefaultSuccessIcon;
  public InfoIcon: DomConstructor = DefaultInfoIcon;
  public WarningIcon: DomConstructor = DefaultWarningIcon;
  public ErrorIcon: DomConstructor = DefaultErrorIcon;

  public AccordionOpenIcon: DomConstructor = DefaultAccordionOpenIcon;
  public AccordionCloseIcon: DomConstructor = DefaultAccordionCloseIcon;

  public FolderCollapsedIcon: DomConstructor = DefaultFolderCollapsedIcon;
  public FolderExpandedIcon: DomConstructor = DefaultFolderExpandedIcon;

  public MinusIcon: DomConstructor = DefaultMinusIcon;
  public PlusIcon: DomConstructor = DefaultPlusIcon;

  public PrevIcon: DomConstructor = DefaultPrevIcon;
  public NextIcon: DomConstructor = DefaultNextIcon;

  public ZoomInIcon: DomConstructor = DefaultZoomInIcon;
  public ZoomOutIcon: DomConstructor = DefaultZoomOutIcon;
  public ResetZoomIcon: DomConstructor = DefaultResetZoomIcon;

  public FullscreenIcon: DomConstructor = DefaultFullscreenIcon;
  public ExitFullscreenIcon: DomConstructor = DefaultExitFullscreenIcon;

  public updateTabBackgroundOnSelect: (
    tabBackground: Dom,
    tab: Tab<any>,
  ) => void = () => {};
}

export default new AppCompConfig();
