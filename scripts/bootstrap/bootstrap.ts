import parser from "yargs-parser";
import { loadProjects } from "./scan";

const argv = parser(process.argv.slice(2));
const cmd = argv._[0];

const projects = loadProjects();
async function run() {
  switch (cmd) {
    case "reinstall":
      console.log("cmd: " + cmd);
      projects.install();
      break;
  }
}
run();
console.log("argv: ", argv);
