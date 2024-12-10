import { DomNode } from "@common-module/app";
import Tab from "./Tab.js";
export default class TabGroup extends DomNode {
    private tabBackground;
    private tabs;
    private selectedTab;
    constructor(...tabs: Tab[]);
    addTab(tab: Tab): void;
}
//# sourceMappingURL=TabGroup.d.ts.map