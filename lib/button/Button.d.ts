import { DomNode } from "@common-module/app";
export declare enum ButtonType {
    Text = "text",
    Contained = "contained",
    Outlined = "outlined",
    Circle = "circle"
}
interface ButtonOptions {
    type?: ButtonType;
    icon?: DomNode;
    title?: string;
    onClick?: (button: Button, event: MouseEvent) => void;
}
export default class Button extends DomNode<HTMLButtonElement> {
    constructor(options: ButtonOptions);
    constructor(classNames: `.${string}`, options: ButtonOptions);
}
export {};
//# sourceMappingURL=Button.d.ts.map