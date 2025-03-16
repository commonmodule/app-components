import { DomNode } from "@common-module/app";
export default class ThumbnailListItem extends DomNode<HTMLDivElement, {
    selected: () => void;
    deselected: () => void;
}> {
    constructor(thumbnailUrl: string);
    select(): void;
    deselect(): void;
}
//# sourceMappingURL=ThumbnailListItem.d.ts.map