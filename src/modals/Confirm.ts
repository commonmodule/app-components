import { DomNode, el } from "@common-module/app";
import Button from "../button/Button.js";
import Modal from "./Modal.js";

export default class Confirm extends Modal {
  constructor(options: {
    icon?: DomNode;
    title: string;
    message: string;
    onConfirm?: () => void;
  }) {
    super(".confirm");

    this.append(
      el("header", el("h1", options.icon, options.title)),
      el("main", el("p", options.message)),
      el(
        "footer",
        new Button(".cancel", {
          title: "Cancel",
          onClick: () => this.remove(),
        }),
        new Button(".confirm", {
          title: "Confirm",
          onClick: () => {
            if (options.onConfirm) options.onConfirm();
            this.remove();
          },
        }),
      ),
    );
  }

  public async wait() {
    //TODO:
  }
}
