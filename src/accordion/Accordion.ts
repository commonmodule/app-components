import { DomNode } from "@common-module/app";

export default class Accordion extends DomNode {
  constructor(...children: DomNode[]) {
    super(".accordion", ...children);
  }
}
