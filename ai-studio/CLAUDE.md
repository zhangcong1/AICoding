# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build + type check
npm run lint     # ESLint
```

No test runner is configured yet.

## Architecture

**Pure-frontend prototype** — no backend, no database. All runtime state lives in Zustand (`lib/store.ts`); mock employee data lives in `lib/data.ts`. To connect a real backend, replace those two files with API calls.

### Key files

| File | Purpose |
|------|---------|
| `lib/data.ts` | Static definitions for all 6 employees (persona, skills, memories, radar, stats) + `WORKFLOW` array that defines the collaboration order |
| `lib/store.ts` | Zustand store — `submitTask()` drives the simulated workflow timer; `status` and `runs` are the reactive state consumed by every component |
| `app/page.tsx` | Dashboard: assembles `StatCards`, `EmployeeGrid`, `FlowDiagram`, `TaskPanel`, `TaskList` |
| `app/studio/page.tsx` | Static room view — overlays avatars on `public/assets/studio/room.png` via the `SEATS` percentage-coordinate map |
| `app/scene/page.tsx` | **Living office scene** (Marvis / pixel-agents style) — renders `<LivingOffice>` |
| `components/LivingOffice.tsx` | Interactive stage: dark floor + perspective grid + 6 desks + character portrait tiles with state-colored glow rings, state icons, speech bubbles, neon flow lines, meeting table |
| `lib/scene.ts` | `useSceneSimulation()` — self-contained 5-state machine (idle/thinking/working/meeting/completed). Ambient loop randomly cycles states + auto-stand-ups; `runTask()` drives `WORKFLOW` staggered every 2.6 s. Independent of `lib/store.ts` so the dashboard is untouched. |
| `app/employees/[id]/page.tsx` | QoderWake-style profile: radar chart, skill bars, memory timeline, raw-file list |

### Data flow

```
useStudio() store
  └─ submitTask(text)
       └─ setInterval → advances stepIndex every 2.6 s
            └─ updates status[agentId] + runs[agentId]
                 └─ all components re-render via Zustand selectors
```

### Static assets

`public/assets/` contains images cropped from `../images/` via Pillow scripts (see session history). Do not move or rename these — components reference them with hardcoded `/assets/…` paths.

```
avatars/   acai | laozhou | xiaomu | xiaobu | akai | xiaonuo  (256×256 px)
desks/     same six keys
studio/    room.png  (913×519 px, 3D office background)
states/    <id>/{idle,thinking,working,meeting,completed}.png  — 6×5 character state busts,
           sliced from ../images/file_00000000dfd472099dcbf7851a2cbfa5.png region 01 (grid x:92-812, y:56-558).
           Kept on the original dark backdrop (no bg removal) and rendered as framed tiles, because the
           source art is half-body busts — flood-fill bg removal ate into dark clothing.
```

### Tailwind custom tokens (tailwind.config.ts)

- `bg-sidebar` / `bg-sidebarHover` — left nav
- `bg-panel` / `bg-panelDark` — dark detail panels
- `shadow-card` / `shadow-cardHover` / `shadow-glow`
- `text-ink` / `text-muted`

### Adding a new employee

1. Add entry to `EMPLOYEES` array in `lib/data.ts` with correct `AgentId`.
2. Drop avatar PNG into `public/assets/avatars/<id>.png` and desk into `public/assets/desks/<id>.png`.
3. Add seat coordinate to `SEATS` map in `app/studio/page.tsx`.
4. Add the agent to the relevant `WORKFLOW` step(s).
