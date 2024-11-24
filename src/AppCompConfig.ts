import { DomNode } from "@common-module/app";

type DomNodeConstructor = new () => DomNode;

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

class AppCompConfig {
  public LoadingSpinner: DomNodeConstructor = DefaultLoadingSpinner;
  public CloseIcon: DomNodeConstructor = DefaultCloseIcon;

  public SuccessIcon: DomNodeConstructor = DefaultSuccessIcon;
  public InfoIcon: DomNodeConstructor = DefaultInfoIcon;
  public WarningIcon: DomNodeConstructor = DefaultWarningIcon;
  public ErrorIcon: DomNodeConstructor = DefaultErrorIcon;

  public AccordionOpenIcon: DomNodeConstructor = DefaultAccordionOpenIcon;
  public AccordionCloseIcon: DomNodeConstructor = DefaultAccordionCloseIcon;
}

export default new AppCompConfig();
