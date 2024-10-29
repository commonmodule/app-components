import { DomNode, el } from "@common-module/app";
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
            options = classNamesOrOptions;
        }
        super(`label.input${classNames}${options.required === true ? ".required" : ""}`);
        this.append(options.label ? el("span.label", options.label) : undefined, this.input = el(options.multiline ? "textarea" : "input", {
            placeholder: options.placeholder ?? "",
            value: options.value ?? "",
            readOnly: options.readOnly,
            onkeyup: () => this.handleInput(),
        }), options.suffixIcon ? el(".suffix-icon", options.suffixIcon) : undefined);
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
        this.handleInput();
    }
    focus() {
        this.input.htmlElement.focus();
    }
}
//# sourceMappingURL=Input.js.map