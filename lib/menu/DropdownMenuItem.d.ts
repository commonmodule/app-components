import { DomNode } from "@commonmodule/app";
export interface DropdownMenuItemOptions {
    icon?: DomNode;
    label?: string;
    onClick: () => void;
}
export default class DropdownMenuItem extends Dom {
    constructor(options: DropdownMenuItemOptions);
}
//# sourceMappingURL=DropdownMenuItem.d.ts.map