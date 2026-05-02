## ADDED Requirements

### Requirement: Task editing

The system SHALL allow the user to edit an existing task’s title and description. The user SHALL be able to save changes or cancel without persisting canceled edits. When saving, the trimmed title MUST NOT be empty; if it is empty, the system MUST NOT apply the edit and MUST show a visible validation message tied to the edit title field.

#### Scenario: Successful edit

- **WHEN** the user opens edit for a task, changes the title and/or description to valid values, and confirms save
- **THEN** the task’s stored title and description SHALL update to the trimmed values
- **THEN** the board SHALL re-render to show the updated text

#### Scenario: Empty title on save

- **WHEN** the user attempts to save an edit with an empty or whitespace-only title
- **THEN** the system SHALL NOT update the task in memory
- **THEN** the system SHALL display a validation message for the edit title

#### Scenario: Cancel edit

- **WHEN** the user opens edit and then cancels
- **THEN** the task’s title and description in memory SHALL remain unchanged

### Requirement: Task deletion

The system SHALL provide a way to delete a task from the board. After deletion, the task MUST NOT appear in any column and MUST be removed from the in-memory collection.

#### Scenario: Delete removes task

- **WHEN** the user deletes a task
- **THEN** that task id SHALL no longer exist in the in-memory task list
- **THEN** the UI SHALL update immediately so the card is gone

### Requirement: Explicit status changes

The system SHALL provide visible controls on each task to set its status to To Do, In Progress, or Done. Changing status via these controls MUST update the in-memory status and MUST place the task card under the matching column after render.

#### Scenario: Move from To Do to In Progress

- **WHEN** the user invokes the control to set a task’s status to In Progress
- **THEN** the task’s status SHALL become In Progress
- **THEN** the task SHALL appear under the In Progress column

#### Scenario: Move to Done

- **WHEN** the user invokes the control to set a task’s status to Done
- **THEN** the task SHALL appear under the Done column

### Requirement: Drag and drop between columns

The system SHALL allow the user to drag a task card from one column list and drop it onto another column list representing a different status. A successful drop onto a column MUST update the task’s status to that column’s status and MUST re-render so the card appears in the new column. Dropping onto the same status column MAY leave state unchanged.

#### Scenario: Drop changes status

- **WHEN** the user drags a task from the To Do column and drops it on the Done column list
- **THEN** the task’s status SHALL become Done
- **THEN** the card SHALL render under Done

#### Scenario: Drag lifecycle feedback

- **WHEN** a drag operation is active over a valid drop target
- **THEN** the system SHALL provide a clear visual indication that the column is a valid drop target (e.g. highlight or border) without relying on third-party libraries

### Requirement: Immediate UI synchronization

After any successful create, edit, delete, explicit status change, or successful drag-and-drop status change, the visible board SHALL reflect the in-memory task data without requiring a full page reload.

#### Scenario: Delete updates empty state

- **WHEN** the user deletes the last remaining task
- **THEN** the empty state SHALL become visible again if the application already uses an empty state for zero tasks

### Requirement: In-memory storage only

The system SHALL NOT persist tasks to a backend, database, `localStorage`, `sessionStorage`, IndexedDB, or cookies as part of this change. All task data SHALL remain in JavaScript memory only.

#### Scenario: Refresh clears board

- **WHEN** the user reloads the page after making changes
- **THEN** tasks SHALL NOT be restored from any storage mechanism added by this change

### Requirement: Preserve create-task behavior

The existing create-task form behavior from the prior implementation SHALL remain: non-empty trimmed title required, optional description, new tasks default to To Do, validation message on the create form when title is invalid, and successful creates append to memory and re-render.

#### Scenario: Create still defaults to To Do

- **WHEN** the user creates a new task with a valid title
- **THEN** the new task SHALL have To Do status and SHALL appear in the To Do column alongside interaction controls for that task

### Requirement: Technology constraints

The implementation SHALL continue to use `src/index.html`, `src/styles.css`, and `src/app.js` with vanilla JavaScript and DOM APIs only. The implementation SHALL NOT introduce frontend frameworks, npm build tools, or external runtime libraries for these features.

#### Scenario: No new dependencies

- **WHEN** a reviewer inspects the repository
- **THEN** there SHALL be no new package manifests or CDN script tags required solely for this change
