import { Dom, DomChild, el } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";

export enum ButtonType {
  Text = "text",
  Contained = "contained",
  Outlined = "outlined",
  Icon = "icon",
}

export interface ButtonOptions {
  type?: ButtonType;
  icon?: Dom;
  iconPosition?: "left" | "right";
  title?: string | DomChild | DomChild[];
  disabled?: boolean;
  onPress?: (button: Button, event: MouseEvent) => any;
}

export default class Button extends Dom<HTMLButtonElement, {
  pressed: () => Promise<void>;
}> {
  private options: ButtonOptions;

  private iconContainer: Dom | undefined;
  private titleContainer: Dom | undefined;
  private loadingSpinner: Dom | undefined;

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
        options.title
          ? this.titleContainer = el(
            ".title",
            ...(Array.isArray(options.title) ? options.title : [options.title]),
          )
          : undefined,
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
        options.title
          ? this.titleContainer = el(
            ".title",
            ...(Array.isArray(options.title) ? options.title : [options.title]),
          )
          : undefined,
      );
    }

    this.on("click", (event) => {
      if (!this.loading) {
        if (options.onPress) {
          const promise = options.onPress(this, event);
          if (!this.isRemoved() && promise instanceof Promise) {
            this.startLoading();
            promise.finally(() => this.stopLoading());
          }
        }

        if (!this.isRemoved() && this.hasEvent("pressed")) {
          const promise = this.emit("pressed");
          if (!this.isRemoved() && promise instanceof Promise) {
            this.startLoading();
            promise.finally(() => this.stopLoading());
          }
        }
      }
    });

    if (options.disabled) this.disable();
  }

  public set title(title: string | DomChild | DomChild[]) {
    this.titleContainer?.clear().append(
      ...(Array.isArray(title) ? title : [title]),
    );
  }

  public get title(): string {
    return this.titleContainer?.text ?? "";
  }

  public set icon(icon: Dom | undefined) {
    if (this.iconContainer) {
      this.iconContainer.clear();
      if (icon) this.iconContainer.append(icon.clone());
    } else {
      this.prepend(icon?.clone());
    }
  }

  public get icon(): Dom | undefined {
    return this.iconContainer?.children[0];
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

      if (!this.isRemoved()) {
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

      if (!this.isRemoved()) {
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
