import { DomNode, el } from "@common-module/app";
import Button from "../button/Button.js";
import Modal from "./Modal.js";

export default class Alert extends Modal {
  constructor(options: {
    icon?: DomNode;
    title: string;
    message: string;
    confirmButtonTitle?: string;
    onConfirm?: () => void;
  }) {
    super(".alert");

    this.append(
      el("header", el("h1", options.icon, options.title)),
      el("main", el("p", options.message)),
      el(
        "footer",
        new Button(".confirm", {
          title: options.confirmButtonTitle ?? "OK",
          onClick: () => {
            if (options.onConfirm) options.onConfirm();
            this.remove();
          },
        }),
      ),
    );
  }
}
