import { DomNode, el } from "@common-module/app";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export default class MainImageViewer extends DomNode {
  private image: DomNode<HTMLImageElement>;

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

    this.image.onDom("wheel", (event) => this.handleWheelZoom(event));
  }

  private updateTransform() {
    this.image.style({
      transform:
        `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`,
    });
  }

  private startDrag(event: MouseEvent) {
    event.preventDefault();
    if (this.scale > 1) {
      this.isDragging = true;
      this.dragStartX = event.clientX - this.translateX;
      this.dragStartY = event.clientY - this.translateY;
      this.image.addClass("dragging");
    }
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
    this.scale = Math.min(this.scale + 0.25, MAX_ZOOM);
    this.updateTransform();
  }

  public zoomOut() {
    this.scale = Math.max(this.scale - 0.25, MIN_ZOOM);
    this.updateTransform();
  }

  public resetZoom() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateTransform();
  }

  private handleWheelZoom(event: WheelEvent) {
    event.preventDefault();

    this.scale -= event.deltaY / 100;
    this.scale = Math.max(MIN_ZOOM, Math.min(this.scale, MAX_ZOOM));
    this.updateTransform();
  }

  public updateImage(imageUrl: string, direction: "left" | "right") {
    const newImage = el("img", { src: imageUrl });
    newImage.addClass(
      direction === "left" ? "enter-from-left" : "enter-from-right",
    );
    this.image.addClass(
      direction === "left" ? "exit-to-right" : "exit-to-left",
    );
    this.append(newImage);

    newImage.htmlElement.offsetWidth;
    newImage.removeClass(
      direction === "left" ? "enter-from-left" : "enter-from-right",
    );

    newImage.onDom("transitionend", () => {
      this.image.remove();
      this.image = newImage;
      this.resetZoom();
    });
  }
}
