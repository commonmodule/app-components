import { DomNode } from "@common-module/app";
import ImageInfo from "./ImageInfo.js";

export default class ThumbnailList extends DomNode {
  constructor(options: { thumbnailUrls: string[]; initialIndex: number }) {
    super(".thumbnail-list");
  }
}
