import { Dom, DomChild, el } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";

interface AccordionItemOptions {
  label: string;
  open?: boolean;
}

export default class AccordionItem extends Dom<HTMLDetailsElement> {
  private iconContainer: Dom;

  constructor(options: AccordionItemOptions, ...children: DomChild[]) {
    super("details.accordion-item");
    this.append(
      el("summary", options.label, this.iconContainer = el(".icon-container")),
      el(".content", ...children),
    );

    this.on("toggle", () => {
      this.iconContainer.clear().append(
        this.htmlElement.open
          ? new AppCompConfig.AccordionCloseIcon()
          : new AppCompConfig.AccordionOpenIcon(),
      );
    });

    if (options.open) this.htmlElement.open = true;
  }
}
