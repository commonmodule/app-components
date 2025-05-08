import { Dom } from "@commonmodule/app";
import Button from "./Button.js";

export default class ButtonGroup extends Dom {
  constructor(...buttons: Button[]) {
    super(".button-group", ...buttons);
  }
}
