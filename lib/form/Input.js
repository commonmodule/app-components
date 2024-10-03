import { DomNode, el } from "@common-module/app";
export default class Input extends DomNode {
    constructor(options) {
        super(`label.input${options.required === true ? ".required" : ""}`);
        this.append(options.label ? el("span.label", options.label) : undefined, el("input"));
    }
}
//# sourceMappingURL=Input.js.map