import { el, Store } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";
export default class TabGroup extends Dom {
    store;
    background;
    tabs = [];
    selectedTab;
    constructor(id, ...tabs) {
        super(".tab-group");
        if (typeof id === "string") {
            this.store = new Store(`tab-group-${id}`);
        }
        else if (id) {
            tabs.unshift(id);
        }
        this.background = el(".background").appendTo(this);
        for (const tab of tabs) {
            this.addTab(tab);
        }
        this.onWindow("resize", () => this.updateTabBackgroundOnSelect());
    }
    init() {
        const storedValue = this.store?.get("selected");
        if (storedValue) {
            this.selectTab(storedValue);
        }
        else {
            this.tabs[0]?.select();
        }
        return this;
    }
    getSelectedValue() {
        return this.selectedTab?.getValue();
    }
    updateTabBackgroundOnSelect() {
        if (this.selectedTab) {
            AppCompConfig.updateTabBackgroundOnSelect(this.background, this.selectedTab);
        }
    }
    addTab(tab) {
        tab.on("selected", () => {
            if (this.selectedTab === tab)
                return;
            this.selectedTab?.deselect();
            this.selectedTab = tab;
            this.store?.setPermanent("selected", tab.getValue());
            this.updateTabBackgroundOnSelect();
            this.emit("tabSelected", tab.getValue());
        });
        this.tabs.push(tab);
        this.append(tab);
    }
    selectTab(value) {
        const foundTab = this.tabs.find((tab) => tab.getValue() === value);
        if (foundTab)
            foundTab.select();
        else
            this.tabs[0]?.select();
    }
    removeTab(value) {
        const foundTab = this.tabs.find((tab) => tab.getValue() === value);
        if (foundTab) {
            foundTab.remove();
            if (this.selectedTab === foundTab) {
                this.selectedTab = undefined;
                this.tabs[0]?.select();
            }
            this.tabs = this.tabs.filter((tab) => tab.getValue() !== value);
        }
    }
}
//# sourceMappingURL=TabGroup.js.map