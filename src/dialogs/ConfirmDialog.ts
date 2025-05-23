import { Dom, DomChild, el } from "@commonmodule/app";
import Button, { ButtonType } from "../button/Button.js";
import StructuredModal from "../modal/StructuredModal.js";

interface ConfirmDialogOptions {
  icon?: Dom;
  title: string;
  message: DomChild[] | string;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
  onConfirm?: () => any;
}

export default class ConfirmDialog extends StructuredModal {
  private resolveConfirm: (() => void) | undefined;
  private rejectConfirm: ((reason: Error) => void) | undefined;

  constructor(options: ConfirmDialogOptions);
  constructor(classNames: `.${string}`, options: ConfirmDialogOptions);
  constructor(
    classNamesOrOptions: `.${string}` | ConfirmDialogOptions,
    optionsOrUndefined?: ConfirmDialogOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: ConfirmDialogOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      if (optionsOrUndefined === undefined) {
        throw new Error("DropdownMenuOptions is required");
      }
      options = optionsOrUndefined;
    } else {
      options = classNamesOrOptions;
    }

    super(`.confirm-dialog${classNames}`);
    this
      .on("remove", () => this.rejectConfirm?.(new Error("Canceled by user")))
      .appendToHeader(el("h1", options.icon, options.title))
      .appendToMain(
        ...(typeof options.message === "string"
          ? [el("p", options.message)]
          : options.message),
      )
      .appendToFooter(
        new Button(".cancel", {
          title: options.cancelButtonTitle ?? "Cancel",
          onPress: () => this.remove(),
        }),
        new Button(".confirm", {
          type: ButtonType.Contained,
          title: options.confirmButtonTitle ?? "Confirm",
          onPress: async () => {
            if (options.onConfirm) await options.onConfirm();
            this.resolveConfirm?.();
            this.rejectConfirm = undefined;
            this.remove();
          },
        }),
      );
  }

  public async waitForConfirmation() {
    return new Promise<void>((resolve, reject) => {
      this.resolveConfirm = resolve;
      this.rejectConfirm = reject;
    });
  }
}
