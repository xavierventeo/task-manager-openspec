## Context

The Task Manager is a browser-only app using HTML, CSS, and vanilla JavaScript (`openspec/specs/project.md`). The suggested layout is `src/index.html`, `src/styles.css`, and `src/app.js`. This change implements only the first slice: a read-only board for status grouping plus task creation, with all state held in a JavaScript data structure.

## Goals / Non-Goals

**Goals:**

- Ship a minimal three-column board (To Do, In Progress, Done) with a create form and synchronized DOM rendering from in-memory data.
- Enforce non-empty title on submit and surface a clear inline validation message without blocking future corrections.
- Provide a dedicated empty state when the task list has zero items.
- Keep HTML, CSS, and JavaScript in separate files with predictable responsibilities.

**Non-Goals:**

- Editing or deleting tasks, changing status after creation, drag and drop, persistence, backend APIs, build tools, or frameworks.

## Decisions

1. **Task model** — Each task is a plain object with at least: unique `id` (e.g. monotonic counter or `crypto.randomUUID()` if acceptable in target browsers), `title` (string), `description` (string, may be empty), and `status` with allowed values `todo`, `in-progress`, `done` mapped to the three column labels. New tasks MUST use `todo` only in this change.

2. **State container** — A single in-memory array (or similar) owned by `app.js`, mutated only through small functions (e.g. `addTask`, `getTasksByStatus`) to keep rendering logic simple.

3. **Rendering** — After any mutation affecting the list, re-run a `render()` (or equivalent) that clears or rebuilds column contents from the data model so the UI stays authoritative and the implementation stays easy to follow. Performance is not a concern at this scale.

4. **Validation UX** — On submit, if title is empty or whitespace-only, prevent task creation, set an accessible message near the title field (e.g. `aria-live` or associated `aria-describedby`), and do not clear the user’s other inputs unless product choice prefers clearing only on success; default: keep form values on validation failure.

5. **Empty state** — A single panel or banner shown when total task count is zero, hidden once at least one task exists; columns may still show headers or placeholders per spec.

6. **Styling** — Use `styles.css` for layout (flex or grid for three columns), readable typography, and subtle borders or spacing so the board is usable without a design system.

## Risks / Trade-offs

- **Full re-render vs incremental DOM** — Full re-render is simpler for learners but slightly more wasteful; acceptable for v1.

- **In Progress / Done columns** — Tasks cannot be moved there in this change; columns may appear empty except for seeded manual data if testers add only To Do tasks. Mitigation: document in UI copy that movement comes later, or leave columns visibly empty (spec-driven).

## Migration Plan

Not applicable: static files only. Open `src/index.html` in a browser to verify behavior.

## Open Questions

- None blocking; UUID vs incremental id is an implementation detail left to `/opsx:apply`.
