import { DomNode, el } from "@common-module/app";

interface InputOptions {
  multiline?: boolean;
  label?: string;
  placeholder?: string;
  suffixIcon?: DomNode;
  required?: boolean;
  value?: string;
  readOnly?: boolean;
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  onKeyDown?: (event: KeyboardEvent) => void;
  onChange?: (value: string) => void;
}

export default class Input extends DomNode<HTMLLabelElement, {
  valueChanged: (value: string) => void;
}> {
  private input: DomNode<HTMLInputElement | HTMLTextAreaElement>;
  private previousValue: string = "";

  constructor(options: InputOptions);
  constructor(classNames: `.${string}`, options: InputOptions);
  constructor(
    classNamesOrOptions: `.${string}` | InputOptions,
    optionsOrUndefined?: InputOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: InputOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      options = optionsOrUndefined ?? {};
    } else {
      options = classNamesOrOptions;
    }

    super(
      `label.input${classNames}${options.required === true ? ".required" : ""}`,
    );

    if (options.autoCapitalize) {
      this.htmlElement.autocapitalize = options.autoCapitalize;
    }

    this.append(
      options.label ? el("span.label", options.label) : undefined,
      this.input = el(options.multiline ? "textarea" : "input", {
        placeholder: options.placeholder ?? "",
        value: options.value ?? "",
        readOnly: options.readOnly,
        onkeyup: () => this.handleInput(),
      }),
      options.suffixIcon ? el(".suffix-icon", options.suffixIcon) : undefined,
    );

    if (options.onKeyDown) {
      this.input.onDom("keydown", (event) => options.onKeyDown!(event));
    }

    if (options.onChange) {
      this.on("valueChanged", (value) => options.onChange!(value));
    }
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
