import { DomNode } from "@common-module/app";
import Tab from "./Tab.js";
export default class TabGroup<Value> extends DomNode<HTMLDivElement, {
    tabSelected: (value: Value) => void;
}> {
    private background;
    private tabs;
    private selectedTab;
    constructor(...tabs: Tab<Value>[]);
    getSelectedValue(): Value | undefined;
    addTab(tab: Tab<Value>): void;
}
//# sourceMappingURL=TabGroup.d.ts.map