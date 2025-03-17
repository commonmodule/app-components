import Modal from "../modal/Modal.js";
import ImageInfo from "./ImageInfo.js";
export default class ImageViewer extends Modal {
    private images;
    private currentImageIndex;
    private container;
    private imageCounter;
    private mainImageDisplay;
    private thumbnailList;
    constructor(options: {
        images: ImageInfo[];
        initialIndex: number;
    });
    private shareCurrentImage;
    private downloadCurrentImage;
    private toggleFullscreen;
    private goToImage;
    private prevImage;
    private nextImage;
}
//# sourceMappingURL=ImageViewer.d.ts.map