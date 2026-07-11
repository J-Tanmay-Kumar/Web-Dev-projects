import { tasks as initialTasks } from "./data/task.js";

// 1. Load tasks from localStorage, or fall back to your initial data file if empty
let tasks = JSON.parse(localStorage.getItem('punchlist_tasks'));
if (!tasks) {
  tasks = initialTasks;
  localStorage.setItem('punchlist_tasks', JSON.stringify(tasks));
}

const taskInput = document.querySelector('.task-form__input');
const addTaskButton = document.querySelector('.task-form__submit');
const taskListContainer = document.querySelector('.js-task-list');

const emptyHtml = `
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

// Helper function to save current state to localStorage
const saveToStorage = () => {
  localStorage.setItem('punchlist_tasks', JSON.stringify(tasks));
};

// Render function handles UI updates and event binding seamlessly
const render = () => {
  if (tasks.length === 0) {
    taskListContainer.innerHTML = emptyHtml;
    return;
  }

  let taskHtml = '';
  tasks.forEach((task) => {
    taskHtml += `
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

  taskListContainer.innerHTML = taskHtml;
  attachDeleteListeners();
};

// Target the buttons *after* they are rendered into the DOM
const attachDeleteListeners = () => {
  const deleteButtons = document.querySelectorAll('.task-item__delete');
  
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', (e) => {
      const taskItem = e.target.closest('.task-item');
      const taskId = parseInt(taskItem.dataset.taskId);
      
      // Remove from array data
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveToStorage(); // Save the updated array to localStorage
      }
      
      // Re-render to update the list or show the empty state
      render();
    });
  });
};

// Add Task Event Listener
addTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  
  if (!taskText) return; 

  taskInput.value = '';
  
  // Use Date.now() for a guaranteed unique ID string/number
  tasks.push({
    id: Date.now(), 
    text: taskText,
  });

  saveToStorage(); // Save the new array to localStorage
  render();
});

// Initial load check
render();