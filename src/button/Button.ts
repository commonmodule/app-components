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
  iconPosition?: "left" | "right";
  title?: DomNode | string;
  disabled?: boolean;
  onClick?: (
    button: Button,
    event: MouseEvent,
  ) => Promise<void> | DomNode | void;
}

export default class Button extends DomNode<HTMLButtonElement> {
  private options: ButtonOptions;

  private iconContainer: DomNode | undefined;
  private loadingSpinner: DomNode | undefined;

  private loading = false;

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

    if (options.iconPosition === "right") {
      this.append(
        options.title,
        options.icon
          ? this.iconContainer = el(
            ".right-icon-container",
            options.icon.clone(),
          )
          : undefined,
      );
    } else {
      this.append(
        options.icon
          ? this.iconContainer = el(".icon-container", options.icon.clone())
          : undefined,
        options.title,
      );
    }

    this.onDom("click", (event) => {
      if (!this.loading && options.onClick) {
        const promise = options.onClick(this, event);
        if (promise instanceof Promise) {
          this.startLoading();
          promise.finally(() => this.stopLoading());
        }
      }
    });

    if (options.disabled) this.disable();
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
    if (!this.loading) {
      this.loading = true;
      this.addClass("loading");

      if (!this.removed) {
        if (this.iconContainer) {
          this.iconContainer.clear().append(new AppCompConfig.LoadingSpinner());
        } else {
          this.prepend(
            this.loadingSpinner = new AppCompConfig.LoadingSpinner(),
          );
        }
      }
    }
    return this;
  }

  public stopLoading(): this {
    if (this.loading) {
      this.loading = false;
      this.removeClass("loading");

      if (!this.removed) {
        if (this.iconContainer) {
          this.iconContainer.clear().append(this.options.icon?.clone());
        } else if (this.loadingSpinner) {
          this.loadingSpinner.remove();
          this.loadingSpinner = undefined;
        }
      }
    }
    return this;
  }
}
