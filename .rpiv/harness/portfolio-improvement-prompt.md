# Portfolio Improvement Harness Prompt

You are improving a portfolio codebase, not redesigning it from scratch.

First inspect the repository enough to understand:
- the current Next.js configuration and static export behavior
- the app structure under `src/app`
- the React Three Fiber / Three.js scene and controls
- CSS module and global style conventions
- package scripts and existing validation commands
- GitHub Pages deployment expectations

Make one small, coherent improvement pass. Prefer fixes that improve one of:
- build or lint health
- accessibility and semantic HTML
- responsive layout correctness
- React rendering stability
- Three.js geometry, animation, cleanup, or performance maintainability
- TypeScript type safety
- removal of stale or misleading generated artifacts from tracked source
- documentation accuracy only when tied to a code or workflow fix

Rules:
- Keep the diff narrow and reviewable.
- Preserve the visible purpose of the portfolio.
- Avoid broad redesigns, new visual directions, or unrelated cleanup.
- Avoid new dependencies unless the existing app cannot pass validation without them.
- Do not edit generated folders such as `.next`, `out`, `dist`, or `node_modules`.
- Do not commit, push, or open a pull request.
- If a validation command fails because of an existing unrelated issue, either fix the issue if it is small and in scope or document the exact blocker.

Before finishing, run:

```sh
npx tsc --noEmit
npm run lint
npm run build
```

Return a concise summary with:
- files changed
- why the change is safe
- validation results
- any remaining risks
