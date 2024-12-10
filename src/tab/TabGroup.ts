import { DomNode, el } from "@common-module/app";
import Tab from "./Tab.js";

export default class TabGroup extends DomNode {
  private tabBackground: DomNode;
  private tabs: Tab[] = [];
  private selectedTab: Tab | undefined;

  constructor(...tabs: Tab[]) {
    super(".tab-group");
    this.tabBackground = el(".tab-background").appendTo(this);

    for (const tab of tabs) {
      this.addTab(tab);
    }

    this.on("visible", () => this.tabs[0]?.select());
  }

  public addTab(tab: Tab) {
    tab.on("selected", () => {
      if (this.selectedTab === tab) return;
      this.selectedTab?.deselect();
      this.selectedTab = tab;

      const tabGroupRect = this.calculateRect();
      const tabRect = tab.calculateRect();
      const rightInset = tabGroupRect.width - tabRect.left - tabRect.width;

      this.tabBackground.style({
        clipPath:
          `inset(0px ${rightInset}px 0px ${tabRect.left}px round 9999px)`,
      });
    });

    this.tabs.push(tab);
    this.append(tab);
  }
}
