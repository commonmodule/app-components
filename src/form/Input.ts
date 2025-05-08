import { Dom, el } from "@commonmodule/app";
import { Debouncer } from "@commonmodule/ts";

interface InputOptions {
  multiline?: boolean;
  label?: string;
  placeholder?: string;
  suffixIcon?: Dom;
  required?: boolean;
  value?: string;
  readOnly?: boolean;
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  debounceDelay?: number;
  onKeyDown?: (event: KeyboardEvent) => void;
  onChange?: (newValue: string) => void;
  onClick?: (input: Input) => void;
}

export default class Input extends Dom<HTMLLabelElement, {
  valueChanged: (newValue: string) => void;
}> {
  private input: Dom<HTMLInputElement | HTMLTextAreaElement>;
  private previousValue: string = "";
  private inputChangeDebouncer?: Debouncer;

  constructor(options?: InputOptions);
  constructor(classNames?: `.${string}`, options?: InputOptions);
  constructor(
    classNamesOrOptions?: `.${string}` | InputOptions,
    optionsOrUndefined?: InputOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: InputOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      options = optionsOrUndefined ?? {};
    } else {
      options = classNamesOrOptions ?? {};
    }

    super(
      `label.input${classNames}${options.required === true ? ".required" : ""}`,
    );

    if (options.autoCapitalize) {
      this.htmlElement.autocapitalize = options.autoCapitalize;
    }

    if (options.debounceDelay !== undefined) {
      this.inputChangeDebouncer = new Debouncer(
        options.debounceDelay,
        () => this.emitValueChangeIfNeeded(),
      );
    }

    this.append(
      options.label ? el("span.label", options.label) : undefined,
      this.input = el(options.multiline ? "textarea" : "input", {
        placeholder: options.placeholder ?? "",
        value: options.value ?? "",
        readOnly: options.readOnly,
        onkeyup: () => this.onInputEvent(),
      }),
      options.suffixIcon ? el(".suffix-icon", options.suffixIcon) : undefined,
    );

    if (options.value) this.previousValue = options.value;

    if (options.onKeyDown) {
      this.input.on("keydown", (e) => options.onKeyDown!(e));
    }
    if (options.onChange) this.on("valueChanged", (v) => options.onChange!(v));
    if (options.onClick) this.on("click", () => options.onClick!(this));
  }

  private emitValueChangeIfNeeded() {
    const newValue = this.value;
    if (newValue !== this.previousValue) {
      this.emit("valueChanged", newValue);
      this.previousValue = newValue;
    }
  }

  private onInputEvent = () => {
    if (this.inputChangeDebouncer) this.inputChangeDebouncer.execute();
    else this.emitValueChangeIfNeeded();
  };

  public get value(): string {
    return this.input.htmlElement.value;
  }

  public set value(value: string) {
    if (this.input.htmlElement.value === value) return;
    this.input.htmlElement.value = value;
    if (!this.readOnly) this.onInputEvent();
  }

  public get readOnly(): boolean {
    return this.input.htmlElement.readOnly;
  }

  public set readOnly(readOnly: boolean) {
    this.input.htmlElement.readOnly = readOnly;
  }

  public focus() {
    this.input.htmlElement.focus();
  }
}
