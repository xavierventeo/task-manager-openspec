## 1. HTML structure

- [x] 1.1 Extend `src/index.html` with a `<dialog>`-based edit form (title field, description field, inline validation region, save and cancel actions), plus structural hooks on each task card for edit, delete, and explicit status controls. Add stable `data-status` (or equivalent) on each column’s task list so drops can map to `todo`, `in-progress`, and `done`.

## 2. Styling

- [x] 2.1 Extend `src/styles.css` for task action rows, dialog layout, focus states, a visually distinct delete control, and a clear drag-over highlight on columns or lists during drag operations.

## 3. State helpers and rendering

- [x] 3.1 In `src/app.js`, add small focused functions to locate a task by id, update fields, delete a task, and set status; each successful mutation SHALL end by calling the existing render path so lists and empty state stay consistent.
- [x] 3.2 Extend task card creation so each card is draggable, exposes the task id to drag data, and renders edit, delete, and explicit move controls wired to the helpers without breaking the current create form flow.

## 4. Edit, delete, and explicit status UX

- [x] 4.1 Implement the edit dialog lifecycle: open with the selected task’s values, validate trimmed non-empty title on save with an accessible error message, apply updates on success, and close on save or cancel without mutating on cancel.
- [x] 4.2 Wire delete and explicit status controls to remove or retarget tasks immediately, including edge cases such as deleting the last task (empty state visible again) and disabling or de-emphasizing the control for the task’s current status.

## 5. Drag and drop

- [x] 5.1 Add HTML5 drag-and-drop handlers so dragging a card between column lists updates the underlying status to the drop target’s status, clears drag styling on end, and prevents default browser behavior where required. DnD and explicit controls MUST share the same status-update logic.

## 6. Verification

- [x] 6.1 Manually verify against `specs/task-board-interactions/spec.md`, including preserved create-task validation, new tasks defaulting to To Do, edit validation, delete, explicit moves, drag moves, immediate UI updates, and absence of persistence after refresh.
