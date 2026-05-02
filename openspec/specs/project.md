# Project: Task Manager

## Overview

This project consists of building a simple task management web application. The application will run entirely in the browser and will allow users to organize tasks in a clear and visual way.

The focus of the project is to practice structured development using specifications, clean frontend architecture, and fundamental JavaScript concepts without relying on external frameworks.

## Tech Stack
- HTML
- CSS
- Vanilla JavaScript

No frameworks, build tools, or external libraries are required.

## Objective

Create a lightweight and intuitive interface where users can manage tasks and track their progress through different states.

The application should prioritize simplicity, readability, and maintainability, making it suitable for learning and experimentation.

## Core Concept
A task represents a unit of work that contains basic information such as a title, an optional description, and a status that reflects its progress.

Tasks move through three states:

- `To Do`
- `In Progress`
- `Done`

Tasks should be displayed in a structured layout that allows users to easily understand their current state and interact with them.

## Functional Scope
The application should support:
- Creating new tasks
- Modifying existing tasks
- Deleting tasks
- Displaying tasks in a structured layout
- Updating the state of tasks across their lifecycle (`To Do`, `In Progress`, `Done`)

All interactions should update the user interface dynamically using JavaScript and DOM manipulation.

## UI Expectations
The interface should be simple and clear, including:

- A form to create new tasks
- A visual structure to display tasks grouped by their state
- Individual task elements with relevant information
- Action controls to update, move or remove tasks

The design should remain minimal and focused on usability.


## JavaScript Responsibilities
JavaScript will be responsible for:
- Managing application state in memory
- Handling user interactions
- Updating the DOM dynamically
- Validating user input
- Keeping the UI in sync with the data

## Constraints
- No frontend frameworks (React, Vue, Angular, etc.)
- No backend or database
- No authentication or user management
- No complex UI interactions such as drag and drop
- Keep the implementation simple and easy to understand

## Suggested File Structure
```txt
task-manager-openspec/
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.js