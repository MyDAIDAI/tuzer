import parser from "yargs-parser";

const argv = parser(process.argv.slice(2));
const cmd = argv._[0];


// const projects = loadProjects()
async function run() {
  switch (cmd) {
    case "reinstall":
      // projects.reinstall();
      break
  }
}
console.log("argv: ", argv);
