import { DomNode, el } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";
import Button, { ButtonType } from "../button/Button.js";
export default class QuantityInput extends DomNode {
    options;
    minusButton;
    input;
    plusButton;
    previousValue;
    constructor(classNamesOrOptions, optionsOrUndefined) {
        let classNames = "";
        let options;
        if (typeof classNamesOrOptions === "string") {
            classNames = classNamesOrOptions;
            options = optionsOrUndefined ?? {};
        }
        else {
            options = classNamesOrOptions ?? {};
        }
        super(`.quantity-input${classNames}${options.required === true ? ".required" : ""}`);
        this.options = options;
        this.append(options.label ? el("span.label", options.label) : undefined, el("main", this.minusButton = new Button({
            type: ButtonType.Icon,
            icon: new AppCompConfig.MinusIcon(),
            disabled: options.readOnly || options.value === options.min,
            onClick: () => {
                const value = this.value;
                if (value === undefined)
                    return;
                this.value = value - 1;
            },
        }), this.input = el("input", {
            type: "number",
            placeholder: options.placeholder ?? "",
            value: options.value ? String(options.value) : "",
            min: options.min ? String(options.min) : undefined,
            max: options.max ? String(options.max) : undefined,
            readOnly: options.readOnly,
            onkeyup: () => this.handleQuantityInput(),
        }), this.plusButton = new Button({
            type: ButtonType.Icon,
            icon: new AppCompConfig.PlusIcon(),
            disabled: options.readOnly || options.value === options.max,
            onClick: () => {
                const value = this.value;
                if (value === undefined)
                    return;
                this.value = value + 1;
            },
        })));
        if (options.onChange) {
            this.on("valueChanged", (v) => options.onChange(v));
        }
    }
    handleQuantityInput = () => {
        const newValue = this.value;
        if (newValue === undefined) {
            this.previousValue = undefined;
            this.minusButton.disable();
            this.plusButton.enable();
        }
        else {
            if (newValue !== this.previousValue) {
                this.emit("valueChanged", newValue);
                this.previousValue = newValue;
                newValue === this.options.min
                    ? this.minusButton.disable()
                    : this.minusButton.enable();
                newValue === this.options.max
                    ? this.plusButton.disable()
                    : this.plusButton.enable();
            }
        }
    };
    get value() {
        const value = parseInt(this.input.htmlElement.value, 10);
        return isNaN(value) ? undefined : value;
    }
    set value(value) {
        const stringValue = value === undefined ? "" : String(value);
        if (this.input.htmlElement.value === stringValue)
            return;
        this.input.htmlElement.value = stringValue;
        this.handleQuantityInput();
    }
    get readOnly() {
        return this.input.htmlElement.readOnly;
    }
    set readOnly(readOnly) {
        this.input.htmlElement.readOnly = readOnly;
    }
    focus() {
        this.input.htmlElement.focus();
    }
}
//# sourceMappingURL=QuantityInput.js.map