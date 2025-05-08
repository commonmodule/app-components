import { Dom } from "@commonmodule/app";
interface TabOptions<Value> {
    label: string;
    value: Value;
    openContextMenu?: (left: number, top: number) => Dom;
}
export default class Tab<Value> extends Dom<HTMLDivElement, {
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