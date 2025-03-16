import { DomNode, el } from "@common-module/app";
export default class MainImageViewer extends DomNode {
    image;
    isDragging = false;
    dragStartX = 0;
    dragStartY = 0;
    translateX = 0;
    translateY = 0;
    scale = 1;
    constructor(imageUrl) {
        super(".main-image-viewer");
        this.append(this.image = el("img", { src: imageUrl }));
        this.image.onDom("mousedown", (event) => this.startDrag(event));
        this.onWindow("mousemove", (event) => this.drag(event));
        this.onWindow("mouseup", () => this.endDrag());
    }
    updateTransform() {
        this.image.style({
            transform: `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`,
        });
    }
    startDrag(event) {
        event.preventDefault();
        this.isDragging = true;
        this.dragStartX = event.clientX - this.translateX;
        this.dragStartY = event.clientY - this.translateY;
        this.image.addClass("dragging");
    }
    drag(event) {
        if (this.isDragging) {
            this.translateX = event.clientX - this.dragStartX;
            this.translateY = event.clientY - this.dragStartY;
            this.updateTransform();
        }
    }
    endDrag() {
        this.isDragging = false;
        this.image.removeClass("dragging");
    }
    zoomIn() {
        this.scale = Math.min(this.scale + 0.25, 3);
        this.updateTransform();
    }
    zoomOut() {
        this.scale = Math.max(this.scale - 0.25, 1);
        this.updateTransform();
    }
    resetZoom() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }
}
//# sourceMappingURL=MainImageViewer.js.map