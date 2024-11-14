import { DomNode, el } from "@common-module/app";
export default class Alert extends DomNode {
    constructor(classNames, options) {
        super(`.alert${classNames}`);
        this.append(el(".icon-container", options.icon), el("p.message", options.message));
    }
}
//# sourceMappingURL=Alert.js.map