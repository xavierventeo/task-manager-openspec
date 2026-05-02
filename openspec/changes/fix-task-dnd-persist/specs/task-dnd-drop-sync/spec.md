## ADDED Requirements

### Requirement: Drop commits status from target column

When a task card is dropped onto a column’s task list that represents a different status than the task’s current status, the system SHALL update that task’s in-memory `status` to the target list’s status value (`todo`, `in-progress`, or `done` as exposed on the drop zone), then SHALL re-render the board from the `tasks` collection so the card appears under the destination column.

#### Scenario: Cross-column drop persists after render

- **WHEN** a task whose status is `todo` is dropped on the list whose target status is `done`
- **THEN** the corresponding task object in memory SHALL have status `done`
- **THEN** after `render()` the task card SHALL appear only under the Done column

#### Scenario: Same-column drop is a no-op

- **WHEN** a task is dropped on the list for its current status
- **THEN** the system MAY leave the task unchanged and SHALL NOT corrupt or duplicate the task

### Requirement: Drag-over allows drop in supporting browsers

During `dragover` on a column task list while a task card drag is active, the system SHALL call `preventDefault()` on the event and SHALL set `dataTransfer.dropEffect` to a value compatible with the drag’s `effectAllowed` (e.g. `move`) so the user agent can deliver a `drop` event to that list.

#### Scenario: Drop handler runs for valid cross-column move

- **WHEN** the user drags a task over another column and releases over that column’s list
- **THEN** the program’s `drop` handler for that list SHALL run and SHALL read a non-empty task identifier for the dragged task (via `dataTransfer` and/or the transient drag id described in implementation)

### Requirement: Single source of truth

The board SHALL be rendered exclusively from the in-memory `tasks` data after a drop; the system SHALL NOT maintain a second parallel task ordering for drag previews beyond transient UI state.

#### Scenario: Re-render matches memory

- **WHEN** any drop successfully changes a task’s status
- **THEN** a subsequent `render()` call SHALL place the task only in the list matching its updated `status`

### Requirement: Non-regression of other interactions

The fix SHALL NOT remove or regress existing behaviors: task creation with validation, edit dialog with validation, delete, and explicit status buttons/selects that call the same status update path as drops.

#### Scenario: Button move still works

- **WHEN** the user moves a task to In Progress using an explicit control after this change
- **THEN** the task SHALL appear under In Progress after render the same as before the change
