import { DomNode, el } from "@commonmodule/app";

interface CheckboxOptions {
  label?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default class Checkbox extends DomNode<HTMLLabelElement, {
  valueChanged: (newValue: boolean) => void;
}> {
  private input: DomNode<HTMLInputElement>;

  constructor(options?: CheckboxOptions);
  constructor(classNames?: `.${string}`, options?: CheckboxOptions);
  constructor(
    classNamesOrOptions?: `.${string}` | CheckboxOptions,
    optionsOrUndefined?: CheckboxOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: CheckboxOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      options = optionsOrUndefined ?? {};
    } else {
      options = classNamesOrOptions ?? {};
    }

    super(
      `label.checkbox${classNames}${
        options.required === true ? ".required" : ""
      }`,
    );

    this.append(
      this.input = el("input", {
        type: "checkbox",
        checked: options.checked,
        onchange: () => {
          options.onChange?.(this.input.htmlElement.checked);
          this.emit("valueChanged", this.input.htmlElement.checked);
        },
      }),
      options.label ? el("span.label", options.label) : undefined,
    );
  }

  public isChecked(): boolean {
    return this.input.htmlElement.checked;
  }
}
