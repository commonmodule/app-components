import { DomNode, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
export var ButtonType;
(function (ButtonType) {
    ButtonType["Text"] = "text";
    ButtonType["Contained"] = "contained";
    ButtonType["Outlined"] = "outlined";
    ButtonType["Circle"] = "circle";
})(ButtonType || (ButtonType = {}));
export default class Button extends DomNode {
    options;
    iconContainer;
    loadingSpinner;
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
            this.append(options.title, options.icon
                ? this.iconContainer = el(".right-icon-container", options.icon.clone())
                : undefined);
        }
        else {
            this.append(options.icon
                ? this.iconContainer = el(".icon-container", options.icon.clone())
                : undefined, options.title);
        }
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
        this.addClass("loading");
        if (!this.removed) {
            if (this.iconContainer) {
                this.iconContainer.empty().append(new AppCompConfig.LoadingSpinner());
            }
            else {
                this.prepend(this.loadingSpinner = new AppCompConfig.LoadingSpinner());
            }
        }
        return this;
    }
    stopLoading() {
        this.removeClass("loading");
        if (!this.removed) {
            if (this.iconContainer) {
                this.iconContainer.empty().append(this.options.icon?.clone());
            }
            else if (this.loadingSpinner) {
                this.loadingSpinner.remove();
                this.loadingSpinner = undefined;
            }
        }
        return this;
    }
}
//# sourceMappingURL=Button.js.map