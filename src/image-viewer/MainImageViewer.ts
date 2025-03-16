import { DomNode, el } from "@common-module/app";

export default class MainImageViewer extends DomNode {
  private image: DomNode;

  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private translateX = 0;
  private translateY = 0;

  constructor(imageUrl: string) {
    super(".main-image-viewer");
    this.append(
      this.image = el("img", { src: imageUrl }),
    );

    this.image.onDom("mousedown", (event) => this.startDrag(event));
    this.onWindow("mousemove", (event) => this.drag(event));
    this.onWindow("mouseup", () => this.endDrag());
  }

  private startDrag(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.dragStartX = event.clientX - this.translateX;
    this.dragStartY = event.clientY - this.translateY;
  }

  private drag(event: MouseEvent) {
    if (this.isDragging) {
      this.translateX = event.clientX - this.dragStartX;
      this.translateY = event.clientY - this.dragStartY;
      this.image.style({
        transform: `translate(${this.translateX}px, ${this.translateY}px)`,
      });
    }
  }

  private endDrag() {
    this.isDragging = false;
  }
}
