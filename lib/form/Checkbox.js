import { DomNode, el } from "@commonmodule/app";
export default class Checkbox extends DomNode {
    input;
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
        super(`label.checkbox${classNames}${options.required === true ? ".required" : ""}`);
        this.append(this.input = el("input", {
            type: "checkbox",
            checked: options.checked,
            onchange: () => {
                options.onChange?.(this.input.htmlElement.checked);
                this.emit("valueChanged", this.input.htmlElement.checked);
            },
        }), options.label ? el("span.label", options.label) : undefined);
    }
    isChecked() {
        return this.input.htmlElement.checked;
    }
    set checked(value) {
        this.input.htmlElement.checked = value;
    }
    get checked() {
        return this.input.htmlElement.checked;
    }
}
//# sourceMappingURL=Checkbox.js.map