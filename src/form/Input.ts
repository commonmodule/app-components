import { DomNode, el } from "@common-module/app";

interface InputOptions {
  multiline?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default class Input extends DomNode<HTMLLabelElement> {
  constructor(options: InputOptions) {
    super(`label.input${options.required === true ? ".required" : ""}`);

    this.append(
      options.label ? el("span.label", options.label) : undefined,
      el("input"),
    );
  }
}
