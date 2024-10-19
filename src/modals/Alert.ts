import { DomNode, el } from "@common-module/app";
import Button from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";

interface AlertOptions {
  icon?: DomNode;
  title: string;
  message: string;
  confirmButtonTitle?: string;
  onConfirm?: () => void;
}

export default class Alert extends StructuredModal {
  constructor(options: AlertOptions);
  constructor(classNames: `.${string}`, options: AlertOptions);
  constructor(
    classNamesOrOptions: `.${string}` | AlertOptions,
    optionsOrUndefined?: AlertOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: AlertOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      if (optionsOrUndefined === undefined) {
        throw new Error("Expected options to be provided");
      }
      options = optionsOrUndefined;
    } else {
      options = classNamesOrOptions;
    }

    super(`.alert${classNames}`);
    this
      .appendToHeader(el("h1", options.icon, options.title))
      .appendToMain(el("p", options.message))
      .appendToFooter(
        new Button(".confirm", {
          title: options.confirmButtonTitle ?? "OK",
          onClick: () => {
            if (options.onConfirm) options.onConfirm();
            this.remove();
          },
        }),
      );
  }
}
