import { BodyNode, DomNode } from "@common-module/app";

export default abstract class Modal extends DomNode<HTMLDialogElement> {
  protected closeListener = () => this.remove();

  constructor(classNames: `.${string}`) {
    super(`dialog.modal${classNames}`);
    this
      .onDom("close", this.closeListener)
      .onDom("click", (event) => {
        const rect = this.calculateRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          this.htmlElement.close();
        }
      })
      .appendTo(BodyNode).htmlElement.showModal();
  }
}
