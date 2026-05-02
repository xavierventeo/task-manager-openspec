## Why

The Task Manager project needs a concrete starting point in the browser so users can create tasks and see them organized by status. This change delivers the first shippable slice: a simple board with creation, validation, and in-memory state, aligned with the project’s vanilla HTML/CSS/JavaScript stack.

## What Changes

- Add a main task management screen under `src/` with separate `index.html`, `styles.css`, and `app.js`.
- Add a create-task form (title required, description optional) with client-side validation and a visible error when the title is empty.
- Render three columns—To Do, In Progress, and Done—with tasks listed under the correct column; new tasks always start in To Do.
- Show a clear empty state when there are no tasks.
- Hold all task data in memory only (no backend, persistence, editing, deletion, status moves, or drag and drop).

## Capabilities

### New Capabilities

- `task-board-ui`: Main task board presentation and creation flow—layout, form, column grouping by status, empty state, in-memory task list, and title validation.

### Modified Capabilities

- (none—no existing capability specs under `openspec/specs/` define prior task-board requirements.)

## Impact

- New files: `src/index.html`, `src/styles.css`, `src/app.js`.
- No new dependencies, APIs, or build tooling; no changes to backend or storage.
