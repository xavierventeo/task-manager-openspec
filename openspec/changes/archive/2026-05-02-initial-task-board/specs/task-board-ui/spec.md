## ADDED Requirements

### Requirement: Task board layout

The system SHALL present a main task management view with a document title and a three-column layout labeled To Do, In Progress, and Done.

#### Scenario: Columns are visible

- **WHEN** the user loads the main page
- **THEN** the interface SHALL display three distinct columns with the labels To Do, In Progress, and Done

### Requirement: Create task form

The system SHALL provide a form to create a task with a title field and an optional description field, and a primary submit action.

#### Scenario: User enters title and description

- **WHEN** the user enters a non-empty title and optional description and submits the form
- **THEN** the system SHALL accept the input for task creation according to the task creation rules

#### Scenario: User enters only a title

- **WHEN** the user enters a non-empty title, leaves description empty, and submits the form
- **THEN** the system SHALL create a task with that title and an empty description

### Requirement: Title validation

The system SHALL NOT create a task when the trimmed title is empty. The system SHALL display a validation message associated with the title field when submission is attempted with an empty title.

#### Scenario: Empty title on submit

- **WHEN** the user submits the create form with a title that is empty or contains only whitespace
- **THEN** the system SHALL NOT add a new task
- **THEN** the system SHALL display a visible validation message indicating the title is required

#### Scenario: Valid title after validation error

- **WHEN** a validation message is visible and the user enters a non-empty title and submits again
- **THEN** the system SHALL create the task and SHALL NOT retain the validation error for that successful submission

### Requirement: New tasks default to To Do

The system SHALL assign every newly created task the To Do status.

#### Scenario: Task appears in To Do

- **WHEN** the user successfully creates a task
- **THEN** the task SHALL appear under the To Do column

### Requirement: Tasks grouped by status

The system SHALL render each task under the column that matches its status. Tasks with To Do status appear under To Do; In Progress under In Progress; Done under Done.

#### Scenario: Multiple tasks in one column

- **WHEN** multiple tasks share the same status
- **THEN** the system SHALL list all of them within that status column

### Requirement: Dynamic rendering from in-memory state

The system SHALL maintain all tasks in an in-memory data structure in JavaScript only. The visible task list SHALL update after each successful creation without reloading the page.

#### Scenario: No persistence

- **WHEN** the user creates tasks and refreshes the page
- **THEN** previously created tasks SHALL NOT be restored from storage by this application

### Requirement: Empty state

When there are zero tasks, the system SHALL show an empty state message or region that communicates there are no tasks yet. When at least one task exists, that empty state SHALL NOT be shown.

#### Scenario: No tasks on load

- **WHEN** the user loads the page and no tasks exist
- **THEN** the system SHALL display the empty state

#### Scenario: First task hides empty state

- **WHEN** the user creates the first task successfully
- **THEN** the empty state SHALL be hidden
- **THEN** the new task SHALL be visible in the To Do column

### Requirement: File structure and technology constraints

The implementation SHALL use `src/index.html` for structure, `src/styles.css` for presentation, and `src/app.js` for behavior. The implementation SHALL use vanilla JavaScript and DOM APIs only, without frontend frameworks, build steps, backend calls, or persistent storage APIs for task data in this change.

#### Scenario: Separation of concerns

- **WHEN** a maintainer inspects the source
- **THEN** markup, styles, and scripts SHALL reside in the three files above (linked appropriately) without embedding large style or script blocks in the HTML file beyond minimal wiring if needed
