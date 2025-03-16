import { DomNode } from "@common-module/app";
import ThumbnailListItem from "./ThumbnailListItem.js";
export default class ThumbnailList extends DomNode<HTMLDivElement, {
    thumbnailSelected: (thumbnailIndex: number) => void;
}> {
    children: ThumbnailListItem[];
    private selectedThumbnailIndex?;
    constructor(options: {
        thumbnailUrls: string[];
        initialIndex: number;
    });
    selectThumbnail(index: number): void;
}
//# sourceMappingURL=ThumbnailList.d.ts.map