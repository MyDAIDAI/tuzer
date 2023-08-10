import parser from "yargs-parser";
import { loadProjects } from "./scan";
import chalk from "chalk";

const argv = parser(process.argv.slice(2));
const cmd = argv._[0];

const projects = loadProjects();
async function run() {
  switch (cmd) {
    // 重新安装所有包
    case "reinstall":
      console.log("cmd: " + cmd);
      projects.install();
      break;
    // 本地开发命令，后面需要接项目名称参数
    case "dev":
      let name = argv.name;
      if (!name) {
        console.error(chalk.red("You should specify project name!"));
        // printHelper()
        break;
      }

      // 匹配@tuzer开头字符，没有该字符则加上
      if (!name.match(/^@tuzer/)) {
        name = "@tuzer/" + name;
      }
      console.log("name", name);

      // 找到该项目
      let pkg = projects.find(name);
      // if (!pkg) {
      //   console.error(chalk.red(`the project: ${name} is not found!`))
      //   // todo: 控制台打印所有项目列表，让用户进行交互式选择
      //   break;
      // }
      pkg.startDev();
  }
}
run();
console.log("argv: ", argv);
