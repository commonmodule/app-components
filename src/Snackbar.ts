import { AppRoot, Dom, el } from "@commonmodule/app";
import AppCompConfig from "./AppCompConfig.js";
import Button, { ButtonType } from "./button/Button.js";

interface SnackbarOptions {
  message: string;
  duration?: number;
}

export default class Snackbar extends Dom {
  private timeoutId?: number;
  private totalDuration: number;
  private startTime: number = 0;
  private remainingTime: number;

  constructor(options: SnackbarOptions) {
    super(".snackbar");

    this.totalDuration = options.duration ?? 5000;
    this.remainingTime = this.totalDuration;

    this.createSnackbarContent(options.message);
    this.addEventListeners();

    AppRoot.append(this);
    this.startDismissTimer();
  }

  private createSnackbarContent(message: string): void {
    this.append(
      el("p", message),
      el(
        ".button-container",
        new Button(".close", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.CloseIcon(),
          onClick: () => this.remove(),
        }),
      ),
    );
  }

  private addEventListeners(): void {
    this.on("mouseover", this.pauseDismissTimer);
    this.on("mouseout", this.resumeDismissTimer);
  }

  private startDismissTimer(): void {
    this.startTime = Date.now();
    this.timeoutId = window.setTimeout(() => this.remove(), this.remainingTime);
  }

  private pauseDismissTimer = (): void => {
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

  private resumeDismissTimer = (): void => {
    if (this.timeoutId === undefined && this.remainingTime > 0) {
      this.startDismissTimer();
    }
  };

  public remove(): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
    super.remove();
  }
}
