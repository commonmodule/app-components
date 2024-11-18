import { DomChild, DomNode, el } from "@common-module/app";
import Button, { ButtonType } from "../button/Button.js";
import StructuredModal from "../modal/StructuredModal.js";

interface ConfirmDialogOptions {
  icon?: DomNode;
  title: string;
  message: DomChild[] | string;
  confirmButtonTitle?: string;
  onConfirm?: () => Promise<void> | void;
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
      .on(
        "remove",
        () => this.rejectConfirm?.(new Error("Canceled by user")),
      )
      .appendToHeader(el("h1", options.icon, options.title))
      .appendToMain(
        ...(typeof options.message === "string"
          ? [el("p", options.message)]
          : options.message),
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
