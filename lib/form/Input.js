import { DomNode, el } from "@common-module/app";
export default class Input extends DomNode {
    input;
    constructor(options) {
        super(`label.input${options.required === true ? ".required" : ""}`);
        this.append(options.label ? el("span.label", options.label) : undefined, this.input = el("input", { placeholder: options.placeholder }));
    }
    get value() {
        return this.input.htmlElement.value;
    }
    set value(value) {
        if (this.input.htmlElement.value === value)
            return;
        this.input.htmlElement.value = value;
    }
}
//# sourceMappingURL=Input.js.map