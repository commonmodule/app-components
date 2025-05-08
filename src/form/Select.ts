import { Dom, el } from "@commonmodule/app";

interface SelectOptions {
  label?: string;
  placeholder: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export default class Select extends Dom<HTMLLabelElement> {
  private select: Dom<HTMLSelectElement>;

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
        { value: options.value },
      ),
    );

    this.select.on("change", () => {
      if (options.onChange) options.onChange(this.value);
    });
  }

  public get value(): string {
    return this.select.htmlElement.value;
  }

  public set value(value: string) {
    if (this.select.htmlElement.value === value) return;
    this.select.htmlElement.value = value;
  }
}
