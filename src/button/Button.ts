import { DomNode, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";

export enum ButtonType {
  Text = "text",
  Contained = "contained",
  Outlined = "outlined",
  Circle = "circle",
}

interface ButtonOptions {
  type?: ButtonType;
  icon?: DomNode;
  title?: string;
  onClick?: (
    button: Button,
    event: MouseEvent,
  ) => Promise<void> | DomNode | void;
}

export default class Button extends DomNode<HTMLButtonElement> {
  private options: ButtonOptions;

  private iconContainer: DomNode | undefined;
  private loadingSpinner: DomNode | undefined;

  constructor(options: ButtonOptions);
  constructor(classNames: `.${string}`, options: ButtonOptions);
  constructor(
    classNamesOrOptions: `.${string}` | ButtonOptions,
    optionsOrUndefined?: ButtonOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: ButtonOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      options = optionsOrUndefined ?? {};
    } else {
      options = classNamesOrOptions;
    }

    const type = options.type ?? ButtonType.Text;

    super(`button${classNames}.${type}`);

    this.options = options;

    this.append(
      options.icon
        ? this.iconContainer = el(".icon-container", options.icon)
        : undefined,
      options.title,
    );

    this.onDom("click", (event) => {
      if (options.onClick) {
        const promise = options.onClick(this, event);
        if (promise instanceof Promise) {
          this.startLoading();
          promise.finally(() => this.stopLoading());
        }
      }
    });
  }

  public disable(): this {
    this.htmlElement.setAttribute("disabled", "disabled");
    this.addClass("disabled");
    return this;
  }

  public enable(): this {
    this.htmlElement.removeAttribute("disabled");
    this.removeClass("disabled");
    return this;
  }

  public startLoading(): this {
    this.addClass("loading");
    if (this.iconContainer) {
      this.iconContainer.empty().append(new AppCompConfig.LoadingSpinner());
    } else {
      this.prepend(this.loadingSpinner = new AppCompConfig.LoadingSpinner());
    }
    return this;
  }

  public stopLoading(): this {
    this.removeClass("loading");
    if (this.iconContainer) {
      this.iconContainer.empty().append(this.options.icon);
    } else if (this.loadingSpinner) {
      this.loadingSpinner.remove();
      this.loadingSpinner = undefined;
    }
    return this;
  }
}
