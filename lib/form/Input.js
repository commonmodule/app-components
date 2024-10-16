import { DomNode, el } from "@common-module/app";
export default class Input extends DomNode {
    input;
    previousValue = "";
    constructor(options) {
        super(`label.input${options.required === true ? ".required" : ""}`);
        this.append(options.label ? el("span.label", options.label) : undefined, this.input = el("input", {
            placeholder: options.placeholder,
            value: options.value ?? "",
            onkeyup: () => this.handleInput(),
        }));
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