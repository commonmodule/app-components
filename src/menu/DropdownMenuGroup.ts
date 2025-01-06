import { DomNode } from "@common-module/app";
import DropdownMenuItem from "./DropdownMenuItem.js";

export default class DropdownMenuGroup extends DomNode {
  constructor(...items: DropdownMenuItem[]) {
    super(".dropdown-menu-group", ...items);
  }
}
