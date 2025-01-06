import { DomNode } from "@common-module/app";
import Tab from "./Tab.js";
export default class TabGroup<Value> extends DomNode<HTMLDivElement, {
    tabSelected: (value: Value) => void;
}> {
    private store;
    private background;
    private tabs;
    private selectedTab;
    constructor(id?: string | Tab<Value>, ...tabs: Tab<Value>[]);
    init(): this;
    getSelectedValue(): Value | undefined;
    addTab(tab: Tab<Value>): void;
    selectTab(value: Value): void;
}
//# sourceMappingURL=TabGroup.d.ts.map