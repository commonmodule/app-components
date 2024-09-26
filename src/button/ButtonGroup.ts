import { DomChild, DomNode } from "@common-module/app";

export default class ButtonGroup extends DomNode {
  constructor(...children: DomChild[]) {
    super(".button-group", ...children);
  }
}
