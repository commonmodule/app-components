import Modal from "../modal/Modal.js";
import ImageList from "./ImageList.js";
import ThumbnailList from "./ThumbnailList.js";
export default class ImageViewer extends Modal {
    constructor(options) {
        super(".image-viewer");
        this.append(new ImageList({
            imageUrls: options.images.map((image) => image.imageUrl),
            initialIndex: options.initialIndex,
        }), new ThumbnailList({
            thumbnailUrls: options.images.map((image) => image.thumbnailUrl),
            initialIndex: options.initialIndex,
        }));
    }
}
//# sourceMappingURL=ImageViewer.js.map