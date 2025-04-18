import { DomNode, el } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";

interface AccordionItemOptions {
  label: string;
  open?: boolean;
}

export default class AccordionItem extends DomNode<HTMLDetailsElement> {
  private iconContainer: DomNode;

  constructor(options: AccordionItemOptions, ...children: DomNode[]) {
    super("details.accordion-item");
    this.append(
      el("summary", options.label, this.iconContainer = el(".icon-container")),
      el(".content", ...children),
    );

    this.onDom("toggle", () => {
      this.iconContainer.clear().append(
        this.htmlElement.open
          ? new AppCompConfig.AccordionCloseIcon()
          : new AppCompConfig.AccordionOpenIcon(),
      );
    });

    if (options.open) this.htmlElement.open = true;
  }
}
