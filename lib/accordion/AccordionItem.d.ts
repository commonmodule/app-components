import { DomNode } from "@commonmodule/app";
interface AccordionItemOptions {
    label: string;
    open?: boolean;
}
export default class AccordionItem extends DomNode<HTMLDetailsElement> {
    private iconContainer;
    constructor(options: AccordionItemOptions, ...children: DomNode[]);
}
export {};
//# sourceMappingURL=AccordionItem.d.ts.map