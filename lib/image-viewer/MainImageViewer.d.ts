import { DomNode } from "@common-module/app";
export default class MainImageViewer extends DomNode {
    private imageUrls;
    private currentImageIndex;
    private prevImage?;
    private currentImage;
    private nextImage?;
    private isDragging;
    private dragStartX;
    private dragStartY;
    private translateX;
    private translateY;
    private scale;
    private initialDistance;
    private initialScale;
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
    private handleWheelZoom;
    updateImage(imageIndex: number, transitionDirection?: "left" | "right"): void;
}
//# sourceMappingURL=MainImageViewer.d.ts.map