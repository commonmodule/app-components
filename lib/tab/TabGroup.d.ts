import { DomNode } from "@commonmodule/app";
import Tab from "./Tab.js";
export default class TabGroup<T> extends DomNode<HTMLDivElement, {
    tabSelected: (value: T) => void;
}> {
    private store?;
    private background;
    private tabs;
    private selectedTab?;
    constructor(id?: string | Tab<T>, ...tabs: Tab<T>[]);
    init(): this;
    getSelectedValue(): T | undefined;
    updateTabBackgroundOnSelect(): void;
    addTab(tab: Tab<T>): void;
    selectTab(value: T): void;
    removeTab(value: T): void;
}
//# sourceMappingURL=TabGroup.d.ts.map