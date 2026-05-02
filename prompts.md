## Prompt 1

/opsxpropose
"Create the first feature of the Task Manager defined in the project.

Build an initial simple version of the main task management interface.

This screen should include:

- base HTML structure
- basic CSS styling
- initial JavaScript logic
- a form to create tasks
- a visual list of tasks grouped by status
- three columns: To Do, In Progress, and Done
- an empty state when there are no tasks

Behavior:

- allow creating a task with a title and optional description
- new tasks must be created in the To Do state by default
- validate that the title is not empty
- show a validation message if the title is empty
- dynamically render created tasks
- keep data in memory only (no backend or database)

Focus on:

- simple structure under the src folder
- clear and maintainable code
- basic separation between HTML, CSS, and JavaScript
- use of vanilla JavaScript
- simple DOM manipulation
- clean and easy-to-understand UI

Do not add functionality outside the defined scope.

Do not implement yet:

- task editing
- task deletion
- state changes
- drag and drop
- backend
- persistent storage"


## Prompt 2
/opsx-apply initial-task-board


## Prompt 3
/opsx-archive initial-task-board

## Prompt 4
/opsxpropose
"Complete the remaining Task Manager features defined in the project.

Extend the existing vanilla HTML, CSS, and JavaScript implementation to support:

- task editing
- task deletion
- state changes
- drag and drop

Behavior:

- allow users to edit an existing task title and description
- validate that an edited task title is not empty
- allow users to delete a task from the board
- allow users to move tasks between the three states:
  - To Do
  - In Progress
  - Done
- support moving tasks using explicit UI controls
- add drag and drop support to move tasks between columns
- update the UI immediately after every change
- keep all data in memory only, without backend or database

Focus on:

- keeping the existing project structure under the src folder
- maintaining simple vanilla JavaScript
- clear DOM manipulation
- readable event handling
- small and focused functions
- clean UI feedback for editing, deleting, moving, and dragging
- preserving the existing create-task functionality

Do not add functionality outside the defined scope.

Do not implement:

- backend
- database
- authentication
- persistent storage
- external frameworks
- build tools"


## Pronpt 5
/opsx-apply task-board-interactions

## Pronpt 6
/opsx-archive task-board-interactions

## Prompt 7
/opsxpropose
"Fix the drag and drop behavior in the Task Manager.

Current problem:

When a task card is dragged from one status column to another, the card visually moves during the interaction but does not persist in the new column. After the UI re-renders, the task returns to its previous status.

Expected behavior:

- When a task is dropped into a different column, its internal status must be updated to match the target column.
- The task must remain in the new column after re-rendering.
- The UI and in-memory task state must stay synchronized.

Behavior to implement:

- Detect the target column where the task is dropped.
- Read the target status from the drop zone.
- Find the dragged task in the in-memory tasks collection.
- Update the task status to the new status.
- Re-render the board after the status update.
- Preserve existing functionality:
  - task creation
  - task editing
  - task deletion
  - button-based state changes, if already implemented

Focus on:

- fixing the existing drag and drop logic
- keeping the solution simple
- avoiding duplicated state
- ensuring the DOM is rendered from the task data, not from temporary visual movement
- using clear function names

Do not add new features outside this bug fix.

Do not implement:

- backend
- database
- persistent storage
- external frameworks
- build tools"

## Prompt 8
/opsx-apply fix-task-dnd-persist

## Prompt 9
/opsx-archive fix-task-dnd-persist

## Prompt 10
/opsxpropose
"Review and fix the drag and drop behavior across board columns.

Currently, drag and drop only works correctly when a column contains at least one card. If a column is empty, it is not possible to move a card into that state.

Review the following sections/columns:

To Do
In Progress
Done

Objective:

allow cards to be moved into any column, even when it is empty
ensure drop zones remain active even without cards
if needed, define a minimum height/space for each column so dropping is possible

Focus on:

keeping the logic simple and clear
not adding functionality outside the defined scope
preserving the current board structure
improving only the drag and drop behavior for empty columns"

## Prompt 11
/opsx-apply fix-dnd-empty-columns

## Prompt 12
/opsx-archive fix-dnd-empty-columns

