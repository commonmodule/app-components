import { DomNode, el } from "@common-module/app";
import Button, { ButtonType } from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";

interface ConfirmOptions {
  icon?: DomNode;
  title: string;
  message: DomNode[] | string;
  confirmButtonTitle?: string;
  onConfirm?: () => void;
}

export default class Confirm extends StructuredModal {
  private resolveConfirm: (() => void) | undefined;
  private rejectConfirm: ((reason: Error) => void) | undefined;

  constructor(options: ConfirmOptions) {
    super(".confirm");
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
          onClick: () => {
            if (options.onConfirm) options.onConfirm();
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
