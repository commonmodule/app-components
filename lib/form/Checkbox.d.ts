import { DomNode } from "@common-module/app";
interface CheckboxOptions {
    label?: string;
    required?: boolean;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}
export default class Checkbox extends DomNode<HTMLLabelElement, {
    valueChanged: (newValue: boolean) => void;
}> {
    private input;
    constructor(options?: CheckboxOptions);
    constructor(classNames?: `.${string}`, options?: CheckboxOptions);
    isChecked(): boolean;
}
export {};
//# sourceMappingURL=Checkbox.d.ts.map