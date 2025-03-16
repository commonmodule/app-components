import Modal from "../modal/Modal.js";
import ImageInfo from "./ImageInfo.js";
export default class ImageViewer extends Modal {
    private images;
    private currentImageIndex;
    private container;
    private imageCounter;
    private mainImageViewer;
    private thumbnailList;
    constructor(options: {
        images: ImageInfo[];
        initialIndex: number;
    });
    private shareCurrentImage;
    private toggleFullscreen;
    private updateImage;
}
//# sourceMappingURL=ImageViewer.d.ts.map