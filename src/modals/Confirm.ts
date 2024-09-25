import { DomNode, el } from "@common-module/app";
import Button from "../button/Button.js";
import StructuredModal from "./StructuredModal.js";

export default class Confirm extends StructuredModal {
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
          onClick: () => this.remove(),
        }),
        new Button(".confirm", {
          title: options.confirmButtonTitle ?? "Confirm",
          onClick: () => {
            if (options.onConfirm) options.onConfirm();
            this.remove();
          },
        }),
      );
  }

  public async wait() {
    //TODO:
  }
}
