import { DomNode } from "@common-module/app";

type DomNodeConstructor = new () => DomNode;

class DefaultLoadingSpinner extends DomNode {
  constructor() {
    super(".loading-spinner");
  }
}

class AppCompConfig {
  public LoadingSpinner: DomNodeConstructor = DefaultLoadingSpinner;
}

export default new AppCompConfig();
