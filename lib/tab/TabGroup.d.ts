import { Dom } from "@commonmodule/app";
import Tab from "./Tab.js";
export default class TabGroup<T> extends Dom<HTMLDivElement, {
    tabSelected: (value: T) => void;
}> {
    private store?;
    private background;
    private tabs;
    private selectedTab?;
    constructor(id?: string | Tab<T>, ...tabs: Tab<T>[]);
    private updateTabBackgroundOnSelect;
    init(): this;
    getSelectedValue(): T | undefined;
    addTab(tab: Tab<T>): void;
    selectTab(value: T): this;
    removeTab(value: T): void;
}
//# sourceMappingURL=TabGroup.d.ts.map