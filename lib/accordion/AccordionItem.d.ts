import { DomNode } from "@common-module/app";
interface AccordionItemOptions {
    icon?: DomNode;
    label: string;
}
export default class AccordionItem extends DomNode {
    constructor(options: AccordionItemOptions, ...children: DomNode[]);
}
export {};
//# sourceMappingURL=AccordionItem.d.ts.map