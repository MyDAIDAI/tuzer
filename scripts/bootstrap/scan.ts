import Packages from "./packages";
import fs from "fs";
import path from "path";
import { Package } from "./package";

function* walk(pattern: RegExp, dir: string, exclude: RegExp): Generator<any> {
  const files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
    loadProjects;
    const file = files[i];
    const fullname = path.resolve(dir, file);
    if (fullname.match(exclude)) {
      continue;
    }
    if (fullname.match(pattern)) {
      yield [file, dir];
    }
    if (fs.statSync(fullname).isDirectory()) {
      yield* walk(pattern, fullname, exclude);
    }
  }
}

export function loadProjects(): Packages {
  //todo: 精简包安装，只安装packages里面的包，最后再对整个外部的包进行安装
  const result = [
    ...walk(
      /package\.json$/,
      path.resolve(__dirname, "../../packages"),
      /(node_modules|\.git)/
    ),
  ];
  return new Packages(result.map(([file, dir]) => new Package(file, dir)));
}
