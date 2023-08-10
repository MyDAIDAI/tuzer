import path from "path";
import * as fs from "fs";
import { runCmd } from "./cmdRunner";
import chalk from "chalk";

type TuzerProjectType = "service" | "app" | "lib" | "cli";

interface IPackageJson {
  name: string;
  version: [number, number, number];
  main: string;
  tuzer?: {
    devLinks?: string[]; // 本地需要link的项目名称
    type?: TuzerProjectType;
    port?: number;
    bootstrap?: string;
    localInstall?: boolean;
  };
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
    this.json = _json;
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

  /**
   * 运行dev命令
   */
  public async startDev() {
    switch (this.getTuzerType()) {
      case "app":
        await this.exec("npm run dev");
        break;
      default:
        console.error(
          chalk.red(`You cannot start an [${this.getTuzerType()}]`)
        );
    }
  }
  /**
   * 获取项目名称
   * 备注：以get开头的名称都是轻量级获取方法，不能进行大量计算
   * @returns 项目配置名称
   */
  public getName(): string {
    return this.json.name;
  }

  /**
   * 获取项目版本号
   * @returns 项目版本号
   */
  public getVersion(): [number, number, number] {
    return this.json.version;
  }

  /**
   * 获取项目类型
   * @returns string
   */
  public getTuzerType(): TuzerProjectType {
    return this.json.tuzer?.type;
  }
}
