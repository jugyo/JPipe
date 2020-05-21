# JPipe

VSCode Extension to pipe shell commands.

## Commands

- `JPipe: Run` runs command you select
- `JPipe: Edit` opens `~/.vscode/jpipe.json` that contains all commands

Example of `~/.vscode/jpipe.json`:

```
{
  "Open Sibling": [
    "ls ..",
    "code %"
  ],
  "Switch branch": [
    "git for-each-ref --count=30 --sort=-committerdate refs/heads/ --format='%(refname:short)'",
    "git checkout %"
  ],
}
```

`%` will be replace with the active file path or empty string when no active file
