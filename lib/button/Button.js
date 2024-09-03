import { DomNode } from "@common-module/app";
export var ButtonType;
(function (ButtonType) {
    ButtonType["Text"] = "text";
    ButtonType["Contained"] = "contained";
    ButtonType["Outlined"] = "outlined";
    ButtonType["Circle"] = "circle";
})(ButtonType || (ButtonType = {}));
export default class Button extends DomNode {
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
        this.append(options.icon, options.title);
        this.onDom("click", (event) => {
            if (options.onClick) {
                const promise = options.onClick(this, event);
                if (promise instanceof Promise) {
                }
            }
        });
    }
}
//# sourceMappingURL=Button.js.map