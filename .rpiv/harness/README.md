# Local Pi PR Harness

This repo has a local harness for asking Pi to inspect the portfolio, make one bounded improvement, validate it, commit it, and optionally open a GitHub PR.

It runs locally because the configured Pi provider uses Ollama models on this machine.

## Commands

Preview a branch locally without pushing:

```sh
npm run ai:improve
```

Create a branch, commit, push, and open a PR:

```sh
npm run ai:improve:pr
```

Use a custom objective:

```sh
OBJECTIVE="Fix the GitHub Pages deployment branch mismatch and keep the diff minimal." npm run ai:improve
```

Use a different local model:

```sh
PI_MODEL=ollama/qwen3.6-35b-64k:latest npm run ai:improve
```

## Defaults

- Base branch: `main`
- Branch prefix: `pi/improve-portfolio`
- Model: `ollama/gpt-oss:20b`
- Thinking: `off`
- Dependency setup: `npm ci`
- Validation:
  - `npx tsc --noEmit`
  - `npm run lint`
  - `npm run build`

## Useful Options

```sh
BASE_BRANCH=main npm run ai:improve
BRANCH_NAME=pi/fix-pages-branch npm run ai:improve
RUN_INSTALL=0 npm run ai:improve
ALLOW_FAILED_VALIDATION=1 npm run ai:improve
CREATE_PR=1 npm run ai:improve
```

`ALLOW_FAILED_VALIDATION=1` is only for exploratory branches. Normal PR branches should pass validation.

## Safety Model

The script refuses to run with a dirty working tree. Pi is instructed not to commit, push, or open PRs. The script owns git operations after validation passes.

PR creation is opt-in through `CREATE_PR=1` or `npm run ai:improve:pr`.
