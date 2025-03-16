import { DomNode, el } from "@common-module/app";

export default class ThumbnailListItem extends DomNode<HTMLDivElement, {
  selected: () => void;
  deselected: () => void;
}> {
  constructor(thumbnailUrl: string) {
    super(".thumbnail-list-item");
    this.append(el("img", { src: thumbnailUrl }));
    this.onDom("click", () => this.select());
  }

  public select(): void {
    this.addClass("selected");
    this.emit("selected");
  }

  public deselect(): void {
    this.removeClass("selected");
    this.emit("deselected");
  }
}
