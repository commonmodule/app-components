import { DomNode, el } from "@common-module/app";
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
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
        this.image.onDom("wheel", (event) => this.handleWheelZoom(event));
    }
    updateTransform() {
        this.image.style({
            transform: `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`,
        });
    }
    startDrag(event) {
        event.preventDefault();
        if (this.scale > 1) {
            this.isDragging = true;
            this.dragStartX = event.clientX - this.translateX;
            this.dragStartY = event.clientY - this.translateY;
            this.image.addClass("dragging");
        }
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
        this.scale = Math.min(this.scale + 0.25, MAX_ZOOM);
        this.updateTransform();
    }
    zoomOut() {
        this.scale = Math.max(this.scale - 0.25, MIN_ZOOM);
        this.updateTransform();
    }
    resetZoom() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }
    handleWheelZoom(event) {
        event.preventDefault();
        this.scale -= event.deltaY / 100;
        this.scale = Math.max(MIN_ZOOM, Math.min(this.scale, MAX_ZOOM));
        this.updateTransform();
    }
    updateImage(imageUrl, direction) {
        const newImage = el("img", { src: imageUrl });
        newImage.addClass(direction === "left" ? "enter-from-left" : "enter-from-right");
        this.image.addClass(direction === "left" ? "exit-to-right" : "exit-to-left");
        this.append(newImage);
        newImage.htmlElement.offsetWidth;
        newImage.removeClass(direction === "left" ? "enter-from-left" : "enter-from-right");
        newImage.onDom("transitionend", () => {
            this.image.remove();
            this.image = newImage;
            this.resetZoom();
        });
    }
}
//# sourceMappingURL=MainImageViewer.js.map