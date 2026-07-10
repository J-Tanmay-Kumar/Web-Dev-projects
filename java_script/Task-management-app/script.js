import { tasks } from "./data/task.js";

let taskInput = document.querySelector('.task-form__input');
let addTaskButton = document.querySelector('.task-form__submit');

addTaskButton.addEventListener('click', (e)=>{
    e.preventDefault();
    let taskText = taskInput.value;
    taskInput.value = '';
    tasks.push({
        id: tasks.length + 1,
        text: taskText,
    })
    let taskHtml = '';
    tasks.forEach((task)=>{
        taskHtml = taskHtml + `
               <li class="task-item" data-task-id="${task.id}">
              <button
                type="button"
                class="task-item__checkbox"
                data-task-checkbox
                role="checkbox"
                aria-checked="false"
                aria-label="Mark 'Fix the porch light switch' as complete">
              </button>
    
              <span class="task-item__label" data-task-label>${task.text}</span>
    
              <button
                type="button"
                class="task-item__delete"
                data-task-delete
                aria-label="Delete 'Fix the porch light switch'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </li>
        `
    })
    document.querySelector('.js-task-list').innerHTML = taskHtml;
})


