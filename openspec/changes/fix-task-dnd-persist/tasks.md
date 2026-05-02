## 1. Diagnose and harden drag-over

- [x] 1.1 In `src/app.js`, update column list `dragover` handling to call `preventDefault()` and set `event.dataTransfer.dropEffect = "move"` (or equivalent permitted value) whenever a column drag is in progress, keeping hover styling behavior intact.

## 2. Reliable dragged-task identity

- [x] 2.1 Introduce a small, clearly named transient variable (e.g. `activeDragTaskId`) set on task `dragstart` from the task’s numeric id, cleared on `dragend` and after successful `drop` handling; in `drop`, prefer this id (falling back to `dataTransfer.getData("text/plain")` if needed) before calling `setTaskStatus`.

## 3. Drop handling and verification

- [x] 3.1 Ensure `drop` on each column list reads the target status from `data-status` on `event.currentTarget`, updates via the shared `setTaskStatus` helper, then relies on `render()` so the card remains in the new column; manually verify cross-column moves in a browser and confirm create/edit/delete/button moves still work.
