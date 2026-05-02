## Context

The Task Manager keeps a single `tasks` array in `src/app.js` and re-renders list DOM from that data. Column `<ul>` elements expose `data-status`, cards are `draggable`, and `setTaskStatus` updates memory then `render()`. Users still observe drops that look valid but leave the task in the old column after render—indicating the **drop path is not reliably committing** status to memory (or the browser never delivers a real `drop`).

## Goals / Non-Goals

**Goals:**

- Make cross-column drops **always** update the dragged task’s `status` to the **target list’s status** and then **re-render** so the card’s column matches memory.
- Keep **one source of truth** (`tasks`); DOM is disposable output of `render()`.
- Preserve existing **create**, **edit**, **delete**, and **button-based** status changes.

**Non-Goals:**

- New gestures (keyboard reorder, cross-app drag), persistence, frameworks, or visual redesign beyond minimal drag affordances.

## Decisions

1. **`dragover` must allow the drop** — Call `preventDefault()` on `dragover` (already present) **and** set `event.dataTransfer.dropEffect = "move"` (or equivalent aligned with `effectAllowed`) so Chromium-class browsers treat the column as a valid drop target. *Rationale:* without a permitted `dropEffect`, many engines **suppress `drop`**, which matches “ghost moves, then snaps back on re-render.”

2. **Transient drag id** — On `dragstart`, store the dragged task id in a **module-level** variable (e.g. `activeDragTaskId`) and clear it on `dragend`/`drop`. Still call `setData("text/plain", …)` for debugging and standards compliance, but **do not** rely on `getData` alone in `drop` because some environments return empty until late phases. *Rationale:* avoids duplicating task records while making identification robust.

3. **Resolve target status from the list** — On `drop`, read `event.currentTarget`’s `data-status` (or `getAttribute("data-status")`) and pass that string into the same `setTaskStatus` helper used by buttons. *Rationale:* single mutation path, no second state machine.

4. **Optional `dragenter` prevention** — If testing shows drops still flaky on certain browsers, also `preventDefault()` on `dragenter` for each column list. *Rationale:* MDN notes both `dragenter` and `dragover` for permissive drops; add only if needed during apply.

## Risks / Trade-offs

- **Module-level drag id** — If `drop` never fires, `dragend` must clear to avoid stale id → Mitigation: clear in both handlers; id is only meaningful during an active drag.

- **Nested interactive controls** — Drag starting on buttons may still be finicky on some platforms → Mitigation: primary fix is valid `drop`; document that dragging from the card body is most reliable if issues remain.

## Migration Plan

Ship as a static `src/app.js` update; verify manually in at least one Chromium-based browser and Firefox.

## Open Questions

- None blocking; exact helper names (`beginColumnDrag`, `handleColumnDrop`, etc.) left to implementation.
