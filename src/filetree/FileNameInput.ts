import { DomNode } from "@commonmodule/app";

export default class FileNameInput extends DomNode<HTMLInputElement> {
  private removing = false;

  constructor(onConfirm: (name: string) => void) {
    super("input.file-name-input");

    this.on("visible", () => this.htmlElement.focus());

    this.onDom("keydown", (event) => {
      if (this.removing) return;
      if (event.key === "Enter") {
        if (this.htmlElement.value) {
          onConfirm(this.htmlElement.value);
        }
        this.removing = true;
        this.remove();
      } else if (event.key === "Escape") {
        this.removing = true;
        this.remove();
      }
    });

    this.onDom("blur", () => {
      if (this.removing) return;
      if (this.htmlElement.value) {
        onConfirm(this.htmlElement.value);
      }
      this.removing = true;
      this.remove();
    });
  }
}
