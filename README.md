# BeamMP Website (Frontend)

This repository is home for the BeamMP website, this is a rebuild of the website from the ground up using Vue+Vite. We are also making use of Tailwindcss v4.

**Tech Stack**
- **Framework:** Vue 3 (`vue`, `vue-router`)
- **Build:** Vite 7 (`vite`, `@vitejs/plugin-vue`)
- **Styling:** Tailwind CSS 4 + `tailwindcss-animate`, `tailwind-merge`
- **UI Icons/Utils:** `lucide-vue-next`, `clsx`, `class-variance-authority`
- **Radix-style Components:** `reka-ui` through `shadcn-vue`
- **Composable utilities:** `@vueuse/core`

**Theming and Colour Guide**
- BeamMP Orange `#F36D24`
- BeamMP Blue `#4470B6`
- BeamMP Green `#1D9749`
- Gray `#333333`
- Black `#000000`
- White `#FFFFFF`

## Getting Started

Prerequisites:
- Node.js 22+
- pnpm, npm, or yarn (examples use npm)

Install dependencies and run the dev server:

```powershell
# from this folder (repo root)
npm install
npm run dev
```

Build for production and preview locally:

```powershell
npm run build
npm run preview
```

Vite will print the local dev URL (usually `http://localhost:5173`).

## Project Scripts
- `npm run dev`: Start Vite development server
- `npm run build`: Production build
- `npm run preview`: Preview the production build locally
- `npm run lint`: Lint and auto-fix Vue/JS files with ESLint
- `npm run format`: Format all source files with Prettier

## Directory Overview
- `src/` – App source (styles, components, pages, routing)
	- `src/components/ui/` – UI components (e.g., `button`, `navigation-menu`)
	- `src/lib/` – Utilities and helpers
	- `routes/` - vue-router routes
	- `views/` - Pages of the website
- `index.html` – Vite HTML entry
- `tailwind.config.js` – Tailwind configuration
- `vite.config.js` – Vite configuration
- `components.json` – Shadcn-Vue component registry

## Styling and UI
- **Tailwind CSS 4** is set up via `tailwind.config.js` and imported in `src/style.css`.
- **reka-ui** and shadcn-vue-style patterns are used for accessible, composable UI.
- **lucide-vue-next** provides icons.

## Adding New UI Components (shadcn-vue)
We’re standardizing on shadcn-vue-compatible components for consistency. Use the CLI to add new components:

```powershell
npx shadcn-vue@latest add <component>

# examples
npx shadcn-vue@latest add button
npx shadcn-vue@latest add navigation-menu
```

The CLI reads `components.json` and will scaffold files under `src/components/ui/`.

## Routing
Use `vue-router` for navigation. Keep routes co-located with views and prefer lazy-loaded routes for large pages.

## Contributing
We welcome contributions! Here’s how to get started.

### 1) Pick an Issue or Open One
- Browse issues or propose an enhancement/bug. Share context and repro steps.

### 2) Create a Branch
- Use a descriptive branch name:
	- `feature/<short-description>`
	- `fix/<short-description>`
	- `docs/<short-description>`

### 3) Dev Environment
- Install deps with `npm install` and run `npm run dev`.
- Keep changes scoped and focused; avoid drive-by refactors unless agreed.

### 4) Code Style & Patterns
- **Vue 3 + `<script setup>`** preferred for new components.
- **Linting**: Run `npm run lint` before committing to catch errors. ESLint is configured for Vue 3 best practices.
- **Formatting**: Run `npm run format` to auto-format code with Prettier (or use an editor extension).
- **Type safety**: If/when TypeScript is introduced, prefer explicit props and emits.
- **Tailwind**: Use utility classes; extract variants with `class-variance-authority` when patterns repeat.
- **Accessibility**: Prefer accessible primitives (e.g., `reka-ui`) and keyboard support.
- **File naming**: `PascalCase.vue` for components; avoid one-letter variable names.

### 5) Testing & Checks
- Run the app locally and verify core flows.
- Ensure components render on both light/dark themes if relevant.
- If you add dependencies, update this README and relevant configs.

### 6) Commit & PR
- Write clear, imperative commit messages, e.g., `feat: add NavigationMenu component`.
- Open a PR describing the problem, solution, screenshots if UI changes, and any follow-ups.
- Link related issues. Keep PRs small; big changes should be split.

## Environment & Configuration
- Tailwind and Vite are preconfigured. If you need globals, add them in `vite.config.js`.
- For icons, use `lucide-vue-next` and keep icon size consistent via props/classes.
- If adding new pages, prefer code-splitting with dynamic imports.

## FAQ
- “Why Vite?” Fast dev server, optimized builds, and great Vue tooling.
- “Can I use Yarn or pnpm?” Yes—adjust commands accordingly.
- “Design system?” We favor shadcn-vue patterns + Tailwind + reka-ui primitives for consistent UI.

## License
Unless otherwise noted in the root repository, this project follows the BeamMP website’s standard license. If clarifications are needed, open an issue and we will update this section.
