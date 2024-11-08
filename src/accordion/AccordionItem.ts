import { DomNode, el } from "@common-module/app";

interface AccordionItemOptions {
  icon?: DomNode;
  label: string;
}

export default class AccordionItem extends DomNode {
  constructor(options: AccordionItemOptions, ...children: DomNode[]) {
    super("details.accordion-item");
    this.append(
      el("summary", options.icon, options.label),
      el(".content", ...children),
    );
  }
}
