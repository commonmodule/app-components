import { Dom } from "@commonmodule/app";
interface SelectOptions {
    label?: string;
    placeholder: string;
    required?: boolean;
    options: {
        value: string;
        label: string;
    }[];
    value?: string;
    onChange?: (value: string) => void;
}
export default class Select extends Dom<HTMLLabelElement> {
    private select;
    constructor(options: SelectOptions);
    get value(): string;
    set value(value: string);
}
export {};
//# sourceMappingURL=Select.d.ts.map