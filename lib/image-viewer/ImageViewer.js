import { AppRoot, Browser, el } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";
import Button, { ButtonType } from "../button/Button.js";
import Modal from "../modal/Modal.js";
import MainImageDisplay from "./MainImageDisplay.js";
import ThumbnailList from "./ThumbnailList.js";
export default class ImageViewer extends Modal {
    images = [];
    currentImageIndex = 0;
    container;
    imageCounter;
    mainImageDisplay;
    thumbnailList;
    constructor(options) {
        super(".image-viewer");
        this.images = options.images;
        this.currentImageIndex = options.initialIndex;
        this.append(this.container = el(".container", el("header", this.createButtonContainer("left"), this.imageCounter = el(".image-counter", `${this.currentImageIndex + 1} / ${this.images.length}`), this.createButtonContainer("right"), { onclick: (event) => event.stopPropagation() }), new Button(".prev", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.PrevIcon(),
            onClick: (button, event) => {
                event.stopPropagation();
                this.goToPrevImage();
            },
        }), this.mainImageDisplay = new MainImageDisplay({
            imageUrls: this.images.map((image) => image.imageUrl),
            initialIndex: options.initialIndex,
        }), new Button(".next", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.NextIcon(),
            onClick: (button, event) => {
                event.stopPropagation();
                this.goToNextImage();
            },
        }), el(".zoom-controls", new Button(".zoom-in", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ZoomInIcon(),
            onClick: () => this.mainImageDisplay.zoomIn(),
        }), new Button(".zoom-out", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ZoomOutIcon(),
            onClick: () => this.mainImageDisplay.zoomOut(),
        }), new Button(".reset-zoom", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ResetZoomIcon(),
            onClick: () => this.mainImageDisplay.resetZoom(),
        }), { onclick: (event) => event.stopPropagation() }), el("footer", this.thumbnailList = new ThumbnailList({
            thumbnailUrls: options.images.map((image) => image.thumbnailUrl),
            initialIndex: options.initialIndex,
        }))));
        this.mainImageDisplay
            .on("click", (event) => event.stopPropagation())
            .on("swipeLeft", () => this.goToNextImage())
            .on("swipeRight", () => this.goToPrevImage());
        this.thumbnailList
            .on("click", (event) => event.stopPropagation())
            .on("thumbnailSelected", (index) => this.goToImage(index));
        AppRoot.bind(this, "keydown", (event) => {
            if (event.key === "ArrowLeft")
                this.goToPrevImage();
            else if (event.key === "ArrowRight")
                this.goToNextImage();
        });
    }
    createButtonContainer(position) {
        return el(`.button-container.${position}`, position === "right"
            ? new Button(".fullscreen", {
                type: ButtonType.Icon,
                icon: new AppCompConfig.FullscreenIcon(),
                onClick: () => this.toggleFullscreen(),
            })
            : undefined, new Button(".share", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ShareIcon(),
            onClick: () => this.shareCurrentImage(),
        }), new Button(".download", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.DownloadIcon(),
            onClick: () => this.downloadCurrentImage(),
        }), position === "right"
            ? new Button(".close", {
                type: ButtonType.Icon,
                icon: new AppCompConfig.CloseIcon(),
                onClick: () => this.remove(),
            })
            : undefined);
    }
    shareCurrentImage() {
        const image = this.images[this.currentImageIndex];
        Browser.share({ title: "Shared Image", url: image.imageUrl });
    }
    downloadCurrentImage() {
        const image = this.images[this.currentImageIndex];
        Browser.download(image.imageUrl);
    }
    toggleFullscreen() {
        if (!Browser.isFullscreen()) {
            Browser.enterFullscreen(this.container);
        }
        else {
            Browser.exitFullscreen();
        }
    }
    goToImage(imageIndex, transitionDirection) {
        this.mainImageDisplay.goToImage(imageIndex, transitionDirection);
        this.currentImageIndex = imageIndex;
        this.imageCounter.text = `${imageIndex + 1} / ${this.images.length}`;
        this.thumbnailList.selectThumbnail(imageIndex);
    }
    goToPrevImage() {
        this.goToImage(this.currentImageIndex <= 0
            ? this.images.length - 1
            : this.currentImageIndex - 1, "left");
    }
    goToNextImage() {
        this.goToImage(this.currentImageIndex >= this.images.length - 1
            ? 0
            : this.currentImageIndex + 1, "right");
    }
}
//# sourceMappingURL=ImageViewer.js.map