import { Dom } from "@commonmodule/app";

export default class Accordion extends Dom {
  constructor(...children: Dom[]) {
    super(".accordion", ...children);
  }
}
