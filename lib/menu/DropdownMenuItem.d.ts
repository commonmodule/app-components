import { Dom } from "@commonmodule/app";
export interface DropdownMenuItemOptions {
    icon?: Dom;
    label?: string;
    onPress?: () => void;
}
export default class DropdownMenuItem extends Dom {
    constructor(options: DropdownMenuItemOptions);
}
//# sourceMappingURL=DropdownMenuItem.d.ts.map