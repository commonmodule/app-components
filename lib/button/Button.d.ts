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
    iconPosition?: "left" | "right";
    title?: DomNode | string;
    disabled?: boolean;
    onClick?: (button: Button, event: MouseEvent) => Promise<void> | DomNode | void;
}
export default class Button extends DomNode<HTMLButtonElement> {
    private options;
    private iconContainer;
    private loadingSpinner;
    constructor(options: ButtonOptions);
    constructor(classNames: `.${string}`, options: ButtonOptions);
    disable(): this;
    enable(): this;
    startLoading(): this;
    stopLoading(): this;
}
export {};
//# sourceMappingURL=Button.d.ts.map