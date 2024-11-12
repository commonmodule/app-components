import { DomChild } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";

export default class ErrorAlert extends Alert {
  constructor(options: {
    title: string;
    message: string | DomChild | DomChild[];
    confirmButtonTitle?: string;
    onConfirm?: () => Promise<void> | void;
  }) {
    super(".error-alert", {
      icon: new AppCompConfig.ErrorAlertIcon(),
      ...options,
    });
  }
}
