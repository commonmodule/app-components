import { DomNode } from "@common-module/app";
interface TabOptions {
    label: string;
}
export default class Tab extends DomNode<HTMLDivElement, {
    selected: () => void;
    deselected: () => void;
}> {
    constructor(options: TabOptions);
    select(): void;
    deselect(): void;
}
export {};
//# sourceMappingURL=Tab.d.ts.map