const tasks = [];
let nextId = 1;
let editingTaskId = null;
/** Set during task card `dragstart`, cleared on `drop` / `dragend` for reliable DnD across browsers. */
let activeDragTaskId = null;

const STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};

const STATUS_LABELS = {
  [STATUS.TODO]: "To Do",
  [STATUS.IN_PROGRESS]: "In Progress",
  [STATUS.DONE]: "Done",
};

function createTask(title, description) {
  return {
    id: nextId++,
    title,
    description: description ?? "",
    status: STATUS.TODO,
  };
}

function addTask(task) {
  tasks.push(task);
}

function findTaskById(id) {
  return tasks.find((t) => t.id === id) ?? null;
}

function updateTaskContent(id, title, description) {
  const task = findTaskById(id);
  if (!task) return;
  task.title = title;
  task.description = description ?? "";
  render();
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;
  tasks.splice(index, 1);
  if (editingTaskId === id) {
    editDialog.close();
  }
  render();
}

function setTaskStatus(id, status) {
  const task = findTaskById(id);
  if (!task || task.status === status) return;
  task.status = status;
  render();
}

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const titleError = document.getElementById("title-error");
const emptyState = document.getElementById("empty-state");
const lists = {
  [STATUS.TODO]: document.getElementById("list-todo"),
  [STATUS.IN_PROGRESS]: document.getElementById("list-in-progress"),
  [STATUS.DONE]: document.getElementById("list-done"),
};

const editDialog = document.getElementById("task-edit-dialog");
const editForm = document.getElementById("edit-task-form");
const editTitleInput = document.getElementById("edit-task-title");
const editDescriptionInput = document.getElementById("edit-task-description");
const editTitleError = document.getElementById("edit-title-error");
const editCancelButton = document.getElementById("edit-cancel");

function setTitleError(message) {
  if (message) {
    titleError.textContent = message;
    titleError.hidden = false;
    titleInput.setAttribute("aria-invalid", "true");
    titleInput.setAttribute("aria-describedby", "title-error");
  } else {
    titleError.textContent = "";
    titleError.hidden = true;
    titleInput.removeAttribute("aria-invalid");
    titleInput.removeAttribute("aria-describedby");
  }
}

function setEditTitleError(message) {
  if (message) {
    editTitleError.textContent = message;
    editTitleError.hidden = false;
    editTitleInput.setAttribute("aria-invalid", "true");
    editTitleInput.setAttribute("aria-describedby", "edit-title-error");
  } else {
    editTitleError.textContent = "";
    editTitleError.hidden = true;
    editTitleInput.removeAttribute("aria-invalid");
    editTitleInput.removeAttribute("aria-describedby");
  }
}

function clearDropHoverClasses() {
  for (const ul of Object.values(lists)) {
    ul.classList.remove("task-list--drop-hover");
  }
}

function resolveDroppedTaskId(event) {
  if (activeDragTaskId !== null && Number.isFinite(activeDragTaskId)) {
    return activeDragTaskId;
  }
  const raw = event.dataTransfer?.getData("text/plain") ?? "";
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function handleColumnDrop(event) {
  event.preventDefault();
  const list = event.currentTarget;
  list.classList.remove("task-list--drop-hover");

  const id = resolveDroppedTaskId(event);
  activeDragTaskId = null;

  const status = list.getAttribute("data-status");
  if (!Number.isFinite(id) || !status) return;

  setTaskStatus(id, status);
}

function openEditForTask(id) {
  const task = findTaskById(id);
  if (!task) return;
  editingTaskId = id;
  editTitleInput.value = task.title;
  editDescriptionInput.value = task.description;
  setEditTitleError("");
  editDialog.showModal();
}

function renderTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-card";
  li.dataset.taskId = String(task.id);
  li.draggable = true;

  const body = document.createElement("div");
  body.className = "task-card__body";

  const titleEl = document.createElement("p");
  titleEl.className = "task-card__title";
  titleEl.textContent = task.title;
  body.appendChild(titleEl);

  if (task.description) {
    const descEl = document.createElement("p");
    descEl.className = "task-card__description";
    descEl.textContent = task.description;
    body.appendChild(descEl);
  }

  li.appendChild(body);

  const actions = document.createElement("div");
  actions.className = "task-card__actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "btn-small btn-secondary";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => openEditForTask(task.id));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "btn-small btn-danger";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  const moveGroup = document.createElement("div");
  moveGroup.className = "task-card__move";
  moveGroup.setAttribute("role", "group");
  moveGroup.setAttribute("aria-label", "Change task status");

  const moveLabel = document.createElement("p");
  moveLabel.className = "task-card__move-label";
  moveLabel.textContent = "Move to";
  moveGroup.appendChild(moveLabel);

  for (const status of [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE]) {
    const moveButton = document.createElement("button");
    moveButton.type = "button";
    moveButton.className = "btn-small btn-secondary";
    moveButton.textContent = STATUS_LABELS[status];
    moveButton.disabled = task.status === status;
    moveButton.addEventListener("click", () => setTaskStatus(task.id, status));
    moveGroup.appendChild(moveButton);
  }

  actions.appendChild(moveGroup);
  li.appendChild(actions);

  li.addEventListener("dragstart", (event) => {
    activeDragTaskId = task.id;
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", String(task.id));
      event.dataTransfer.effectAllowed = "move";
    }
    li.classList.add("dragging");
  });

  li.addEventListener("dragend", () => {
    activeDragTaskId = null;
    li.classList.remove("dragging");
    clearDropHoverClasses();
  });

  return li;
}

function render() {
  for (const ul of Object.values(lists)) {
    ul.innerHTML = "";
  }

  for (const task of tasks) {
    const ul = lists[task.status];
    if (ul) {
      ul.appendChild(renderTaskElement(task));
    }
  }

  emptyState.hidden = tasks.length > 0;
}

for (const ul of Object.values(lists)) {
  ul.addEventListener("dragenter", (event) => {
    event.preventDefault();
  });

  ul.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
    ul.classList.add("task-list--drop-hover");
  });

  ul.addEventListener("dragleave", (event) => {
    if (!ul.contains(event.relatedTarget)) {
      ul.classList.remove("task-list--drop-hover");
    }
  });

  ul.addEventListener("drop", handleColumnDrop);
}

document.addEventListener("dragend", () => {
  activeDragTaskId = null;
  clearDropHoverClasses();
});

editDialog.addEventListener("close", () => {
  editingTaskId = null;
  setEditTitleError("");
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = editTitleInput.value.trim();
  const description = editDescriptionInput.value.trim();
  const id = editingTaskId;

  if (!title) {
    setEditTitleError("Please enter a title.");
    return;
  }

  if (id === null) return;

  setEditTitleError("");
  updateTaskContent(id, title, description);
  editDialog.close();
});

editCancelButton.addEventListener("click", () => {
  editDialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title) {
    setTitleError("Please enter a title.");
    return;
  }

  setTitleError("");
  const task = createTask(title, description);
  addTask(task);
  render();

  titleInput.value = "";
  descriptionInput.value = "";
});

render();
