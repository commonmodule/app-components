import { DomNode } from "@common-module/app";
export default class MainImageViewer extends DomNode {
    private image;
    private isDragging;
    private dragStartX;
    private dragStartY;
    private translateX;
    private translateY;
    private scale;
    constructor(imageUrl: string);
    private updateTransform;
    private startDrag;
    private drag;
    private endDrag;
    zoomIn(): void;
    zoomOut(): void;
    resetZoom(): void;
    private handleWheelZoom;
    updateImage(imageUrl: string, direction: "left" | "right"): void;
}
//# sourceMappingURL=MainImageViewer.d.ts.map