# JPipe

VSCode Extension to pipe commands.

## Commands

- `JPipe: Run` runs command you select
- `JPipe: Edit` opens `~/.vscode/jpipe.json` that contains all commands

Example of `~/.vscode/jpipe.json`:

```json
{
  "Open Sibling": [
    "ls ..",
    "code %"
  ]
}
```

`%` will be replace with the active file path or empty string when no active file
