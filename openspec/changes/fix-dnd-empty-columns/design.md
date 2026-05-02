## Context

The board uses three `<section class="column">` wrappers, each with an `<h2>` and a `<ul class="task-list" data-status="…">` that already hosts `dragover` / `drop` listeners in `src/app.js`. Empty `<ul>` elements have **no in-flow children**, so with the current flex layout their **content box height can shrink to zero**, making it hard or impossible to hover the list itself for a valid drop.

## Goals / Non-Goals

**Goals:**

- Guarantee a **non-zero, predictable drop target** for every column list, including when the list is empty.
- Keep **drop logic** on the existing `<ul>` nodes and **`data-status`** values (`todo`, `in-progress`, `done`).
- Preserve overall **board structure** (three columns, same IDs).

**Non-Goals:**

- New features (placeholders, sorting within a column, animations), backend, persistence, or refactors unrelated to hit-testing empty lists.

## Decisions

1. **CSS-first fix** — Make `.column` a **column flex container** and give `.task-list` **`flex: 1 1 auto`** plus a **`min-height`** (e.g. `6–10rem`) and light vertical padding so the empty list still paints a box under the heading. *Rationale:* avoids extra DOM nodes and keeps JS unchanged.

2. **Optional `min-block-size` on `ul`** — Prefer `min-height`/`min-block-size` on `.task-list` rather than invisible dummy `<li>` elements. *Rationale:* no fake tasks, no render() special cases.

3. **No JS move of listeners** — Keep listeners on the three stable `ul` ids unless testing shows the hit target must be the outer column; only then consider delegating to `.column` (out of scope unless apply proves necessary).

## Risks / Trade-offs

- **Taller empty columns** — Extra min-height consumes vertical space → Mitigation: pick a modest minimum that matches usability, not full viewport height.

- **Nested drag targets** — Larger lists still delegate events to the same `ul`; cards remain the drag source → Mitigation: unchanged DnD pipeline from prior fixes.

## Migration Plan

Ship static CSS (and optional minimal HTML) updates; verify by dragging into each column after clearing it.

## Open Questions

- None blocking; exact `min-height` token is an implementation detail.
