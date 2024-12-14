import { DomChild } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import AlertDialog from "./AlertDialog.js";

export default class ErrorDialog extends AlertDialog {
  constructor(options: {
    title: string;
    message: string | DomChild | DomChild[];
    confirmButtonTitle?: string;
    onConfirm?: () => any;
  }) {
    super(".error-dialog", {
      icon: new AppCompConfig.ErrorIcon(),
      ...options,
    });
  }
}
