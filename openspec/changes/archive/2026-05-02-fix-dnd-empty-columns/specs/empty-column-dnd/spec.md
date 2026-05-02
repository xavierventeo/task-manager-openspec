## ADDED Requirements

### Requirement: Empty column lists accept drops

For each of the three status columns (To Do, In Progress, Done), the task list element that carries `data-status` SHALL remain an active drop target **even when the list contains zero task cards**. After a valid drop, the task’s in-memory status SHALL match the target list’s `data-status`, and `render()` SHALL show the card in that column.

#### Scenario: Drop into an empty column

- **WHEN** a column’s task list has no cards and the user drags a task from another column over that list and releases
- **THEN** the `drop` handler for that list SHALL run
- **THEN** the task SHALL appear in that column after render

#### Scenario: All three columns can be targeted

- **WHEN** two columns are empty and one contains tasks
- **THEN** the user SHALL still be able to drop a card into either empty column’s list without first seeding it with another card

### Requirement: Minimum drop hit area

Each column’s task list SHALL expose a non-zero interactive height when empty (for example via `min-height`, flex growth, and/or padding on the list or column layout) so pointer drags can intersect the list without requiring existing cards.

#### Scenario: Pointer over empty list

- **WHEN** the user moves the pointer over the empty region below the column heading where cards will appear
- **THEN** that region SHALL be part of the list’s layout box used for drag-and-drop hit-testing

### Requirement: No scope creep

This capability SHALL NOT require new task fields, new columns, persistence, or changes to create/edit/delete flows beyond what is necessary to satisfy empty-list drop targeting.

#### Scenario: Create flow unchanged

- **WHEN** the user creates a new task after this change
- **THEN** the existing create form behavior SHALL continue to work as before
