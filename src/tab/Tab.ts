import { DomNode, DomUtils } from "@commonmodule/app";

interface TabOptions<Value> {
  label: string;
  value: Value;
  openContextMenu?: (left: number, top: number) => DomNode;
}

export default class Tab<Value> extends DomNode<HTMLDivElement, {
  selected: () => void;
  deselected: () => void;
}> {
  constructor(private options: TabOptions<Value>) {
    super(".tab");
    this.text = options.label;

    this.onDom("click", () => this.select());

    if (this.options.openContextMenu) {
      DomUtils.enhanceWithContextMenu(this, (event) => {
        this.options.openContextMenu?.(event.clientX, event.clientY);
      });
    }
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
