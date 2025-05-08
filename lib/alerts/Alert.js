import { Dom, el } from "@commonmodule/app";
export default class Alert extends Dom {
    constructor(classNames, options) {
        super(`.alert${classNames}`);
        this.append(el(".icon-container", options.icon), el("p.message", options.message));
    }
}
//# sourceMappingURL=Alert.js.map