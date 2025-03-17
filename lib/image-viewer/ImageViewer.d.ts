import Modal from "../modal/Modal.js";
import ImageResource from "./ImageResource.js";
export default class ImageViewer extends Modal {
    private images;
    private currentImageIndex;
    private container;
    private imageCounter;
    private mainImageDisplay;
    private thumbnailList;
    constructor(options: {
        images: ImageResource[];
        initialIndex: number;
    });
    private createButtonContainer;
    private shareCurrentImage;
    private downloadCurrentImage;
    private toggleFullscreen;
    private goToImage;
    private goToPrevImage;
    private goToNextImage;
}
//# sourceMappingURL=ImageViewer.d.ts.map