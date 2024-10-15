import { BodyNode, DomChild, DomNode, el } from "@common-module/app";

interface DropdownMenuOptions {
  left: number;
  top: number;
}

export default class DropdownMenu extends DomNode {
  private header;
  private main;
  private footer;

  constructor(options: DropdownMenuOptions);
  constructor(classNames: `.${string}`, options: DropdownMenuOptions);
  constructor(
    classNamesOrOptions: `.${string}` | DropdownMenuOptions,
    optionsOrUndefined?: DropdownMenuOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: DropdownMenuOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      if (optionsOrUndefined === undefined) {
        throw new Error("DropdownMenuOptions is required");
      }
      options = optionsOrUndefined;
    } else {
      options = classNamesOrOptions;
    }

    super(`.dropdown-menu${classNames}`);

    window.getSelection()?.empty();
    for (const node of BodyNode.children) {
      if (node instanceof DropdownMenu) node.remove();
    }

    this.style({ left: `${options.left}px`, top: `${options.top}px` }).append(
      this.header = el("header"),
      this.main = el("main"),
      this.footer = el("footer"),
    ).appendTo(BodyNode);

    this.onWindow("click", (event) => {
      if (!this.htmlElement.contains(event.target as Node)) {
        this.remove();
      }
    }).onWindow("touchstart", (event) => {
      if (!this.htmlElement.contains(event.target as Node)) {
        this.remove();
      }
    }).onWindow("keydown", (event) => {
      if (event.key === "Escape") this.remove();
    });
  }

  private adjustPosition() {
    const rect = this.calculateRect();
    if (rect.left + rect.width > window.innerWidth) {
      this.style({ left: `${window.innerWidth - rect.width}px` });
    }
    if (rect.top + rect.height > window.innerHeight) {
      this.style({ top: `${window.innerHeight - rect.height}px` });
    }
  }

  public appendToHeader(...children: DomChild<HTMLDivElement>[]): this {
    this.header.append(...children);
    this.adjustPosition();
    return this;
  }

  public appendToMain(...children: DomChild<HTMLDivElement>[]): this {
    this.main.append(...children);
    this.adjustPosition();
    return this;
  }

  public appendToFooter(...children: DomChild<HTMLDivElement>[]): this {
    this.footer.append(...children);
    this.adjustPosition();
    return this;
  }
}
