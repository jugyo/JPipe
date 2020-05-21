import * as vscode from "vscode";
import { exec } from "child_process";

export const commandFilePath = `${process.env.HOME}/.vscode/jpipe.json`;

const terminalName = "JPipe";
export const runInTerminal = (command: string) => {
  const terminal =
    vscode.window.terminals.find((t) => t.name === terminalName) ||
    vscode.window.createTerminal(terminalName);

  terminal.show();
  terminal.sendText(command);
};

const history: string[] = [];
const historyLimit = 10;
export const updateHistory = (command: string) => {
  history.splice(historyLimit, history.length - historyLimit);
  history.unshift(command);
};

export const getIndexInHistory = (command: string) => {
  const index = history.indexOf(command);
  return index >= 0 ? index : Number.POSITIVE_INFINITY;
};

export async function execute(command: string): Promise<string[]> {
  return new Promise(function (resolve, reject) {
    exec(command, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        const result = stdout.split(/\s+/).filter((i) => i.length > 0);
        resolve(result);
      }
    });
  });
}
