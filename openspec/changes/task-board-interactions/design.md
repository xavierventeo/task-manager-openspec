## Context

The app already ships a three-column board, create form with title validation, in-memory `tasks` array, and a full `render()` in `src/app.js` (`initial-task-board`). This change extends the same files under `src/` with richer interactions while keeping vanilla JS and clear DOM updates.

## Goals / Non-Goals

**Goals:**

- Let users edit title/description with trimmed non-empty title validation and visible errors.
- Let users delete tasks and move tasks across `todo`, `in-progress`, and `done` using visible controls.
- Support HTML5 drag and drop between column lists so drops assign the target column’s status.
- Centralize mutations (update/delete/set status) then re-render so the UI always reflects memory state.
- Provide clear visual feedback for dragging, editing, and errors without introducing frameworks or persistence.

**Non-Goals:**

- Backend, databases, auth, localStorage/sessionStorage, undo history, multi-user sync, custom build pipelines, third-party DnD libraries, nested tasks, or task reordering within a column as a dedicated feature.

## Decisions

1. **Edit surface** — Use the native `<dialog>` element for an edit form: accessible focus trap in supporting browsers, simple open/close API, and separation from the list markup. Alternatives considered: always-visible inline fields (noisy) and `contenteditable` (harder to validate consistently).

2. **Status controls** — Per-task controls (e.g. labeled buttons or a `<select>`) that set status explicitly; the control for the current status is disabled or visually distinct to avoid redundant no-op submits. Alternatives: only DnD (fails explicit-control requirement) or only a global move menu (poor per-task clarity).

3. **Drag and drop** — Native `draggable` list items, `dataTransfer` carrying task id, `dragover`/`drop` on each column’s `<ul>` with `preventDefault` on `dragover`. Column target status derived from a `data-status` attribute on the list or column wrapper. Alternatives: mousemove-based custom DnD (more code) and pointer-events polyfills (out of scope).

4. **Ordering model** — Keep array order as insertion order; re-render clears lists and re-append cards. Moving status updates `task.status` only unless a future change adds intra-column ordering.

5. **Delete confirmation** — Immediate delete on explicit control (no modal confirm) to stay minimal; destructive control styled distinctly. Can be revisited if user testing demands confirmation.

6. **DnD vs controls** — Both paths call the same `setTaskStatus(id, status)` (or equivalent) so behavior stays consistent and testable.

## Risks / Trade-offs

- **Touch / mobile DnD** — Native DnD is inconsistent on touch devices → Mitigation: explicit move controls remain the primary accessible path; DnD is supplementary.

- **`<dialog>` support** — Very old engines lack it → Mitigation: target modern evergreen browsers for learning; if needed later, polyfill or replace with a simple positioned panel without changing requirements.

- **Re-render cost** — Full list re-render on each change may reset focus → Mitigation: after edits, return focus to a sensible control; keep dialogs managed explicitly on save/cancel.

## Migration Plan

Ship as static file updates only. Verify by opening `src/index.html` locally; no deployment pipeline changes.

## Open Questions

- None blocking; exact control labels and CSS tokens are left to implementation.
