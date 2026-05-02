## 1. HTML structure

- [x] 1.1 Create `src/index.html` with a document title, linked `styles.css` and `app.js`, and semantic regions for the page heading, create-task form (title and description fields, submit control), empty-state container, and a board with three column sections (To Do, In Progress, Done) each with a list container for tasks.

## 2. Styling

- [x] 2.1 Add `src/styles.css` for a readable layout: three-column board (flex or grid), column headers, form spacing, task card appearance, and distinct styling for the empty state and validation message.

## 3. JavaScript behavior

- [x] 3.1 In `src/app.js`, define an in-memory task collection and a small task model (unique id, title, description, status) with `todo` as the only status used when creating tasks in this change.
- [x] 3.2 Implement a render function that rebuilds or updates column contents from the in-memory data, maps each task to the correct column by status, and shows the empty state only when there are zero tasks.
- [x] 3.3 Handle form submit: trim the title; if empty, prevent creation, show a visible validation message (accessible association with the title field); on success, append a new `todo` task, hide the empty state, re-render lists, and clear validation; keep description optional.

## 4. Verification

- [x] 4.1 Manually verify against `specs/task-board-ui/spec.md`: three labels, create with title only and with description, validation on empty title, tasks only in To Do, empty state toggling, UI updates without reload, and no persistence after refresh.
