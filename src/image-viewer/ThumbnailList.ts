import { DomNode } from "@common-module/app";

export default class ThumbnailList extends DomNode {
  constructor(options: { thumbnailUrls: string[]; initialIndex: number }) {
    super(".thumbnail-list");
    this.text = "TEST";
  }
}
