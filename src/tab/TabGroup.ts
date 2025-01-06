import { DomNode, el, Store } from "@common-module/app";
import { KebabCase } from "../../../ts-module/lib/index.js";
import AppCompConfig from "../AppCompConfig.js";
import Tab from "./Tab.js";

export default class TabGroup<Value> extends DomNode<HTMLDivElement, {
  tabSelected: (value: Value) => void;
}> {
  private store: Store<string> | undefined;
  private background: DomNode;
  private tabs: Tab<Value>[] = [];
  private selectedTab: Tab<Value> | undefined;

  constructor(id?: string | Tab<Value>, ...tabs: Tab<Value>[]) {
    super(".tab-group");
    if (typeof id === "string") {
      this.store = new Store(`tab-group-${id}` as KebabCase<string>);
    } else if (id) {
      tabs.unshift(id);
    }

    this.background = el(".background").appendTo(this);

    for (const tab of tabs) {
      this.addTab(tab);
    }
  }

  public init() {
    const storedValue = this.store?.get<Value>("selected");
    if (storedValue) this.selectTab(storedValue);
    else this.tabs[0]?.select();
    return this;
  }

  public getSelectedValue(): Value | undefined {
    return this.selectedTab?.getValue();
  }

  public addTab(tab: Tab<Value>) {
    tab.on("selected", () => {
      if (this.selectedTab === tab) return;
      this.selectedTab?.deselect();
      this.selectedTab = tab;
      this.store?.setPermanent("selected", tab.getValue());

      AppCompConfig.updateTabBackgroundOnSelect(this.background, tab);

      this.emit("tabSelected", tab.getValue());
    });

    this.tabs.push(tab);
    this.append(tab);
  }

  public selectTab(value: Value) {
    const tab = this.tabs.find((t) => t.getValue() === value);
    if (tab) tab.select();
  }
}
