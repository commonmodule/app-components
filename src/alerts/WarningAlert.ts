import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";

export default class WarningAlert extends Alert {
  constructor(message: string) {
    super(".warning", {
      icon: new AppCompConfig.WarningIcon(),
      message,
    });
  }
}
