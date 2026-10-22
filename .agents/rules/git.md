# Git Command Execution Guidelines

- Always execute `git add`, `git commit`, and `git push` as standalone individual command calls.
- Never chain them using `;`, `&&`, or newline operators.
- This ensures that prefix-based command approvals in Antigravity ("Always Allow") match `git add` and `git commit` automatically.
