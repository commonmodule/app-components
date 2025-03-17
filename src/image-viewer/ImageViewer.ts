import { Browser, DomNode, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import Button, { ButtonType } from "../button/Button.js";
import Modal from "../modal/Modal.js";
import ImageResource from "./ImageResource.js";
import MainImageDisplay from "./MainImageDisplay.js";
import ThumbnailList from "./ThumbnailList.js";

export default class ImageViewer extends Modal {
  private images: ImageResource[] = [];
  private currentImageIndex = 0;

  private container: DomNode;
  private imageCounter: DomNode;
  private mainImageDisplay: MainImageDisplay;
  private thumbnailList: ThumbnailList;

  constructor(options: { images: ImageResource[]; initialIndex: number }) {
    super(".image-viewer");

    this.images = options.images;
    this.currentImageIndex = options.initialIndex;

    this.append(
      this.container = el(
        ".container",
        el(
          "header",
          this.createButtonContainer("left"),
          this.imageCounter = el(
            ".image-counter",
            `${this.currentImageIndex + 1} / ${this.images.length}`,
          ),
          this.createButtonContainer("right"),
          { onclick: (event) => event.stopPropagation() },
        ),
        new Button(".prev", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.PrevIcon(),
          onClick: (button, event) => {
            event.stopPropagation();
            this.goToPrevImage();
          },
        }),
        this.mainImageDisplay = new MainImageDisplay({
          imageUrls: this.images.map((image) => image.imageUrl),
          initialIndex: options.initialIndex,
        }),
        new Button(".next", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.NextIcon(),
          onClick: (button, event) => {
            event.stopPropagation();
            this.goToNextImage();
          },
        }),
        el(
          ".zoom-controls",
          new Button(".zoom-in", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ZoomInIcon(),
            onClick: () => this.mainImageDisplay.zoomIn(),
          }),
          new Button(".zoom-out", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ZoomOutIcon(),
            onClick: () => this.mainImageDisplay.zoomOut(),
          }),
          new Button(".reset-zoom", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ResetZoomIcon(),
            onClick: () => this.mainImageDisplay.resetZoom(),
          }),
          { onclick: (event) => event.stopPropagation() },
        ),
        el(
          "footer",
          this.thumbnailList = new ThumbnailList({
            thumbnailUrls: options.images.map((image) => image.thumbnailUrl),
            initialIndex: options.initialIndex,
          }),
        ),
      ),
    );

    this.mainImageDisplay
      .onDom("click", (event) => event.stopPropagation())
      .on("swipeLeft", () => this.goToNextImage())
      .on("swipeRight", () => this.goToPrevImage());

    this.thumbnailList
      .onDom("click", (event) => event.stopPropagation())
      .on("thumbnailSelected", (index) => this.goToImage(index));

    this.onWindow("keydown", (event) => {
      if (event.key === "ArrowLeft") this.goToPrevImage();
      else if (event.key === "ArrowRight") this.goToNextImage();
    });
  }

  private createButtonContainer(position: "left" | "right"): DomNode {
    return el(
      `.button-container.${position}`,
      position === "right"
        ? new Button(".fullscreen", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.FullscreenIcon(),
          onClick: () => this.toggleFullscreen(),
        })
        : undefined,
      new Button(".share", {
        type: ButtonType.Icon,
        icon: new AppCompConfig.ShareIcon(),
        onClick: () => this.shareCurrentImage(),
      }),
      new Button(".download", {
        type: ButtonType.Icon,
        icon: new AppCompConfig.DownloadIcon(),
        onClick: () => this.downloadCurrentImage(),
      }),
      position === "right"
        ? new Button(".close", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.CloseIcon(),
          onClick: () => this.remove(),
        })
        : undefined,
    );
  }

  private shareCurrentImage() {
    const image = this.images[this.currentImageIndex];
    Browser.share({ title: "Shared Image", url: image.imageUrl });
  }

  private downloadCurrentImage() {
    const image = this.images[this.currentImageIndex];
    Browser.download(image.imageUrl);
  }

  private toggleFullscreen() {
    if (!Browser.isFullscreen()) {
      Browser.enterFullscreen(this.container);
    } else {
      Browser.exitFullscreen();
    }
  }

  private goToImage(
    imageIndex: number,
    transitionDirection?: "left" | "right",
  ) {
    this.mainImageDisplay.goToImage(imageIndex, transitionDirection);
    this.currentImageIndex = imageIndex;
    this.imageCounter.text = `${imageIndex + 1} / ${this.images.length}`;
    this.thumbnailList.selectThumbnail(imageIndex);
  }

  private goToPrevImage() {
    this.goToImage(
      this.currentImageIndex <= 0
        ? this.images.length - 1
        : this.currentImageIndex - 1,
      "left",
    );
  }

  private goToNextImage() {
    this.goToImage(
      this.currentImageIndex >= this.images.length - 1
        ? 0
        : this.currentImageIndex + 1,
      "right",
    );
  }
}
