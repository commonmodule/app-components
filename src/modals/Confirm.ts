import { DomNode, el } from "@common-module/app";
import Button, { ButtonType } from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";

export default class Confirm extends StructuredModal {
  private resolveConfirm: (() => void) | undefined;
  private rejectConfirm: ((reason: Error) => void) | undefined;

  constructor(options: {
    icon?: DomNode;
    title: string;
    message: string;
    confirmButtonTitle?: string;
    onConfirm?: () => void;
  }) {
    super(".confirm");
    this
      .appendToHeader(el("h1", options.icon, options.title))
      .appendToMain(el("p", options.message))
      .appendToFooter(
        new Button(".cancel", {
          title: "Cancel",
          onClick: () => {
            this.rejectConfirm?.(new Error("Canceled by user"));
            this.remove();
          },
        }),
        new Button(".confirm", {
          type: ButtonType.Contained,
          title: options.confirmButtonTitle ?? "Confirm",
          onClick: () => {
            if (options.onConfirm) options.onConfirm();
            this.resolveConfirm?.();
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
