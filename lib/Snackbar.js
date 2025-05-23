import { AppRoot, Dom, el } from "@commonmodule/app";
import AppCompConfig from "./AppCompConfig.js";
import Button, { ButtonType } from "./button/Button.js";
export default class Snackbar extends Dom {
    timeoutId;
    totalDuration;
    startTime = 0;
    remainingTime;
    constructor(options) {
        super(".snackbar");
        this.totalDuration = options.duration ?? 5000;
        this.remainingTime = this.totalDuration;
        this.createSnackbarContent(options.message);
        this.addEventListeners();
        AppRoot.append(this);
        this.startDismissTimer();
    }
    createSnackbarContent(message) {
        this.append(el("p", message), el(".button-container", new Button(".close", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.CloseIcon(),
            onPress: () => this.remove(),
        })));
    }
    addEventListeners() {
        this.on("mouseover", this.pauseDismissTimer);
        this.on("mouseout", this.resumeDismissTimer);
    }
    startDismissTimer() {
        this.startTime = Date.now();
        this.timeoutId = window.setTimeout(() => this.remove(), this.remainingTime);
    }
    pauseDismissTimer = () => {
        if (this.timeoutId !== undefined) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
            const elapsedTime = Date.now() - this.startTime;
            this.remainingTime -= elapsedTime;
            if (this.remainingTime <= 0) {
                this.remove();
            }
        }
    };
    resumeDismissTimer = () => {
        if (this.timeoutId === undefined && this.remainingTime > 0) {
            this.startDismissTimer();
        }
    };
    remove() {
        if (this.timeoutId !== undefined) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
        super.remove();
    }
}
//# sourceMappingURL=Snackbar.js.map