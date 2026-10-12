# Volux

Monorepo pnpm + Turborepo.

| Chemin | Package | Stack |
| --- | --- | --- |
| `apps/api` | `@volux/api` | NestJS |
| `apps/web` | `@volux/web` | Next.js |
| `packages/*` | — | Code partagé |

## Commandes

```bash
pnpm install       # installe toutes les dépendances
pnpm dev           # lance api + web
pnpm dev:api       # lance uniquement l'API
pnpm dev:web       # lance uniquement le front
pnpm build         # build tout
pnpm lint
pnpm test
```
