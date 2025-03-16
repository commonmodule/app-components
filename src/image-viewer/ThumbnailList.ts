import { DomNode } from "@common-module/app";
import ThumbnailListItem from "./ThumbnailListItem.js";

export default class ThumbnailList extends DomNode<HTMLDivElement, {
  thumbnailSelected: (thumbnailIndex: number) => void;
}> {
  declare public children: ThumbnailListItem[];

  private selectedThumbnailIndex?: number;

  constructor(options: { thumbnailUrls: string[]; initialIndex: number }) {
    super(".thumbnail-list");
    for (const [index, thumbnailUrl] of options.thumbnailUrls.entries()) {
      const item = new ThumbnailListItem(thumbnailUrl);
      item.onDom("click", () => {
        this.selectThumbnail(index);
        this.emit("thumbnailSelected", index);
      });
      this.append(item);
    }

    this.selectThumbnail(options.initialIndex);
  }

  public selectThumbnail(index: number): void {
    if (this.selectedThumbnailIndex === index) return;
    if (this.selectedThumbnailIndex !== undefined) {
      this.children[this.selectedThumbnailIndex]?.deselect();
    }
    this.selectedThumbnailIndex = index;
    this.children[index]?.select();
  }
}
