import chalk from "chalk";
import { Package } from "./package";
import path from "path";
import fs from "fs";

class Packages {
  packages: Array<Package>;
  package: Package;
  ver: [number, number, number];
  marks: any;

  constructor(packages: Array<Package>) {
    this.package = new Package(
      "package.json",
      path.resolve(__dirname, "../../")
    );
    this.packages = packages.filter(
      (pkg) =>
        ["service", "app", "lib", "cli"].indexOf(pkg.getTuzerType()) !== -1
    );
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

  public async installLinks() {
    const links = new Set();
    // 找到需要link的项目，执行yarn link命令
    for (let pkg of this.packages) {
      const devLinks = pkg.getDevLinks();
      for (let link of devLinks) {
        if (!links.has(link)) {
          const pkgToLink = this.find(link);
          if (!pkgToLink) {
            throw new Error(`Could not find package ${link} to link!`);
          }
          await pkgToLink.link();
        }
        links.add(link);
      }
    }
    for (let pkg of this.packages) {
      pkg.linkDev();
    }
    this.marks["linked"] = true;
  }

  public saveMark() {
    fs.writeFileSync(
      path.resolve(__dirname, "../../.tuzer"),
      JSON.stringify(this.marks, null, 2),
      "utf-8"
    );
  }
}

export default Packages;
