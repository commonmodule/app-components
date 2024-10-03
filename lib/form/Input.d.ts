import { DomNode } from "@common-module/app";
interface InputOptions {
    multiline?: boolean;
    label?: string;
    placeholder?: string;
    required?: boolean;
}
export default class Input extends DomNode<HTMLLabelElement> {
    constructor(options: InputOptions);
}
export {};
//# sourceMappingURL=Input.d.ts.map