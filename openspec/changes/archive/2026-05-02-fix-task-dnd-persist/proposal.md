## Why

Drag-and-drop between columns currently gives a misleading visual move: after the browser finishes the gesture and the app re-renders from in-memory data, the task snaps back to its old column. That breaks the expectation that dropping on a column updates task status and that the board is always rendered from authoritative task state.

## What Changes

- Correct the drag-and-drop pipeline so a **successful drop on a different column** reliably updates the task’s `status` to the **target column’s status**, then **re-renders** from the `tasks` array (no separate “visual-only” task list).
- Ensure **drop targets** advertise an allowed drop operation (e.g. `dropEffect` / `preventDefault` on `dragover` as required by browsers) so the **drop** handler actually runs.
- Make **task identification during drag** robust (e.g. avoid relying solely on `dataTransfer` quirks across browsers) while **not** duplicating long-lived task state—only the transient drag session may carry an id.
- **No new product features** beyond restoring correct DnD; preserve create, edit, delete, and button-based status changes.

## Capabilities

### New Capabilities

- `task-dnd-drop-sync`: Normative behavior for column drops—target resolution, in-memory status update, and re-render so the card stays in the destination column.

### Modified Capabilities

- (none — `openspec/specs/` has no formal requirement file for DnD to delta; this is a targeted fix spec.)

## Impact

- `src/app.js` only (and only the DnD-related handlers / small helpers if needed). No backend, storage, frameworks, or build tooling.
