import { DomNode } from "@common-module/app";
export default class MainImageViewer extends DomNode {
    private image;
    private isDragging;
    private dragStartX;
    private dragStartY;
    private translateX;
    private translateY;
    constructor(imageUrl: string);
    private startDrag;
    private drag;
    private endDrag;
}
//# sourceMappingURL=MainImageViewer.d.ts.map