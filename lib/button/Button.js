import { Dom, el } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";
export var ButtonType;
(function (ButtonType) {
    ButtonType["Text"] = "text";
    ButtonType["Contained"] = "contained";
    ButtonType["Outlined"] = "outlined";
    ButtonType["Icon"] = "icon";
})(ButtonType || (ButtonType = {}));
export default class Button extends Dom {
    options;
    iconContainer;
    titleContainer;
    loadingSpinner;
    loading = false;
    constructor(classNamesOrOptions, optionsOrUndefined) {
        let classNames = "";
        let options;
        if (typeof classNamesOrOptions === "string") {
            classNames = classNamesOrOptions;
            options = optionsOrUndefined ?? {};
        }
        else {
            options = classNamesOrOptions;
        }
        const type = options.type ?? ButtonType.Text;
        super(`button${classNames}.${type}`);
        this.options = options;
        if (options.iconPosition === "right") {
            this.append(options.title
                ? this.titleContainer = el(".title", ...(Array.isArray(options.title) ? options.title : [options.title]))
                : undefined, options.icon
                ? this.iconContainer = el(".right-icon-container", options.icon.clone())
                : undefined);
        }
        else {
            this.append(options.icon
                ? this.iconContainer = el(".icon-container", options.icon.clone())
                : undefined, options.title
                ? this.titleContainer = el(".title", ...(Array.isArray(options.title) ? options.title : [options.title]))
                : undefined);
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
        if (options.disabled)
            this.disable();
    }
    set title(title) {
        this.titleContainer?.clear().append(...(Array.isArray(title) ? title : [title]));
    }
    get title() {
        return this.titleContainer?.text ?? "";
    }
    set icon(icon) {
        if (this.iconContainer) {
            this.iconContainer.clear();
            if (icon)
                this.iconContainer.append(icon.clone());
        }
        else {
            this.prepend(icon?.clone());
        }
    }
    get icon() {
        return this.iconContainer?.children[0];
    }
    disable() {
        this.htmlElement.setAttribute("disabled", "disabled");
        this.addClass("disabled");
        return this;
    }
    enable() {
        this.htmlElement.removeAttribute("disabled");
        this.removeClass("disabled");
        return this;
    }
    startLoading() {
        if (!this.loading) {
            this.loading = true;
            this.addClass("loading");
            if (!this.isRemoved()) {
                if (this.iconContainer) {
                    this.iconContainer.clear().append(new AppCompConfig.LoadingSpinner());
                }
                else {
                    this.prepend(this.loadingSpinner = new AppCompConfig.LoadingSpinner());
                }
            }
        }
        return this;
    }
    stopLoading() {
        if (this.loading) {
            this.loading = false;
            this.removeClass("loading");
            if (!this.isRemoved()) {
                if (this.iconContainer) {
                    this.iconContainer.clear().append(this.options.icon?.clone());
                }
                else if (this.loadingSpinner) {
                    this.loadingSpinner.remove();
                    this.loadingSpinner = undefined;
                }
            }
        }
        return this;
    }
}
//# sourceMappingURL=Button.js.map