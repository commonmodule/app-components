import { DomNode, el } from "@common-module/app";
export default class AccordionItem extends DomNode {
    constructor(options, ...children) {
        super("details.accordion-item");
        this.append(el("summary", options.icon, options.label), el(".content", ...children));
    }
}
//# sourceMappingURL=AccordionItem.js.map