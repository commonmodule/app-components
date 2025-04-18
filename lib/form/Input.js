import { DomNode, el } from "@commonmodule/app";
export default class Input extends DomNode {
    input;
    previousValue = "";
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
        super(`label.input${classNames}${options.required === true ? ".required" : ""}`);
        if (options.autoCapitalize) {
            this.htmlElement.autocapitalize = options.autoCapitalize;
        }
        this.append(options.label ? el("span.label", options.label) : undefined, this.input = el(options.multiline ? "textarea" : "input", {
            placeholder: options.placeholder ?? "",
            value: options.value ?? "",
            readOnly: options.readOnly,
            onkeyup: () => this.handleInput(),
        }), options.suffixIcon ? el(".suffix-icon", options.suffixIcon) : undefined);
        if (options.value)
            this.previousValue = options.value;
        if (options.onKeyDown) {
            this.input.onDom("keydown", (e) => options.onKeyDown(e));
        }
        if (options.onChange) {
            this.on("valueChanged", (v) => options.onChange(v));
        }
        if (options.onClick) {
            this.onDom("click", () => options.onClick(this));
        }
    }
    handleInput = () => {
        const newValue = this.value;
        if (newValue !== this.previousValue) {
            this.emit("valueChanged", newValue);
            this.previousValue = newValue;
        }
    };
    get value() {
        return this.input.htmlElement.value;
    }
    set value(value) {
        if (this.input.htmlElement.value === value)
            return;
        this.input.htmlElement.value = value;
        if (!this.readOnly)
            this.handleInput();
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
//# sourceMappingURL=Input.js.map