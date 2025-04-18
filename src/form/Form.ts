import { DomChild, DomNode } from "@commonmodule/app";

export default class Form extends DomNode {
  constructor(...children: DomChild[]) {
    super(".form", ...children);
  }
}
