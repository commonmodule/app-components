import { DomNode } from "@common-module/app";
export interface DropdownMenuItemOptions {
    icon?: DomNode;
    label: string;
    onClick: () => void;
}
export default class DropdownMenuItem extends DomNode {
    constructor(options: DropdownMenuItemOptions);
}
//# sourceMappingURL=DropdownMenuItem.d.ts.map