import { DomNode } from "@commonmodule/app";
import DropdownMenuItem from "./DropdownMenuItem.js";

export default class DropdownMenuGroup extends DomNode {
  constructor(...items: DropdownMenuItem[]) {
    super(".dropdown-menu-group", ...items);
  }
}
