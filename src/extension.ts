import * as vscode from "vscode";
import { edit } from "./commands/edit";
import { run } from "./commands/run";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.jpipe.edit", edit),
    vscode.commands.registerCommand("extension.jpipe.run", run)
  );
}

export function deactivate() {}
