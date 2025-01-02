import { DomNode } from "@common-module/app";
interface CheckboxOptions {
    label?: string;
    required?: boolean;
}
export default class Checkbox extends DomNode<HTMLLabelElement, {
    valueChanged: (newValue: string) => void;
}> {
    private input;
    constructor(options?: CheckboxOptions);
    constructor(classNames?: `.${string}`, options?: CheckboxOptions);
}
export {};
//# sourceMappingURL=Checkbox.d.ts.map