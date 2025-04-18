import { DomNode } from "@commonmodule/app";
interface TabOptions<Value> {
    label: string;
    value: Value;
    openContextMenu?: (left: number, top: number) => DomNode;
}
export default class Tab<Value> extends DomNode<HTMLDivElement, {
    selected: () => void;
    deselected: () => void;
}> {
    private options;
    constructor(options: TabOptions<Value>);
    getValue(): Value;
    select(): void;
    deselect(): void;
}
export {};
//# sourceMappingURL=Tab.d.ts.map