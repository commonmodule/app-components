import { DomNode } from "@common-module/app";

interface TabOptions<Value> {
  label: string;
  value: Value;
}

export default class Tab<Value> extends DomNode<HTMLDivElement, {
  selected: () => void;
  deselected: () => void;
}> {
  constructor(private options: TabOptions<Value>) {
    super(".tab");
    this.text = options.label;

    this.onDom("click", () => this.select());
  }

  public getValue(): Value {
    return this.options.value;
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
