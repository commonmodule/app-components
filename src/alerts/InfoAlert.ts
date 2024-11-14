import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";

export default class InfoAlert extends Alert {
  constructor(message: string) {
    super(".info", {
      icon: new AppCompConfig.InfoIcon(),
      message,
    });
  }
}
