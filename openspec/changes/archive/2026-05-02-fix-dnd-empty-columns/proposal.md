## Why

Drag-and-drop between the To Do, In Progress, and Done columns works when a list already contains cards, but an **empty** column list collapses to little or no interactive height, so the browser never treats it as a stable drop target. Users cannot move a task into a column that has zero cards, which breaks the board model.

## What Changes

- Ensure each column’s **task list** (`<ul>`) remains a **usable drop surface** when it has **no** `<li>` children—same `data-status` and existing JS handlers, no duplicate task state.
- Adjust **layout/CSS** (and only minimal HTML if strictly necessary) so empty lists have a **minimum hit area** and, where helpful, grow within the column so drag events (`dragover` / `drop`) fire reliably.
- Leave **create, edit, delete, button moves, and cross-column DnD semantics** unchanged; scope is limited to **empty-column drop behavior** only.

## Capabilities

### New Capabilities

- `empty-column-dnd`: Requirements that each status column’s list accept drops even with zero tasks, keeping the three-column board structure.

### Modified Capabilities

- (none — no formal requirement specs under `openspec/specs/` for this behavior today.)

## Impact

- Primarily `src/styles.css` (column/list sizing, flex/min-height). `src/index.html` only if a non-visual structural tweak is required; `src/app.js` only if event binding must target an adjusted element (unlikely).
