import { DomNode } from "@common-module/app";

export default class ThumbnailListItem extends DomNode {
  constructor(thumbnailUrl: string) {
    super(".thumbnail-list-item");
  }
}
