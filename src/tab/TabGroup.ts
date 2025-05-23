import { AppRoot, Dom, el, Store } from "@commonmodule/app";
import AppCompConfig from "../AppCompConfig.js";
import Tab from "./Tab.js";

export default class TabGroup<T> extends Dom<HTMLDivElement, {
  tabSelected: (value: T) => void;
}> {
  private store?: Store;
  private background: Dom;
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

    this.on("visible", () => this.init());
    AppRoot.bind(this, "resize", () => this.updateTabBackgroundOnSelect());
  }

  private init(): this {
    const storedValue = this.store?.get<T>("selected");
    if (storedValue) {
      this.selectTab(storedValue);
    } else {
      this.tabs[0]?.select();
    }
    return this;
  }

  private updateTabBackgroundOnSelect(): void {
    if (this.selectedTab) {
      AppCompConfig.updateTabBackgroundOnSelect(
        this.background,
        this.selectedTab,
      );
    }
  }

  public getSelectedValue(): T | undefined {
    return this.selectedTab?.getValue();
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

  public selectTab(value: T): this {
    const foundTab = this.tabs.find((tab) => tab.getValue() === value);
    if (foundTab) foundTab.select();
    else this.tabs[0]?.select();
    return this;
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
