import { exec } from "child_process";
import chalk from "chalk";

export function runCmd(
  command: string,
  options,
  slient = false
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const proc = exec(command, options);
      proc.stdout.on("data", (chunk) => {
        console.log(`【${options.cwd}】: ${chunk}`);
      });
      proc.stderr.on("data", (chunk) => {
        console.log(chalk.red(`【${options.cwd}】: ${chunk}`));
      });
      proc.on("close", () => {
        resolve();
      });
    } catch (ex) {
      if (slient) {
        console.log(ex.message);
        resolve();
        return;
      }
      console.log(chalk.red(`【${options.cwd}】: ${ex}`));
      reject(ex);
    }
  });
}
