import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";

export default class ErrorAlert extends Alert {
  constructor(message: string) {
    super(".error", {
      icon: new AppCompConfig.ErrorIcon(),
      message,
    });
  }
}
