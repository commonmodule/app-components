import { DomNode } from "@common-module/app";

type DomNodeConstructor = new () => DomNode;

class DefaultErrorAlertIcon extends DomNode {
  constructor() {
    super("span.icon.error-alert", "❌");
  }
}

class DefaultLoadingSpinner extends DomNode {
  constructor() {
    super(".loading-spinner");
  }
}

class AppCompConfig {
  public ErrorAlertIcon: DomNodeConstructor = DefaultErrorAlertIcon;
  public LoadingSpinner: DomNodeConstructor = DefaultLoadingSpinner;
}

export default new AppCompConfig();
