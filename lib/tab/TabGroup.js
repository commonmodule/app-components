import { DomNode, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
export default class TabGroup extends DomNode {
    background;
    tabs = [];
    selectedTab;
    constructor(...tabs) {
        super(".tab-group");
        this.background = el(".background").appendTo(this);
        for (const tab of tabs) {
            this.addTab(tab);
        }
        this.on("visible", () => this.tabs[0]?.select());
    }
    getSelectedValue() {
        return this.selectedTab?.getValue();
    }
    addTab(tab) {
        tab.on("selected", () => {
            if (this.selectedTab === tab)
                return;
            this.selectedTab?.deselect();
            this.selectedTab = tab;
            AppCompConfig.updateTabBackgroundOnSelect(this.background, tab);
            this.emit("tabSelected", tab.getValue());
        });
        this.tabs.push(tab);
        this.append(tab);
    }
}
//# sourceMappingURL=TabGroup.js.map