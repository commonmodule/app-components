import { BodyNode, DomChild, DomNode } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";

export default abstract class Modal extends DomNode<HTMLDialogElement> {
  constructor(classNames: `.${string}`, ...children: DomChild[]) {
    super(`dialog.modal${classNames}`, ...children, {
      removalDelay: AppCompConfig.modalRemovalDelay,
      removalClassName: AppCompConfig.modalRemovalClassName,
    });

    this.appendTo(BodyNode).htmlElement.showModal();

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
