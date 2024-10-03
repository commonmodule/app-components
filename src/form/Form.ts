import { DomChild, DomNode } from "@common-module/app";

export default class Form extends DomNode {
  constructor(...children: DomChild[]) {
    super(".form", ...children);
  }
}
