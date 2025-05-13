import { Dom, DomChild } from "@commonmodule/app";
export declare enum ButtonType {
    Text = "text",
    Contained = "contained",
    Outlined = "outlined",
    Icon = "icon"
}
export interface ButtonOptions {
    type?: ButtonType;
    icon?: Dom;
    iconPosition?: "left" | "right";
    title?: string | DomChild | DomChild[];
    disabled?: boolean;
    onPress?: (button: Button, event: MouseEvent) => any;
}
export default class Button extends Dom<HTMLButtonElement, {
    pressed: () => Promise<void>;
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
    set icon(icon: Dom | undefined);
    get icon(): Dom | undefined;
    disable(): this;
    enable(): this;
    startLoading(): this;
    stopLoading(): this;
}
//# sourceMappingURL=Button.d.ts.map