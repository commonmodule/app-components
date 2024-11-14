import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";

export default class SuccessAlert extends Alert {
  constructor(message: string) {
    super(".success", {
      icon: new AppCompConfig.SuccessIcon(),
      message,
    });
  }
}
