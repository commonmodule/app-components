import { DomNode, el } from "@common-module/app";

interface SelectOptions {
  label?: string;
  placeholder: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export default class Select extends DomNode<HTMLLabelElement> {
  private select: DomNode<HTMLSelectElement>;

  constructor(options: SelectOptions) {
    super(`label.select${options.required === true ? ".required" : ""}`);

    this.append(
      options.label ? el("span.label", options.label) : undefined,
      this.select = el(
        "select",
        el(
          "option",
          { value: "", disabled: true, selected: true },
          options.placeholder,
        ),
        ...options.options.map((option) =>
          el("option", { value: option.value }, option.label)
        ),
      ),
    );
  }

  public get value(): string {
    return this.select.htmlElement.value;
  }

  public set value(value: string) {
    if (this.select.htmlElement.value === value) return;
    this.select.htmlElement.value = value;
  }
}
