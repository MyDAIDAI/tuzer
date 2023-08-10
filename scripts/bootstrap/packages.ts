import chalk from "chalk";
import { Package } from "./package";
import path from "path";

class Packages {
  packages: Array<Package>;
  package: Package;
  ver: [number, number, number];

  constructor(packages: Array<Package>) {
    this.package = new Package(
      "package.json",
      path.resolve(__dirname, "../../")
    );
    this.packages = packages;
  }

  public async reinstall() {}

  public install() {
    this.packages.forEach((pkg) => {
      pkg.npmInstall();
    });
  }

  public find(name: string): Package | null {
    return this.packages.find((x) => x.getName() === name);
  }
}

export default Packages;
