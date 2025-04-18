import { DomNode, el } from "@commonmodule/app";

export default class ThumbnailListItem extends DomNode {
  constructor(thumbnailUrl: string) {
    super(".thumbnail-list-item");
    this.append(el("img", { src: thumbnailUrl }));
  }

  public select(): void {
    this.addClass("selected");
  }

  public deselect(): void {
    this.removeClass("selected");
  }
}
