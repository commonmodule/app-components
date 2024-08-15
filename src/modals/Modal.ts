import { BodyNode, DomNode } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";

export default abstract class Modal extends DomNode<HTMLDialogElement> {
  constructor(classNames: `.${string}`) {
    super(`dialog.modal${classNames}`, {
      removalDelay: AppCompConfig.modalRemovalDelay,
      removalClassName: AppCompConfig.modalRemovalClassName,
    });

    this.appendTo(BodyNode).element.showModal();

    this.onDom("click", (event) => {
      const rect = this.calculateRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        this.remove();
      }
    });
  }
}
