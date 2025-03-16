import { DomNode, el } from "@common-module/app";

export default class MainImageViewer extends DomNode {
  private image: DomNode;

  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private translateX = 0;
  private translateY = 0;
  private scale = 1;

  constructor(imageUrl: string) {
    super(".main-image-viewer");
    this.append(
      this.image = el("img", { src: imageUrl }),
    );

    this.image.onDom("mousedown", (event) => this.startDrag(event));
    this.onWindow("mousemove", (event) => this.drag(event));
    this.onWindow("mouseup", () => this.endDrag());
  }

  private updateTransform() {
    this.image.style({
      transform:
        `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`,
    });
  }

  private startDrag(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.dragStartX = event.clientX - this.translateX;
    this.dragStartY = event.clientY - this.translateY;
    this.image.addClass("dragging");
  }

  private drag(event: MouseEvent) {
    if (this.isDragging) {
      this.translateX = event.clientX - this.dragStartX;
      this.translateY = event.clientY - this.dragStartY;
      this.updateTransform();
    }
  }

  private endDrag() {
    this.isDragging = false;
    this.image.removeClass("dragging");
  }

  public zoomIn() {
    this.scale = Math.min(this.scale + 0.25, 3);
    this.updateTransform();
  }

  public zoomOut() {
    this.scale = Math.max(this.scale - 0.25, 1);
    this.updateTransform();
  }

  public resetZoom() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateTransform();
  }
}
