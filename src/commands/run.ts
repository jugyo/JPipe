import * as vscode from "vscode";
import * as fs from "fs-extra";
import {
  commandFilePath,
  execute,
  runInTerminal,
  getIndexInHistory,
  updateHistory,
  getCwd,
} from "../helper";

async function loadData() {
  const data = await fs.readFile(commandFilePath, "utf8");
  return JSON.parse(data);
}

export async function run() {
  const data = await loadData();
  let keys = Object.keys(data);
  keys = keys.sort((a, b) => getIndexInHistory(a) - getIndexInHistory(b));
  const key = await vscode.window.showQuickPick(keys);
  if (!key) {
    return;
  }

  updateHistory(key);

  const cwd = getCwd();

  let arg: string | undefined;
  const commands = data[key] as string[];
  for (const [index, command] of commands.entries()) {
    const _command = arg ? command.replace("%", arg) : command;
    if (index < commands.length - 1) {
      const result = await execute(_command, cwd);
      arg = await vscode.window.showQuickPick(result);
      if (!arg) {
        break;
      }
    } else {
      runInTerminal(_command);
    }
  }
}
