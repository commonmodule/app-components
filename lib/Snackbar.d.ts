import { DomNode } from "@commonmodule/app";
interface SnackbarOptions {
    message: string;
    duration?: number;
}
export default class Snackbar extends DomNode {
    private timeoutId?;
    private totalDuration;
    private startTime;
    private remainingTime;
    constructor(options: SnackbarOptions);
    private createSnackbarContent;
    private addEventListeners;
    private startDismissTimer;
    private pauseDismissTimer;
    private resumeDismissTimer;
    remove(): void;
}
export {};
//# sourceMappingURL=Snackbar.d.ts.map