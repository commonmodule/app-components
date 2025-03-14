import { el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import Button, { ButtonType } from "../button/Button.js";
import Modal from "../modal/Modal.js";
import ImageInfo from "./ImageInfo.js";
import MainImageViewer from "./MainImageViewer.js";
import ThumbnailList from "./ThumbnailList.js";

export default class ImageViewer extends Modal {
  private mainImageViewer: MainImageViewer;
  private thumbnailList: ThumbnailList;

  constructor(options: { images: ImageInfo[]; initialIndex: number }) {
    super(".image-viewer");
    this.append(
      el(
        "header",
        el(
          ".button-container.left",
          new Button(".share", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ShareIcon(),
          }),
        ),
        el(".image-counter"),
        el(
          ".button-container.right",
          new Button(".fullscreen", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.FullscreenIcon(),
          }),
          new Button(".share", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ShareIcon(),
          }),
          new Button(".close", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.CloseIcon(),
          }),
        ),
        { onclick: (event) => event.stopPropagation() },
      ),
      new Button(".prev", {
        type: ButtonType.Icon,
        icon: new AppCompConfig.PrevIcon(),
        onClick: (button, event) => {
          event.stopPropagation();
        },
      }),
      this.mainImageViewer = new MainImageViewer(
        options.images[options.initialIndex].imageUrl,
      ),
      new Button(".next", {
        type: ButtonType.Icon,
        icon: new AppCompConfig.NextIcon(),
        onClick: (button, event) => {
          event.stopPropagation();
        },
      }),
      el(
        ".zoom-controls",
        new Button(".zoom-in", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.ZoomInIcon(),
        }),
        new Button(".zoom-out", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.ZoomOutIcon(),
        }),
        new Button(".reset-zoom", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.ResetZoomIcon(),
        }),
        { onclick: (event) => event.stopPropagation() },
      ),
      this.thumbnailList = new ThumbnailList({
        thumbnailUrls: options.images.map((image) => image.thumbnailUrl),
        initialIndex: options.initialIndex,
      }),
    );

    this.mainImageViewer.onDom("click", (event) => event.stopPropagation());
    this.thumbnailList.onDom("click", (event) => event.stopPropagation());
  }
}
