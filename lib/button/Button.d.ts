import { DomChild, DomNode } from "@common-module/app";
export declare enum ButtonType {
    Text = "text",
    Contained = "contained",
    Outlined = "outlined",
    Icon = "icon"
}
export interface ButtonOptions {
    type?: ButtonType;
    icon?: DomNode;
    iconPosition?: "left" | "right";
    title?: string | DomChild | DomChild[];
    disabled?: boolean;
    onClick?: (button: Button, event: MouseEvent) => any;
}
export default class Button extends DomNode<HTMLButtonElement, {
    click: () => Promise<void> | void;
}> {
    private options;
    private iconContainer;
    private titleContainer;
    private loadingSpinner;
    private loading;
    constructor(options: ButtonOptions);
    constructor(classNames: `.${string}`, options: ButtonOptions);
    set title(title: string | DomChild | DomChild[]);
    get title(): string;
    disable(): this;
    enable(): this;
    startLoading(): this;
    stopLoading(): this;
}
//# sourceMappingURL=Button.d.ts.map