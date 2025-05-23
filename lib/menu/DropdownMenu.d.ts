import { Dom, DomChild } from "@commonmodule/app";
interface DropdownMenuOptions {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
export default class DropdownMenu extends Dom {
    private _options;
    private header;
    private main;
    private footer;
    constructor(options: DropdownMenuOptions);
    constructor(classNames: `.${string}`, options: DropdownMenuOptions);
    private adjustPosition;
    appendToHeader(...children: DomChild<HTMLDivElement>[]): this;
    appendToMain(...children: DomChild<HTMLDivElement>[]): this;
    appendToFooter(...children: DomChild<HTMLDivElement>[]): this;
}
export {};
//# sourceMappingURL=DropdownMenu.d.ts.map