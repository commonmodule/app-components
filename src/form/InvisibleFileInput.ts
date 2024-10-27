import { DomNode } from "@common-module/app";

interface InvisibleFileInputOptions {
  multiple?: boolean;
  accept?: string;
  onChange: (files: File[]) => void;
}

export default class InvisibleFileInput extends DomNode<HTMLInputElement> {
  constructor(private options: InvisibleFileInputOptions) {
    super("input.invisible-file-input", {
      type: "file",
      ...options,
      style: { display: "none" },
      onchange: () => this.handleChange(),
    });
  }

  public openFileSelector(): void {
    this.htmlElement.click();
  }

  private handleChange(): void {
    const files = this.htmlElement.files;
    if (files) this.options.onChange(Array.from(files));
    this.htmlElement.value = "";
  }
}
