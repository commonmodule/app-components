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
    private navigateToImage;
    private shareCurrentImage;
    private toggleFullscreen;
}
//# sourceMappingURL=ImageViewer.d.ts.map