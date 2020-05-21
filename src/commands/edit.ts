import * as vscode from "vscode";
import * as fs from "fs-extra";
import { commandFilePath } from "../helper";

const template = `
{
  "Open Sibling": [
    "ls ..",
    "code %"
  ],
  "Switch branch": [
    "git for-each-ref --count=30 --sort=-committerdate refs/heads/ --format='%(refname:short)'",
    "git checkout %"
  ]
}
`;

export async function edit() {
  if (!fs.existsSync(commandFilePath)) {
    await fs.outputFile(commandFilePath, template);
  }

  const doc = await vscode.workspace.openTextDocument(
    vscode.Uri.file(commandFilePath)
  );
  vscode.window.showTextDocument(doc);
}
