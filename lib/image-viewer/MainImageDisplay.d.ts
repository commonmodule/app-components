import { DomNode } from "@common-module/app";
export default class MainImageDisplay extends DomNode<HTMLDivElement, {
    swipeLeft: () => void;
    swipeRight: () => void;
}> {
    private imageUrls;
    private currentImageIndex;
    private prevImage?;
    private currentImage;
    private nextImage?;
    private translateX;
    private translateY;
    private scale;
    private isDragging;
    private dragStartX;
    private dragStartY;
    private initialDistance;
    private initialScale;
    private swipeStartX;
    private swipeThreshold;
    private isSwipeInProgress;
    private lastTap;
    constructor(options: {
        imageUrls: string[];
        initialIndex: number;
    });
    private resetImages;
    private updateTransform;
    private startDrag;
    private drag;
    private endDrag;
    private getDistance;
    private startTouch;
    private moveTouch;
    private endTouch;
    zoomIn(): void;
    zoomOut(): void;
    resetZoom(): void;
    toggleZoom(): void;
    private handleWheelZoom;
    goToImage(imageIndex: number, transitionDirection?: "left" | "right"): void;
}
//# sourceMappingURL=MainImageDisplay.d.ts.map