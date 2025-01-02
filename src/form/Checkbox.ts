import { DomNode, el } from "@common-module/app";

interface CheckboxOptions {
  label?: string;
  required?: boolean;
}

export default class Checkbox extends DomNode<HTMLLabelElement, {
  valueChanged: (newValue: string) => void;
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
      this.input = el("input", { type: "checkbox" }),
      options.label ? el("span.label", options.label) : undefined,
    );
  }
}
