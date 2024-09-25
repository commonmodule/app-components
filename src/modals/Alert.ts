import { DomNode, el } from "@common-module/app";
import Button from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";

export default class Alert extends StructuredModal {
  constructor(options: {
    icon?: DomNode;
    title: string;
    message: string;
    confirmButtonTitle?: string;
    onConfirm?: () => void;
  }) {
    super(".alert");
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
