import { DomNode, el } from "@common-module/app";
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
export default class MainImageViewer extends DomNode {
    imageUrls = [];
    currentImageIndex = 0;
    prevImage;
    currentImage;
    nextImage;
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
        this.prevImage?.style({ left: "0", opacity: "0", transition: "none" });
        this.currentImage.style({ left: "50%", opacity: "1", transition: "none" });
        this.nextImage?.style({ left: "100%", opacity: "0", transition: "none" });
    }
    updateTransform() {
    }
    startDrag(event) {
        event.preventDefault();
    }
    drag(event) {
    }
    endDrag() {
    }
    zoomIn() {
    }
    zoomOut() {
    }
    resetZoom() {
    }
    handleWheelZoom(event) {
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
            transition: "left 0.2s ease-in-out, opacity 0.2s ease-in-out",
        });
        this.currentImage.style({
            left: transitionDirection === "right" ? "0" : "100%",
            opacity: "0",
            transition: "left 0.2s ease-in-out, opacity 0.2s ease-in-out",
        });
        this.nextImage?.style({
            left: transitionDirection === "right" ? "50%" : "150%",
            opacity: transitionDirection === "right" ? "1" : "0",
            transition: "left 0.2s ease-in-out, opacity 0.2s ease-in-out",
        });
        this.currentImageIndex = imageIndex;
    }
}
//# sourceMappingURL=MainImageViewer.js.map