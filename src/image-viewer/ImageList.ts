import { DomNode } from "@common-module/app";

export default class ImageList extends DomNode {
  constructor(options: { imageUrls: string[]; initialIndex: number }) {
    super(".image-list");
  }
}
