const tasks = [];
let nextId = 1;

const STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
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

function renderTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-card";
  li.dataset.taskId = String(task.id);

  const titleEl = document.createElement("p");
  titleEl.className = "task-card__title";
  titleEl.textContent = task.title;
  li.appendChild(titleEl);

  if (task.description) {
    const descEl = document.createElement("p");
    descEl.className = "task-card__description";
    descEl.textContent = task.description;
    li.appendChild(descEl);
  }

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
