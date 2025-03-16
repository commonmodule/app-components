import { DomNode, el } from "@common-module/app";
export default class MainImageViewer extends DomNode {
    image;
    isDragging = false;
    dragStartX = 0;
    dragStartY = 0;
    translateX = 0;
    translateY = 0;
    constructor(imageUrl) {
        super(".main-image-viewer");
        this.append(this.image = el("img", { src: imageUrl }));
        this.image.onDom("mousedown", (event) => this.startDrag(event));
        this.onWindow("mousemove", (event) => this.drag(event));
        this.onWindow("mouseup", () => this.endDrag());
    }
    startDrag(event) {
        event.preventDefault();
        this.isDragging = true;
        this.dragStartX = event.clientX - this.translateX;
        this.dragStartY = event.clientY - this.translateY;
    }
    drag(event) {
        if (this.isDragging) {
            this.translateX = event.clientX - this.dragStartX;
            this.translateY = event.clientY - this.dragStartY;
            this.image.style({
                transform: `translate(${this.translateX}px, ${this.translateY}px)`,
            });
        }
    }
    endDrag() {
        this.isDragging = false;
    }
}
//# sourceMappingURL=MainImageViewer.js.map