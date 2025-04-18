import { DomNode } from "@commonmodule/app";
interface QuantityInputOptions {
    label?: string;
    placeholder?: string;
    required?: boolean;
    value?: number;
    min?: number;
    max?: number;
    readOnly?: boolean;
    onChange?: (newValue: number) => void;
}
export default class QuantityInput extends DomNode<HTMLLabelElement, {
    valueChanged: (newValue: number) => void;
}> {
    private options;
    private minusButton;
    private input;
    private plusButton;
    private previousValue;
    constructor(options?: QuantityInputOptions);
    constructor(classNames?: `.${string}`, options?: QuantityInputOptions);
    private handleQuantityInput;
    get value(): number | undefined;
    set value(value: number | undefined);
    get readOnly(): boolean;
    set readOnly(readOnly: boolean);
    focus(): void;
}
export {};
//# sourceMappingURL=QuantityInput.d.ts.map