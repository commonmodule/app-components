import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";

export default class ErrorAlert extends Alert {
  constructor(options: {
    title: string;
    message: string;
    confirmButtonTitle?: string;
    onConfirm?: () => void;
  }) {
    super(".error-alert", {
      icon: new AppCompConfig.ErrorAlertIcon(),
      ...options,
    });
  }
}
