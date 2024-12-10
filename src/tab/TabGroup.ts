import { DomNode, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import Tab from "./Tab.js";

export default class TabGroup<Value> extends DomNode<HTMLDivElement, {
  tabSelected: (value: Value) => void;
}> {
  private background: DomNode;
  private tabs: Tab<Value>[] = [];
  private selectedTab: Tab<Value> | undefined;

  constructor(...tabs: Tab<Value>[]) {
    super(".tab-group");
    this.background = el(".background").appendTo(this);

    for (const tab of tabs) {
      this.addTab(tab);
    }

    this.on("visible", () => this.tabs[0]?.select());
  }

  public getSelectedValue(): Value | undefined {
    return this.selectedTab?.getValue();
  }

  public addTab(tab: Tab<Value>) {
    tab.on("selected", () => {
      if (this.selectedTab === tab) return;
      this.selectedTab?.deselect();
      this.selectedTab = tab;

      AppCompConfig.updateTabBackgroundOnSelect(this.background, tab);

      this.emit("tabSelected", tab.getValue());
    });

    this.tabs.push(tab);
    this.append(tab);
  }
}
