import { DomNode, el, Store } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import Tab from "./Tab.js";

export default class TabGroup<T> extends DomNode<HTMLDivElement, {
  tabSelected: (value: T) => void;
}> {
  private store?: Store;
  private background: DomNode;
  private tabs: Tab<T>[] = [];
  private selectedTab?: Tab<T>;

  constructor(id?: string | Tab<T>, ...tabs: Tab<T>[]) {
    super(".tab-group");

    if (typeof id === "string") {
      this.store = new Store(`tab-group-${id}`);
    } else if (id) {
      tabs.unshift(id);
    }

    this.background = el(".background").appendTo(this);

    for (const tab of tabs) {
      this.addTab(tab);
    }

    this.onWindow("resize", () => this.updateTabBackgroundOnSelect());
  }

  public init(): this {
    const storedValue = this.store?.get<T>("selected");
    if (storedValue) {
      this.selectTab(storedValue);
    } else {
      this.tabs[0]?.select();
    }
    return this;
  }

  public getSelectedValue(): T | undefined {
    return this.selectedTab?.getValue();
  }

  public updateTabBackgroundOnSelect(): void {
    if (this.selectedTab) {
      AppCompConfig.updateTabBackgroundOnSelect(
        this.background,
        this.selectedTab,
      );
    }
  }

  public addTab(tab: Tab<T>): void {
    tab.on("selected", () => {
      if (this.selectedTab === tab) return;

      this.selectedTab?.deselect();
      this.selectedTab = tab;

      this.store?.setPermanent("selected", tab.getValue());

      this.updateTabBackgroundOnSelect();
      this.emit("tabSelected", tab.getValue());
    });

    this.tabs.push(tab);
    this.append(tab);
  }

  public selectTab(value: T): void {
    const foundTab = this.tabs.find((tab) => tab.getValue() === value);
    if (foundTab) foundTab.select();
    else this.tabs[0]?.select();
  }

  public removeTab(value: T): void {
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
