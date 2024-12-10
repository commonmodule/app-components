import { DomNode } from "@common-module/app";
import Tab from "./Tab.js";
interface TabsOptions {
}
export default class Tabs extends DomNode {
    children: Tab[];
    constructor(options: TabsOptions, ...tabs: Tab[]);
}
export {};
//# sourceMappingURL=Tabs.d.ts.map