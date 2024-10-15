import { DomChild, DomNode } from "@common-module/app";
interface DropdownMenuOptions {
    left: number;
    top: number;
}
export default class DropdownMenu extends DomNode {
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