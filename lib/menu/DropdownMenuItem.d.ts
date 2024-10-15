import { DomNode } from "@common-module/app";
interface DropdownMenuItemOptions {
    label: string;
    onClick: () => void;
}
export default class DropdownMenuItem extends DomNode {
    constructor(options: DropdownMenuItemOptions);
}
export {};
//# sourceMappingURL=DropdownMenuItem.d.ts.map