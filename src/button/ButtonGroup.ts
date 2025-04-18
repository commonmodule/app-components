import { DomNode } from "@commonmodule/app";
import Button from "./Button.js";

export default class ButtonGroup extends DomNode {
  constructor(...buttons: Button[]) {
    super(".button-group", ...buttons);
  }
}
