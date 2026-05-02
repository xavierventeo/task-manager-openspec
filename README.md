# Task Manager (Spec Driven Development with OpenSpec)

## 1. Project overview

This repository contains a **simple task manager** that runs in the browser. It is built with **HTML**, **CSS**, and **vanilla JavaScript** only: one page, a small set of styles, and a single script that updates the page from in-memory data.

The goal is **learning and experimentation**—a small codebase you can read, change, and extend without fighting a framework or a build pipeline.

## 2. Purpose

The project is designed **for training**. It is a safe place to practice:

- **Vanilla JavaScript** — functions, events, and data in plain JS  
- **DOM manipulation** — creating and updating elements from your task model  
- **Structured development** — working from specs and small, clear steps instead of one large unstructured change

Together, these mirror how you might approach a real front-end feature, but with a scope small enough to finish in a session or two.

## 3. Use of OpenSpec

This project was developed using **[OpenSpec](https://github.com/fission-ai/openspec)** — a **specification-driven development** workflow where you describe *what* you want (proposals and specs), *how* you plan to build it (design), and *checkable tasks* before and while you code. OpenSpec helps keep requirements, design, and implementation aligned.

- OpenSpec on GitHub: [https://github.com/fission-ai/openspec](https://github.com/fission-ai/openspec)

In this repo, OpenSpec lives under `openspec/` (changes, archived changes, and project specs). You do not need the OpenSpec CLI to **run** the app; it is part of how the project was **grown** over time.

### Setting up OpenSpec

You only need **Node.js** installed on your machine (OpenSpec is a Node-based tool). Follow the [OpenSpec repository](https://github.com/fission-ai/openspec) to install the CLI itself globally:

```bash
npm install -g @fission-ai/openspec@latest
```

From the **project root** of this repository, run:

```bash
openspec init
```

During `openspec init`, the setup assistant was used to select **Cursor**, **Claude**, and **GitHub Copilot** as integrated tools (so the generated commands and skills match those environments).

For more detail, see the [OpenSpec documentation](https://github.com/fission-ai/openspec#docs) on GitHub.

## 4. Project setup

**Structure**

- Application files live under **`src/`**:
  - `src/index.html` — page structure and wiring  
  - `src/styles.css` — layout and styling  
  - `src/app.js` — behavior, state, and DOM updates  

**Requirements**

- **No build tools** and **no frameworks** — a modern desktop browser is enough.

**How to run**

1. Open `src/index.html` in your browser.  
2. Because assets are linked as `styles.css` and `app.js` **next to** `index.html`, open the file **from the `src` folder** (for example via “Open File” on `src/index.html`, or a static server whose root is `src/`).  

If styles or script do not load, check that the browser is resolving paths relative to `src/`.

## 5. Development process

The app was built **incrementally** with OpenSpec:

1. A **proposal** described the next slice of work (what and why).  
2. **Design** and **specs** captured how it should behave.  
3. **Tasks** listed small implementation steps.  
4. Implementation followed those tasks, then changes could be **archived** when done.

Each feature slice started from an **OpenSpec proposal command** (in Cursor, commands such as **`/opsx:propose`** or **`/opsxpropose`**), followed by apply and archive steps where used. The exact wording used in this project is preserved in **`prompts.md`** (see below).

## 6. Prompts reference

Every prompt used to drive proposals, applies, and archives for this project is recorded in **`prompts.md`** at the root of the repository.

That file is a **step-by-step log**: it shows how the board went from a first slice (create tasks and columns) to full interactions (edit, delete, moves, drag-and-drop) and follow-up fixes. Reading it alongside `openspec/changes/archive/` gives a clear picture of how the app evolved.

## 7. Features

The UI currently supports:

- **Task creation** — title (required) and optional description; new tasks start in **To Do**  
- **Task editing** — change title and description with validation  
- **Task deletion** — remove a task from the board  
- **State changes** — move tasks among **To Do**, **In Progress**, and **Done** using on-card controls  
- **Drag and drop** — move tasks between columns by dragging cards onto another column’s list  

All task data lives **in memory** in the browser for the lifetime of the page.

## 8. Constraints

By design, this training project does **not** include:

- **Front-end frameworks** (no React, Vue, Angular, etc.)  
- **A backend** or **database**  
- **Persistent storage** (refreshing the page clears tasks)  

Keeping these boundaries makes the code easier to follow and keeps the focus on the browser, the DOM, and a clear spec-driven workflow.
