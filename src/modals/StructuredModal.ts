import { DomChild, el } from "@common-module/app";
import Modal from "./Modal.js";

export default class StructuredModal extends Modal {
  private header;
  private main;
  private footer;

  constructor(classNames: `.${string}`, modal = true) {
    super(`.structured-modal${classNames}`, modal);
    super.append(
      this.header = el("header"),
      this.main = el("main"),
      this.footer = el("footer"),
    );
  }

  public appendToHeader(...children: DomChild<HTMLDivElement>[]): this {
    this.header.append(...children);
    return this;
  }

  public appendToMain(...children: DomChild<HTMLDivElement>[]): this {
    this.main.append(...children);
    return this;
  }

  public appendToFooter(...children: DomChild<HTMLDivElement>[]): this {
    this.footer.append(...children);
    return this;
  }
}
