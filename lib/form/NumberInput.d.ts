import { DomNode } from "@common-module/app";
interface NumberInputOptions {
    label?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    readOnly?: boolean;
    autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
    onKeyDown?: (event: KeyboardEvent) => void;
    onChange?: (newValue: string) => void;
    onClick?: (input: NumberInput) => void;
}
export default class NumberInput extends DomNode<HTMLLabelElement, {
    valueChanged: (newValue: string) => void;
}> {
    private input;
    private previousValue;
    constructor(options?: NumberInputOptions);
    constructor(classNames?: `.${string}`, options?: NumberInputOptions);
    private handleNumberInput;
    get value(): string;
    set value(value: string);
    get readOnly(): boolean;
    set readOnly(readOnly: boolean);
    focus(): void;
}
export {};
//# sourceMappingURL=NumberInput.d.ts.map