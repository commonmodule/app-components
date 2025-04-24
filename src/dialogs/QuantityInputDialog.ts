import { DomChild, DomNode, el } from "@commonmodule/app";
import Button, { ButtonType } from "../button/Button.js";
import QuantityInput from "../form/QuantityInput.js";
import StructuredModal from "../modal/StructuredModal.js";

interface QuantityInputDialogOptions {
  icon?: DomNode;
  title: string;
  message: DomChild[] | string;
  value?: number;
  min?: number;
  max?: number;
  confirmButtonTitle?: string;
  onConfirm?: (value: number) => any;
}

export default class QuantityInputDialog extends StructuredModal {
  private resolveConfirm: ((value: number) => void) | undefined;
  private rejectConfirm: ((reason: Error) => void) | undefined;

  private input: QuantityInput;

  constructor(options: QuantityInputDialogOptions);
  constructor(classNames: `.${string}`, options: QuantityInputDialogOptions);
  constructor(
    classNamesOrOptions: `.${string}` | QuantityInputDialogOptions,
    optionsOrUndefined?: QuantityInputDialogOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: QuantityInputDialogOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      if (optionsOrUndefined === undefined) {
        throw new Error("DropdownMenuOptions is required");
      }
      options = optionsOrUndefined;
    } else {
      options = classNamesOrOptions;
    }

    super(`.quantity-input-dialog${classNames}`);
    this
      .on("remove", () => this.rejectConfirm?.(new Error("Canceled by user")))
      .appendToHeader(el("h1", options.icon, options.title))
      .appendToMain(
        ...(typeof options.message === "string"
          ? [el("p", options.message)]
          : options.message),
        this.input = new QuantityInput({
          value: options.value,
          min: options.min,
          max: options.max,
        }),
      )
      .appendToFooter(
        new Button(".cancel", {
          title: "Cancel",
          onClick: () => this.remove(),
        }),
        new Button(".confirm", {
          type: ButtonType.Contained,
          title: options.confirmButtonTitle ?? "Confirm",
          onClick: async () => {
            const value = this.input.value;
            if (value !== undefined) {
              if (options.onConfirm) await options.onConfirm(value);
              this.resolveConfirm?.(value);
              this.rejectConfirm = undefined;
              this.remove();
            }
          },
        }),
      );
  }

  public async waitForConfirmation() {
    return new Promise<number>((resolve, reject) => {
      this.resolveConfirm = resolve;
      this.rejectConfirm = reject;
    });
  }
}
