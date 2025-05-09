import { Dom } from "@commonmodule/app";
interface CheckboxOptions {
    label?: string;
    required?: boolean;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}
export default class Checkbox extends Dom<HTMLLabelElement, {
    valueChanged: (newValue: boolean) => void;
}> {
    private input;
    constructor(options?: CheckboxOptions);
    constructor(classNames?: `.${string}`, options?: CheckboxOptions);
    isChecked(): boolean;
    set checked(value: boolean);
    get checked(): boolean;
}
export {};
//# sourceMappingURL=Checkbox.d.ts.map