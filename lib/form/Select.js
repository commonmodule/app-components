import { DomNode, el } from "@common-module/app";
export default class Select extends DomNode {
    select;
    constructor(options) {
        super(`label.select${options.required === true ? ".required" : ""}`);
        this.append(options.label ? el("span.label", options.label) : undefined, this.select = el("select", el("option", { value: "", disabled: true, selected: true }, options.placeholder), ...options.options.map((option) => el("option", { value: option.value }, option.label))));
    }
    get value() {
        return this.select.htmlElement.value;
    }
    set value(value) {
        if (this.select.htmlElement.value === value)
            return;
        this.select.htmlElement.value = value;
    }
}
//# sourceMappingURL=Select.js.map