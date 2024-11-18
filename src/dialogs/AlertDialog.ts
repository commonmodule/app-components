import { DomChild, DomNode, el } from "@common-module/app";
import Button from "../button/Button.js";
import StructuredModal from "../modal/StructuredModal.js";

interface AlertDialogOptions {
  icon?: DomNode;
  title: string;
  message: string | DomChild | DomChild[];
  confirmButtonTitle?: string;
  onConfirm?: () => Promise<void> | void;
}

export default class AlertDialog extends StructuredModal {
  constructor(options: AlertDialogOptions);
  constructor(classNames: `.${string}`, options: AlertDialogOptions);
  constructor(
    classNamesOrOptions: `.${string}` | AlertDialogOptions,
    optionsOrUndefined?: AlertDialogOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: AlertDialogOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      if (optionsOrUndefined === undefined) {
        throw new Error("Expected options to be provided");
      }
      options = optionsOrUndefined;
    } else {
      options = classNamesOrOptions;
    }

    super(`.alert-dialog${classNames}`);
    this
      .appendToHeader(el("h1", options.icon, options.title))
      .appendToMain(
        el(
          "p",
          ...(Array.isArray(options.message)
            ? options.message
            : [options.message]),
        ),
      )
      .appendToFooter(
        new Button(".confirm", {
          title: options.confirmButtonTitle ?? "OK",
          onClick: async () => {
            if (options.onConfirm) await options.onConfirm();
            this.remove();
          },
        }),
      );
  }
}
