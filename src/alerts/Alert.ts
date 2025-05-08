import { Dom, el } from "@commonmodule/app";

interface AlertOptions {
  icon: Dom;
  message: string;
}

export default abstract class Alert extends Dom {
  constructor(classNames: `.${string}`, options: AlertOptions) {
    super(`.alert${classNames}`);
    this.append(
      el(".icon-container", options.icon),
      el("p.message", options.message),
    );
  }
}
