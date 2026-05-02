## Why

The first slice implemented creation and read-only grouping, but the Task Manager’s intended scope (`openspec/specs/project.md`) also includes modifying, deleting, and moving tasks across states. This change completes that lifecycle in the browser while staying framework-free and in-memory, so the app matches the project’s functional goals.

## What Changes

- Add **task editing** so users can change a task’s title and description, with the same non-empty trimmed title rule as creation and a clear validation message on invalid saves.
- Add **task deletion** so users can remove a task from the board and in-memory list.
- Add **status changes** across `To Do`, `In Progress`, and `Done` using **explicit controls** on each task (or equivalent visible actions).
- Add **drag and drop** so users can move tasks between the three column lists; dropping updates the task’s status to match the target column.
- Keep **immediate UI refresh** after every successful edit, delete, move, or drop, and preserve the existing **create-task** flow and validation.
- Continue to store everything **in memory only** (no backend, persistence, auth, frameworks, or build tools).

## Capabilities

### New Capabilities

- `task-board-interactions`: Editing, deletion, status updates via controls, drag-and-drop between columns, validation for edits, and synchronized rendering—all on top of the current `src/` implementation.

### Modified Capabilities

- (none — `openspec/specs/` does not yet contain formal requirement specs for the task board; this change introduces the interaction requirements as a new capability.)

## Impact

- Updates to `src/index.html` (task actions, edit affordances, drag/drop attributes or hooks as needed), `src/styles.css` (controls, drag feedback, optional edit UI), and `src/app.js` (state mutations, event handlers, DnD lifecycle).
- No new dependencies, services, or storage.
