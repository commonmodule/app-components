import { DomNode } from "@common-module/app";
interface InputOptions {
    multiline?: boolean;
    label?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    readOnly?: boolean;
}
export default class Input extends DomNode<HTMLLabelElement, {
    valueChanged: (value: string) => void;
}> {
    private input;
    private previousValue;
    constructor(options: InputOptions);
    private handleInput;
    get value(): string;
    set value(value: string);
    focus(): void;
}
export {};
//# sourceMappingURL=Input.d.ts.map