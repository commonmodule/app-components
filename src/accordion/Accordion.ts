import { DomNode } from "@commonmodule/app";

export default class Accordion extends DomNode {
  constructor(...children: DomNode[]) {
    super(".accordion", ...children);
  }
}
