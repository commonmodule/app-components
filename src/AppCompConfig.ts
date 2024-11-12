import { DomNode } from "@common-module/app";

type DomNodeConstructor = new () => DomNode;

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
  public LoadingSpinner: DomNodeConstructor = DefaultLoadingSpinner;
  public ErrorAlertIcon: DomNodeConstructor = DefaultErrorAlertIcon;
  public AccordionOpenIcon: DomNodeConstructor = DefaultAccordionOpenIcon;
  public AccordionCloseIcon: DomNodeConstructor = DefaultAccordionCloseIcon;
}

export default new AppCompConfig();
