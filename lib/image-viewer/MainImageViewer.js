import { DomNode, el } from "@common-module/app";
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
export default class MainImageViewer extends DomNode {
    imageUrls = [];
    currentImageIndex = 0;
    prevImage;
    currentImage;
    nextImage;
    isDragging = false;
    dragStartX = 0;
    dragStartY = 0;
    translateX = 0;
    translateY = 0;
    scale = 1;
    constructor(options) {
        super(".main-image-viewer");
        this.imageUrls = options.imageUrls;
        this.currentImageIndex = options.initialIndex;
        if (this.imageUrls.length > 1) {
            this.prevImage = el("img.prev");
            this.nextImage = el("img.next");
        }
        this.append(this.prevImage, this.currentImage = el("img.current"), this.nextImage);
        this.resetImages();
        this.currentImage.onDom("mousedown", (event) => this.startDrag(event));
        this.onWindow("mousemove", (event) => this.drag(event));
        this.onWindow("mouseup", () => this.endDrag());
        this.currentImage.onDom("wheel", (event) => this.handleWheelZoom(event));
        this.currentImage.onDom("transitionend", () => this.resetImages());
    }
    resetImages() {
        const prevImageUrl = this.imageUrls.length > 1
            ? (this.currentImageIndex <= 0
                ? this.imageUrls[this.imageUrls.length - 1]
                : this.imageUrls[this.currentImageIndex - 1])
            : undefined;
        const imageUrl = this.imageUrls[this.currentImageIndex];
        const nextImageUrl = this.imageUrls.length > 1
            ? (this.currentImageIndex >= this.imageUrls.length - 1
                ? this.imageUrls[0]
                : this.imageUrls[this.currentImageIndex + 1])
            : undefined;
        if (this.prevImage && prevImageUrl !== undefined) {
            this.prevImage.htmlElement.src = prevImageUrl;
        }
        this.currentImage.htmlElement.src = imageUrl;
        if (this.nextImage && nextImageUrl !== undefined) {
            this.nextImage.htmlElement.src = nextImageUrl;
        }
        this.prevImage?.style({
            left: "0",
            opacity: "0",
            transition: "transform 0.2s ease-in-out",
        });
        this.currentImage.style({
            left: "50%",
            opacity: "1",
            transition: "transform 0.2s ease-in-out",
        });
        this.nextImage?.style({
            left: "100%",
            opacity: "0",
            transition: "transform 0.2s ease-in-out",
        });
    }
    updateTransform() {
        this.currentImage.style({
            transform: `translate(calc(-50% + ${this.translateX}px), calc(-50% + ${this.translateY}px)) scale(${this.scale})`,
        });
    }
    startDrag(event) {
        event.preventDefault();
        if (this.scale > 1) {
            this.isDragging = true;
            this.dragStartX = event.clientX - this.translateX;
            this.dragStartY = event.clientY - this.translateY;
            this.currentImage.style({ cursor: "grabbing", transition: "none" });
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
        if (this.isDragging) {
            this.isDragging = false;
            this.currentImage.style({
                cursor: "auto",
                transition: "transform 0.2s ease-in-out",
            });
        }
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
    updateImage(imageIndex, transitionDirection) {
        if (imageIndex === this.currentImageIndex)
            return;
        this.resetZoom();
        if (!transitionDirection) {
            transitionDirection = imageIndex < this.currentImageIndex
                ? "left"
                : "right";
        }
        if (imageIndex - this.currentImageIndex < -1 && transitionDirection === "left") {
            const prevImageUrl = imageIndex + 1 <= 0
                ? this.imageUrls[this.imageUrls.length - 1]
                : this.imageUrls[imageIndex];
            if (this.prevImage)
                this.prevImage.htmlElement.src = prevImageUrl;
        }
        else if (imageIndex - this.currentImageIndex > 1 && transitionDirection === "right") {
            const nextImageUrl = imageIndex - 1 >= this.imageUrls.length - 1
                ? this.imageUrls[0]
                : this.imageUrls[imageIndex];
            if (this.nextImage)
                this.nextImage.htmlElement.src = nextImageUrl;
        }
        this.prevImage?.style({
            left: transitionDirection === "right" ? "-50%" : "50%",
            opacity: transitionDirection === "right" ? "0" : "1",
            transition: "left 0.2s ease-in-out, opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
        });
        this.currentImage.style({
            left: transitionDirection === "right" ? "0" : "100%",
            opacity: "0",
            transition: "left 0.2s ease-in-out, opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
        });
        this.nextImage?.style({
            left: transitionDirection === "right" ? "50%" : "150%",
            opacity: transitionDirection === "right" ? "1" : "0",
            transition: "left 0.2s ease-in-out, opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
        });
        this.currentImageIndex = imageIndex;
    }
}
//# sourceMappingURL=MainImageViewer.js.map