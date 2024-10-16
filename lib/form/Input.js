import { DomNode, el } from "@common-module/app";
export default class Input extends DomNode {
    input;
    previousValue = "";
    constructor(options) {
        super(`label.input${options.required === true ? ".required" : ""}`);
        this.append(options.label ? el("span.label", options.label) : undefined, this.input = el("input", {
            placeholder: options.placeholder,
            value: options.value ?? "",
            onkeyup: () => {
                if (this.value !== this.previousValue) {
                    this.emit("valueChanged", this.value);
                    this.previousValue = this.value;
                }
            },
        }));
    }
    get value() {
        return this.input.htmlElement.value;
    }
    set value(value) {
        if (this.input.htmlElement.value === value)
            return;
        this.input.htmlElement.value = value;
        this.emit("valueChanged", value);
    }
    focus() {
        this.input.htmlElement.focus();
    }
}
//# sourceMappingURL=Input.js.map