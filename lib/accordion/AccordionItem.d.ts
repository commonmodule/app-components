import { Dom } from "@commonmodule/app";
interface AccordionItemOptions {
    label: string;
    open?: boolean;
}
export default class AccordionItem extends Dom<HTMLDetailsElement> {
    private iconContainer;
    constructor(options: AccordionItemOptions, ...children: Dom[]);
}
export {};
//# sourceMappingURL=AccordionItem.d.ts.map