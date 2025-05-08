import { Dom, el } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";
export default class AccordionItem extends Dom {
    iconContainer;
    constructor(options, ...children) {
        super("details.accordion-item");
        this.append(el("summary", options.label, this.iconContainer = el(".icon-container")), el(".content", ...children));
        this.on("toggle", () => {
            this.iconContainer.clear().append(this.htmlElement.open
                ? new AppCompConfig.AccordionCloseIcon()
                : new AppCompConfig.AccordionOpenIcon());
        });
        if (options.open)
            this.htmlElement.open = true;
    }
}
//# sourceMappingURL=AccordionItem.js.map