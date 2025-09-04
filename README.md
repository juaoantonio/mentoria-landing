# Mentoria — Landing Page (React + Vite + Tailwind v4)

## Requisitos
- Node 18+
- pnpm 9+

## Rodando o projeto
```bash
pnpm i
pnpm dev
```

> Se você criou o projeto via `pnpm create vite@latest`, também funciona — este zip é um atalho com tudo pronto.

## Se preferir criar do zero com Vite
```bash
pnpm create vite@latest mentoria-landing -- --template react-swc-ts
cd mentoria-landing
pnpm add -D tailwindcss @tailwindcss/vite
pnpm add lucide-react motion
```

Em `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()] })
```

Em `src/index.css`:
```css
@import "tailwindcss";
@theme {
  --color-buff: #caa491;
  --color-bistre: #30221e;
  --color-night: #0e0d0f;
  --color-beaver: #b88f7a;
  --color-night-2: #0c0c0d;
}
```

Agora use as classes: `bg-buff`, `text-bistre`, `from-buff to-night-2`, etc.

## Personalizações
- Troque `public/mentor.jpg` pela sua foto (mesmo nome do arquivo).
- Atualize o email em `src/App.tsx` (`DEST_EMAIL`).

## Build
```bash
pnpm build && pnpm preview
```
