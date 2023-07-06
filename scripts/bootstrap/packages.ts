import {Package} from "./package";
import path from "path";

class Packages {
  packages: Array<Package>;
  package: Package;
  ver: [number, number, number];

  constructor(packages: Array<Package>) {
    this.package = new Package("package.json", path.resolve(__dirname, '../../x'));
  }
}