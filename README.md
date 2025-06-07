# Personal Portfolio (React + TypeScript + Vite)

This repository contains the source code for my personal portfolio website. It is
built with [React](https://react.dev/),
[TypeScript](https://www.typescriptlang.org/) and
[Vite](https://vitejs.dev/). The project uses the official
[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
for development with Fast Refresh.

## Available Scripts

The following npm scripts are available:

- `dev` – start the development server.
- `build` – generate a production build.
- `preview` – preview the production build locally.
- `deploy` – publish the built site to GitHub Pages.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
