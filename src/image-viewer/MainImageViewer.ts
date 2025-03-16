import { DomNode, el } from "@common-module/app";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const DEFAULT_TRANSITION = "transform 0.2s ease-in-out";

export default class MainImageViewer extends DomNode<HTMLDivElement, {
  swipeLeft: () => void;
  swipeRight: () => void;
}> {
  private imageUrls: string[] = [];
  private currentImageIndex = 0;

  private prevImage?: DomNode<HTMLImageElement>;
  private currentImage: DomNode<HTMLImageElement>;
  private nextImage?: DomNode<HTMLImageElement>;

  private translateX = 0;
  private translateY = 0;
  private scale = 1;

  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;

  private initialDistance = 0;
  private initialScale = 1;

  private swipeStartX = 0;
  private swipeThreshold = 100;
  private isSwipeInProgress = false;

  private lastTap = 0;
  private doubleTapDelay = 300;

  constructor(options: { imageUrls: string[]; initialIndex: number }) {
    super(".main-image-viewer");

    this.imageUrls = options.imageUrls;
    this.currentImageIndex = options.initialIndex;

    if (this.imageUrls.length > 1) {
      this.prevImage = el("img.prev");
      this.nextImage = el("img.next");
    }

    this.append(
      this.prevImage,
      this.currentImage = el("img.current"),
      this.nextImage,
    );
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

  private resetImages() {
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
      transition: DEFAULT_TRANSITION,
    });
    this.currentImage.style({
      left: "50%",
      opacity: "1",
      transition: DEFAULT_TRANSITION,
    });
    this.nextImage?.style({
      left: "100%",
      opacity: "0",
      transition: DEFAULT_TRANSITION,
    });
  }

  private updateTransform() {
    this.currentImage.style({
      transform:
        `translate(calc(-50% + ${this.translateX}px), calc(-50% + ${this.translateY}px)) scale(${this.scale})`,
    });
  }

  private startDrag(event: MouseEvent) {
    event.preventDefault();
    if (this.scale > 1) {
      this.isDragging = true;
      this.dragStartX = event.clientX - this.translateX;
      this.dragStartY = event.clientY - this.translateY;
      this.currentImage.style({ cursor: "grabbing", transition: "none" });
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
    if (this.isDragging) {
      this.isDragging = false;
      this.currentImage.style({
        cursor: "auto",
        transition: DEFAULT_TRANSITION,
      });
    }
  }

  private getDistance(touches: TouchList): number {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private startTouch(event: TouchEvent): void {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTap;

    if (
      tapLength < this.doubleTapDelay && tapLength > 0 &&
      event.touches.length === 1
    ) {
      event.preventDefault();
      this.toggleZoom();
      this.isDragging = false;
      this.lastTap = 0;
      return;
    }

    this.lastTap = currentTime;

    if (event.touches.length === 1 && this.scale === 1) {
      this.swipeStartX = event.touches[0].clientX;
      this.isSwipeInProgress = true;
    } else if (event.touches.length >= 2) {
      event.preventDefault();
      this.initialDistance = this.getDistance(event.touches);
      this.initialScale = this.scale;
    } else if (this.scale > 1) {
      event.preventDefault();
      this.isDragging = true;
      this.dragStartX = event.touches[0].clientX - this.translateX;
      this.dragStartY = event.touches[0].clientY - this.translateY;
      this.currentImage.style({ transition: "none" });
    }
  }

  private moveTouch(event: TouchEvent): void {
    if (
      this.isSwipeInProgress && event.touches.length === 1 && this.scale === 1
    ) {
      const currentX = event.touches[0].clientX;
      const deltaX = currentX - this.swipeStartX;
      if (Math.abs(deltaX) > 10) {
        event.preventDefault();
      }
    } else if (event.touches.length >= 2) {
      event.preventDefault();
      const currentDistance = this.getDistance(event.touches);
      if (this.initialDistance > 0) {
        let newScale = (currentDistance / this.initialDistance) *
          this.initialScale;
        newScale = Math.max(1, Math.min(newScale, 3));
        this.scale = newScale;
        this.updateTransform();
      }
    } else if (this.isDragging && this.scale > 1) {
      event.preventDefault();
      this.translateX = event.touches[0].clientX - this.dragStartX;
      this.translateY = event.touches[0].clientY - this.dragStartY;
      this.updateTransform();
    }
  }

  private endTouch(event: TouchEvent): void {
    if (this.isSwipeInProgress && this.scale === 1) {
      const currentX = event.changedTouches
        ? event.changedTouches[0].clientX
        : 0;
      const deltaX = currentX - this.swipeStartX;

      if (Math.abs(deltaX) >= this.swipeThreshold) {
        if (deltaX > 0) this.emit("swipeRight");
        else if (deltaX < 0) this.emit("swipeLeft");
      }

      this.isSwipeInProgress = false;
    } else if (event.touches.length === 0) {
      this.initialDistance = 0;
    } else if (this.isDragging && this.scale > 1) {
      this.isDragging = false;
      this.currentImage.style({ transition: DEFAULT_TRANSITION });
    }
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

  public toggleZoom(): void {
    if (this.scale > 1) {
      this.resetZoom();
    } else {
      this.scale = 2;
      this.updateTransform();
    }
  }

  private handleWheelZoom(event: WheelEvent) {
    event.preventDefault();

    this.scale -= event.deltaY / 100;
    this.scale = Math.max(MIN_ZOOM, Math.min(this.scale, MAX_ZOOM));
    this.updateTransform();
  }

  public updateImage(
    imageIndex: number,
    transitionDirection?: "left" | "right",
  ) {
    if (imageIndex === this.currentImageIndex) return;

    this.resetZoom();

    if (!transitionDirection) {
      transitionDirection = imageIndex < this.currentImageIndex
        ? "left"
        : "right";
    }

    if (
      imageIndex - this.currentImageIndex < -1 && transitionDirection === "left"
    ) {
      const prevImageUrl = imageIndex + 1 <= 0
        ? this.imageUrls[this.imageUrls.length - 1]
        : this.imageUrls[imageIndex];
      if (this.prevImage) this.prevImage.htmlElement.src = prevImageUrl;
    } else if (
      imageIndex - this.currentImageIndex > 1 && transitionDirection === "right"
    ) {
      const nextImageUrl = imageIndex - 1 >= this.imageUrls.length - 1
        ? this.imageUrls[0]
        : this.imageUrls[imageIndex];
      if (this.nextImage) this.nextImage.htmlElement.src = nextImageUrl;
    }

    this.prevImage?.style({
      left: transitionDirection === "right" ? "-50%" : "50%",
      opacity: transitionDirection === "right" ? "0" : "1",
      transition:
        `left 0.2s ease-in-out, opacity 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
    });
    this.currentImage.style({
      left: transitionDirection === "right" ? "0" : "100%",
      opacity: "0",
      transition:
        `left 0.2s ease-in-out, opacity 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
    });
    this.nextImage?.style({
      left: transitionDirection === "right" ? "50%" : "150%",
      opacity: transitionDirection === "right" ? "1" : "0",
      transition:
        `left 0.2s ease-in-out, opacity 0.2s ease-in-out, ${DEFAULT_TRANSITION}`,
    });

    this.currentImageIndex = imageIndex;
  }
}
