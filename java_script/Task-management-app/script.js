import { tasks } from "./data/task.js";

let taskInput = document.querySelector('.task-form__input');
let addTaskButton = document.querySelector('.task-form__submit');
let taskListContainer = document.querySelector('.js-task-list'); // Selected the container

let emptyHtml = `
      <div class="task-empty" data-task-empty>
        <span class="task-empty__icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        </span>
        <p class="task-empty__title">Nothing on the list</p>
        <p class="task-empty__subtext">Add a job above to get started.</p>
      </div>
`;

// 1. Check on initial load
if (tasks.length === 0) {
    taskListContainer.innerHTML = emptyHtml;
}

addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    let taskText = taskInput.value.trim();
    
    // Prevent adding empty tasks
    if (!taskText) return; 

    taskInput.value = '';
    tasks.push({
        id: tasks.length + 1,
        text: taskText,
    });

    let taskHtml = '';
    tasks.forEach((task) => {
        taskHtml = taskHtml + `
            <li class="task-item" data-task-id="${task.id}">
              <button
                type="button"
                class="task-item__checkbox"
                data-task-checkbox
                role="checkbox"
                aria-checked="false"
                aria-label="Mark '${task.text}' as complete">
              </button>
    
              <span class="task-item__label" data-task-label>${task.text}</span>
    
              <button
                type="button"
                class="task-item__delete"
                data-task-delete
                aria-label="Delete '${task.text}'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </li>
        `;
    });
    
    // 2. Render the tasks (this automatically replaces the emptyHtml)
    taskListContainer.innerHTML = taskHtml;
});