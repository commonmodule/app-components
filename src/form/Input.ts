import { DomNode, el } from "@common-module/app";

interface InputOptions {
  multiline?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  readOnly?: boolean;
}

export default class Input extends DomNode<HTMLLabelElement, {
  valueChanged: (value: string) => void;
}> {
  private input: DomNode<HTMLInputElement | HTMLTextAreaElement>;
  private previousValue: string = "";

  constructor(options: InputOptions) {
    super(`label.input${options.required === true ? ".required" : ""}`);

    this.append(
      options.label ? el("span.label", options.label) : undefined,
      this.input = el(options.multiline ? "textarea" : "input", {
        placeholder: options.placeholder ?? "",
        value: options.value ?? "",
        readOnly: options.readOnly,
        onkeyup: () => this.handleInput(),
      }),
    );
  }

  private handleInput = () => {
    const newValue = this.value;
    if (newValue !== this.previousValue) {
      this.emit("valueChanged", newValue);
      this.previousValue = newValue;
    }
  };

  public get value(): string {
    return this.input.htmlElement.value;
  }

  public set value(value: string) {
    if (this.input.htmlElement.value === value) return;
    this.input.htmlElement.value = value;
    this.handleInput();
  }

  public focus() {
    this.input.htmlElement.focus();
  }
}
