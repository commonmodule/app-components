import { DomNode } from "@common-module/app";
interface InputOptions {
    multiline?: boolean;
    label?: string;
    placeholder?: string;
    suffixIcon?: DomNode;
    required?: boolean;
    value?: string;
    readOnly?: boolean;
    autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
    onKeyDown?: (event: KeyboardEvent) => void;
    onChange?: (value: string) => void;
}
export default class Input extends DomNode<HTMLLabelElement, {
    valueChanged: (value: string) => void;
}> {
    private input;
    private previousValue;
    constructor(options: InputOptions);
    constructor(classNames: `.${string}`, options: InputOptions);
    private handleInput;
    get value(): string;
    set value(value: string);
    focus(): void;
}
export {};
//# sourceMappingURL=Input.d.ts.map