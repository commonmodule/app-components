import { DomNode } from "@common-module/app";

interface TabOptions {
  label: string;
}

export default class Tab extends DomNode<HTMLDivElement, {
  selected: () => void;
  deselected: () => void;
}> {
  constructor(options: TabOptions) {
    super(".tab");
    this.text = options.label;

    this.onDom("click", () => this.select());
  }

  public select(): void {
    this.addClass("selected");
    this.emit("selected");
  }

  public deselect(): void {
    this.removeClass("selected");
    this.emit("deselected");
  }
}
