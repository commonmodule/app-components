import { DomNode, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import Button, { ButtonType } from "../button/Button.js";

interface QuantityInputOptions {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: number;
  min?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (newValue: number) => void;
}

export default class QuantityInput extends DomNode<HTMLLabelElement, {
  valueChanged: (newValue: number) => void;
}> {
  private options: QuantityInputOptions;

  private minusButton: Button;
  private input: DomNode<HTMLInputElement>;
  private plusButton: Button;

  private previousValue: number | undefined;

  constructor(options?: QuantityInputOptions);
  constructor(classNames?: `.${string}`, options?: QuantityInputOptions);
  constructor(
    classNamesOrOptions?: `.${string}` | QuantityInputOptions,
    optionsOrUndefined?: QuantityInputOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: QuantityInputOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      options = optionsOrUndefined ?? {};
    } else {
      options = classNamesOrOptions ?? {};
    }

    super(
      `.quantity-input${classNames}${
        options.required === true ? ".required" : ""
      }`,
    );
    this.options = options;

    this.append(
      options.label ? el("span.label", options.label) : undefined,
      el(
        "main",
        this.minusButton = new Button({
          type: ButtonType.Icon,
          icon: new AppCompConfig.MinusIcon(),
          disabled: options.readOnly || options.value === options.min,
          onClick: () => {
            const value = this.value;
            if (value === undefined) return;
            this.value = value - 1;
          },
        }),
        this.input = el("input", {
          type: "number",
          placeholder: options.placeholder ?? "",
          value: options.value ? String(options.value) : "",
          min: options.min ? String(options.min) : undefined,
          max: options.max ? String(options.max) : undefined,
          readOnly: options.readOnly,
          onkeyup: () => this.handleQuantityInput(),
        }),
        this.plusButton = new Button({
          type: ButtonType.Icon,
          icon: new AppCompConfig.PlusIcon(),
          disabled: options.readOnly || options.value === options.max,
          onClick: () => {
            const value = this.value;
            if (value === undefined) return;
            this.value = value + 1;
          },
        }),
      ),
    );

    if (options.onChange) {
      this.on("valueChanged", (v) => options.onChange!(v));
    }
  }

  private handleQuantityInput = () => {
    const newValue = this.value;
    if (newValue === undefined) {
      this.previousValue = undefined;
      this.minusButton.disable();
      this.plusButton.enable();
    } else {
      if (newValue !== this.previousValue) {
        this.emit("valueChanged", newValue);
        this.previousValue = newValue;

        newValue === this.options.min
          ? this.minusButton.disable()
          : this.minusButton.enable();

        newValue === this.options.max
          ? this.plusButton.disable()
          : this.plusButton.enable();
      }
    }
  };

  public get value(): number | undefined {
    const value = parseInt(this.input.htmlElement.value, 10);
    return isNaN(value) ? undefined : value;
  }

  public set value(value: number | undefined) {
    const stringValue = value === undefined ? "" : String(value);
    if (this.input.htmlElement.value === stringValue) return;
    this.input.htmlElement.value = stringValue;
    this.handleQuantityInput();
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
