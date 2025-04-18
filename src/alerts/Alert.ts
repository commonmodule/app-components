import { DomNode, el } from "@commonmodule/app";

interface AlertOptions {
  icon: DomNode;
  message: string;
}

export default abstract class Alert extends DomNode {
  constructor(classNames: `.${string}`, options: AlertOptions) {
    super(`.alert${classNames}`);
    this.append(
      el(".icon-container", options.icon),
      el("p.message", options.message),
    );
  }
}
