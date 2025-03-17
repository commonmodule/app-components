import { DomNode } from "@common-module/app";
import Tab from "./tab/Tab.js";

type DomNodeConstructor = new () => DomNode;

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

class DefaultDownloadIcon extends DomNode {
  constructor() {
    super("span.icon.download", "⬇️");
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
    super("span.icon.zoom-in", "🔍+");
  }
}

class DefaultZoomOutIcon extends DomNode {
  constructor() {
    super("span.icon.zoom-out", "🔍-");
  }
}

class DefaultResetZoomIcon extends DomNode {
  constructor() {
    super("span.icon.reset-zoom", "🔍1");
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
  public LoadingSpinner: DomNodeConstructor = DefaultLoadingSpinner;
  public CloseIcon: DomNodeConstructor = DefaultCloseIcon;
  public ShareIcon: DomNodeConstructor = DefaultShareIcon;
  public DownloadIcon: DomNodeConstructor = DefaultDownloadIcon;

  public SuccessIcon: DomNodeConstructor = DefaultSuccessIcon;
  public InfoIcon: DomNodeConstructor = DefaultInfoIcon;
  public WarningIcon: DomNodeConstructor = DefaultWarningIcon;
  public ErrorIcon: DomNodeConstructor = DefaultErrorIcon;

  public AccordionOpenIcon: DomNodeConstructor = DefaultAccordionOpenIcon;
  public AccordionCloseIcon: DomNodeConstructor = DefaultAccordionCloseIcon;

  public FolderCollapsedIcon: DomNodeConstructor = DefaultFolderCollapsedIcon;
  public FolderExpandedIcon: DomNodeConstructor = DefaultFolderExpandedIcon;

  public MinusIcon: DomNodeConstructor = DefaultMinusIcon;
  public PlusIcon: DomNodeConstructor = DefaultPlusIcon;

  public PrevIcon: DomNodeConstructor = DefaultPrevIcon;
  public NextIcon: DomNodeConstructor = DefaultNextIcon;

  public ZoomInIcon: DomNodeConstructor = DefaultZoomInIcon;
  public ZoomOutIcon: DomNodeConstructor = DefaultZoomOutIcon;
  public ResetZoomIcon: DomNodeConstructor = DefaultResetZoomIcon;

  public FullscreenIcon: DomNodeConstructor = DefaultFullscreenIcon;
  public ExitFullscreenIcon: DomNodeConstructor = DefaultExitFullscreenIcon;

  public updateTabBackgroundOnSelect: (
    tabBackground: DomNode,
    tab: Tab<any>,
  ) => void = () => {};
}

export default new AppCompConfig();
