import { Dom } from "@commonmodule/app";
import DropdownMenuItem from "./DropdownMenuItem.js";

export default class DropdownMenuGroup extends Dom {
  constructor(...items: DropdownMenuItem[]) {
    super(".dropdown-menu-group", ...items);
  }
}
