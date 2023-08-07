import path from "path";
import * as fs from "fs";
import { runCmd } from "./cmdRunner";
import chalk from "chalk";

interface IPackageJson {
  name: string;
  version: [number, number, number];
  main: string;
  dependencies: {
    [dep: string]: string;
  };
  devDependencies: {
    [dep: string]: string;
  };
}
export class Package {
  private json: IPackageJson;
  private fullname: string;
  private dir: string;

  constructor(file: string, dir: string) {
    this.fullname = path.resolve(dir, file);
    const _json = this.parseJSON(fs.readFileSync(this.fullname, "utf-8"));
    this.dir = dir;
  }

  private parseJSON(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error("parse json error: " + e + "fullname: " + this.fullname);
      throw e;
    }
  }

  private async exec(cmd: string, slient = false, envs = {}) {
    await runCmd(
      cmd,
      {
        env: {
          ...process.env,
          ...envs,
        },
        cwd: this.dir,
      },
      slient
    );
  }

  public async npmInstall() {
    await this.exec("yarn install");
  }

  /**
   * 清除装包缓存
   */
  public async npmClear() {
    await this.exec("rm -rf ./package-lock.json", true);
    await this.exec("rm -rf  ./node_modules", true);
  }

  /**
   * 清除包缓存后重新安装包
   * 重新安装package.json包
   */
  public async reNpmInstall() {
    await this.npmClear();
    await this.npmInstall();
  }
}
