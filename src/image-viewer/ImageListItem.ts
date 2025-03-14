import { DomNode } from "@common-module/app";

export default class ImageListItem extends DomNode {
  constructor(imageUrl: string) {
    super(".image-list-item");
  }
}
