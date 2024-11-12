import { DomChild, DomNode, el } from "@common-module/app";
import Button, { ButtonType } from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";

interface ConfirmOptions {
  icon?: DomNode;
  title: string;
  message: DomChild[] | string;
  confirmButtonTitle?: string;
  onConfirm?: () => Promise<void> | void;
}

export default class Confirm extends StructuredModal {
  private resolveConfirm: (() => void) | undefined;
  private rejectConfirm: ((reason: Error) => void) | undefined;

  constructor(options: ConfirmOptions);
  constructor(classNames: `.${string}`, options: ConfirmOptions);
  constructor(
    classNamesOrOptions: `.${string}` | ConfirmOptions,
    optionsOrUndefined?: ConfirmOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: ConfirmOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      if (optionsOrUndefined === undefined) {
        throw new Error("DropdownMenuOptions is required");
      }
      options = optionsOrUndefined;
    } else {
      options = classNamesOrOptions;
    }

    super(`.confirm${classNames}`);
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
