import { DomNode, el } from "@common-module/app";

export default class MainImageViewer extends DomNode {
  constructor(imageUrl: string) {
    super(".main-image-viewer");
    this.append(
      el("img", { src: imageUrl }),
    );
  }
}
