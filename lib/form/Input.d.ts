import { DomNode } from "@common-module/app";
interface InputOptions {
    multiline?: boolean;
    label?: string;
    placeholder?: string;
    required?: boolean;
}
export default class Input extends DomNode<HTMLLabelElement> {
    private input;
    constructor(options: InputOptions);
    get value(): string;
    set value(value: string);
}
export {};
//# sourceMappingURL=Input.d.ts.map