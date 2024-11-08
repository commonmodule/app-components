import { DomNode } from "@common-module/app";

type DomNodeConstructor = new () => DomNode;

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
  public ErrorAlertIcon: DomNodeConstructor = DefaultErrorAlertIcon;
  public AccordionOpenIcon: DomNodeConstructor = DefaultAccordionOpenIcon;
  public AccordionCloseIcon: DomNodeConstructor = DefaultAccordionCloseIcon;

  public LoadingSpinner: DomNodeConstructor = DefaultLoadingSpinner;
}

export default new AppCompConfig();
