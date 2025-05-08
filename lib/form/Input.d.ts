import { Dom } from "@commonmodule/app";
interface InputOptions {
    multiline?: boolean;
    label?: string;
    placeholder?: string;
    suffixIcon?: Dom;
    required?: boolean;
    value?: string;
    readOnly?: boolean;
    autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
    debounceDelay?: number;
    onKeyDown?: (event: KeyboardEvent) => void;
    onChange?: (newValue: string) => void;
    onClick?: (input: Input) => void;
}
export default class Input extends Dom<HTMLLabelElement, {
    valueChanged: (newValue: string) => void;
}> {
    private input;
    private previousValue;
    private inputChangeDebouncer?;
    constructor(options?: InputOptions);
    constructor(classNames?: `.${string}`, options?: InputOptions);
    private emitValueChangeIfNeeded;
    private onInputEvent;
    get value(): string;
    set value(value: string);
    get readOnly(): boolean;
    set readOnly(readOnly: boolean);
    focus(): void;
}
export {};
//# sourceMappingURL=Input.d.ts.map