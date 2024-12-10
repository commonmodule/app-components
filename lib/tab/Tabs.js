import { DomNode } from "@common-module/app";
export default class Tabs extends DomNode {
    children = [];
    constructor(options, ...tabs) {
        super(".tabs", ...tabs);
    }
}
//# sourceMappingURL=Tabs.js.map