import { DomNode, el } from "@common-module/app";
export default class TabGroup extends DomNode {
    tabBackground;
    tabs = [];
    selectedTab;
    constructor(...tabs) {
        super(".tab-group");
        this.tabBackground = el(".tab-background").appendTo(this);
        for (const tab of tabs) {
            this.addTab(tab);
        }
        this.on("visible", () => this.tabs[0]?.select());
    }
    addTab(tab) {
        tab.on("selected", () => {
            if (this.selectedTab === tab)
                return;
            this.selectedTab?.deselect();
            this.selectedTab = tab;
            const tabGroupRect = this.calculateRect();
            const tabRect = tab.calculateRect();
            const rightInset = tabGroupRect.width - tabRect.left - tabRect.width;
            this.tabBackground.style({
                clipPath: `inset(0px ${rightInset}px 0px ${tabRect.left}px round 9999px)`,
            });
        });
        this.tabs.push(tab);
        this.append(tab);
    }
}
//# sourceMappingURL=TabGroup.js.map