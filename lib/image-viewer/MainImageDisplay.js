import { Browser, el } from "@commonmodule/app";
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;
const DEFAULT_TRANSITION = "transform 0.2s ease-in-out";
const DOUBLE_TAP_DELAY = 300;
export default class MainImageDisplay extends Dom {
    imageUrls = [];
    currentImageIndex = 0;
    prevImage;
    currentImage;
    nextImage;
    translateX = 0;
    translateY = 0;
    scale = 1;
    isDragging = false;
    dragStartX = 0;
    dragStartY = 0;
    initialDistance = 0;
    initialScale = 1;
    swipeStartX = 0;
    swipeThreshold = 40;
    isSwipeInProgress = false;
    lastTapTimestamp = 0;
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
        this.currentImage.onDom("touchstart", (event) => this.startTouch(event));
        this.onWindow("touchmove", (event) => this.moveTouch(event));
        this.onWindow("touchend", (event) => this.endTouch(event));
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
            left: Browser.isMobileDevice() ? "-50%" : "0",
            opacity: Browser.isMobileDevice() ? undefined : "0",
            transition: DEFAULT_TRANSITION,
        });
        this.currentImage.style({
            left: "50%",
            opacity: Browser.isMobileDevice() ? undefined : "1",
            transition: DEFAULT_TRANSITION,
        });
        this.nextImage?.style({
            left: Browser.isMobileDevice() ? "150%" : "100%",
            opacity: Browser.isMobileDevice() ? undefined : "0",
            transition: DEFAULT_TRANSITION,
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
                transition: DEFAULT_TRANSITION,
            });
        }
    }
    getDistance(touches) {
        if (touches.length < 2)
            return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
    startTouch(event) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - this.lastTapTimestamp;
        if (tapLength < DOUBLE_TAP_DELAY && tapLength > 0 &&
            event.touches.length === 1) {
            event.preventDefault();
            this.toggleZoom();
            this.isDragging = false;
            this.lastTapTimestamp = 0;
            return;
        }
        this.lastTapTimestamp = currentTime;
        if (event.touches.length === 1 && this.scale === 1) {
            this.swipeStartX = event.touches[0].clientX;
            this.isSwipeInProgress = true;
        }
        else if (event.touches.length >= 2) {
            event.preventDefault();
            this.initialDistance = this.getDistance(event.touches);
            this.initialScale = this.scale;
        }
        else if (this.scale > 1) {
            event.preventDefault();
            this.isDragging = true;
            this.dragStartX = event.touches[0].clientX - this.translateX;
            this.dragStartY = event.touches[0].clientY - this.translateY;
            this.currentImage.style({ transition: "none" });
        }
    }
    moveTouch(event) {
        if (this.isSwipeInProgress && event.touches.length === 1 && this.scale === 1) {
            if (this.imageUrls.length > 1) {
                const currentX = event.touches[0].clientX;
                const swipeTranslateX = currentX - this.swipeStartX;
                this.prevImage?.style({
                    transition: "none",
                    left: `calc(${Browser.isMobileDevice() ? -50 : 0}% + ${swipeTranslateX}px)`,
                });
                this.currentImage.style({
                    transition: "none",
                    left: `calc(50% + ${swipeTranslateX}px)`,
                });
                this.nextImage?.style({
                    transition: "none",
                    left: `calc(${Browser.isMobileDevice() ? 150 : 100}% + ${swipeTranslateX}px)`,
                });
            }
        }
        else if (event.touches.length >= 2) {
            const currentDistance = this.getDistance(event.touches);
            if (this.initialDistance > 0) {
                let newScale = (currentDistance / this.initialDistance) *
                    this.initialScale;
                newScale = Math.max(MIN_ZOOM, Math.min(newScale, MAX_ZOOM));
                this.scale = newScale;
                this.updateTransform();
            }
        }
        else if (this.isDragging && this.scale > 1) {
            this.translateX = event.touches[0].clientX - this.dragStartX;
            this.translateY = event.touches[0].clientY - this.dragStartY;
            this.updateTransform();
        }
    }
    endTouch(event) {
        if (this.isSwipeInProgress && this.scale === 1) {
            const currentX = event.changedTouches
                ? event.changedTouches[0].clientX
                : 0;
            const deltaX = currentX - this.swipeStartX;
            if (Math.abs(deltaX) >= this.swipeThreshold) {
                if (deltaX > 0)
                    this.emit("swipeRight");
                else if (deltaX < 0)
                    this.emit("swipeLeft");
            }
            else {
                this.prevImage?.style({
                    transition: `left 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
                    left: Browser.isMobileDevice() ? "-50%" : "0%",
                });
                this.currentImage.style({
                    transition: `left 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
                    left: "50%",
                });
                this.nextImage?.style({
                    transition: `left 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
                    left: Browser.isMobileDevice() ? "150%" : "100%",
                });
            }
            this.isSwipeInProgress = false;
        }
        else if (event.touches.length === 0) {
            this.initialDistance = 0;
        }
        else if (this.isDragging && this.scale > 1) {
            this.isDragging = false;
            this.currentImage.style({ transition: DEFAULT_TRANSITION });
        }
    }
    zoomIn() {
        this.scale = Math.min(this.scale + ZOOM_STEP, MAX_ZOOM);
        this.updateTransform();
    }
    zoomOut() {
        this.scale = Math.max(this.scale - ZOOM_STEP, MIN_ZOOM);
        this.updateTransform();
    }
    resetZoom() {
        this.currentImage.style({ transition: DEFAULT_TRANSITION });
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }
    toggleZoom() {
        if (this.scale > 1) {
            this.resetZoom();
        }
        else {
            this.scale = 2;
            this.updateTransform();
        }
    }
    handleWheelZoom(event) {
        event.preventDefault();
        this.scale -= event.deltaY / 100;
        this.scale = Math.max(MIN_ZOOM, Math.min(this.scale, MAX_ZOOM));
        this.updateTransform();
    }
    goToImage(imageIndex, transitionDirection) {
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
            left: Browser.isMobileDevice()
                ? (transitionDirection === "right" ? "-100%" : "50%")
                : (transitionDirection === "right" ? "-50%" : "50%"),
            opacity: Browser.isMobileDevice()
                ? undefined
                : (transitionDirection === "right" ? "0" : "1"),
            transition: `left 0.2s ease-in-out, opacity 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
        });
        this.currentImage.style({
            left: Browser.isMobileDevice()
                ? (transitionDirection === "right" ? "-50%" : "150%")
                : (transitionDirection === "right" ? "0" : "100%"),
            opacity: Browser.isMobileDevice() ? undefined : "0",
            transition: `left 0.2s ease-in-out, opacity 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
        });
        this.nextImage?.style({
            left: Browser.isMobileDevice()
                ? (transitionDirection === "right" ? "50%" : "200%")
                : (transitionDirection === "right" ? "50%" : "150%"),
            opacity: Browser.isMobileDevice()
                ? undefined
                : (transitionDirection === "right" ? "1" : "0"),
            transition: `left 0.2s ease-in-out, opacity 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
        });
        this.currentImageIndex = imageIndex;
    }
}
//# sourceMappingURL=MainImageDisplay.js.map