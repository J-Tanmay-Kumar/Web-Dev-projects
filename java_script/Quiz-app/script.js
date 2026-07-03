import { questions } from "./Questions.js";
// 1. Select the old container from the DOM
const oldContainer = document.body.querySelector('.Container');

// 2. Create the new container element
const newContainer = document.createElement('div');
newContainer.className = 'newContainer';

// 4. Swap the old container out for the new container instantly
let currentQuestionIndex = 0;


const renderQuestion = () => {
    const currentData = questions[currentQuestionIndex];
    console.log(currentData?.answer);
    console.log("index:", currentQuestionIndex);
    // Safety check: if we run out of questions
    if (!currentData) {
        console.log("quiz completed");
        newContainer.innerHTML = `<h2>Quiz Completed!</h2>`;
        return;
    }

    // 1. Loop through whatever options exist for THIS specific question dynamically
    const optionsHTML = currentData.options.map(option => `
        <label><input type="radio" name="quiz" value="${option}" />${option}</label>
    `).join('');

    // 2. Inject the HTML cleanly without hardcoding indices
    newContainer.innerHTML = `
        <div class="question">
            <h4>${currentData.question}</h4>
        </div>
        <div class="options">
            <div class="options-grid">
                ${optionsHTML}
            </div>
        </div>
        <div class="submited js-submited">
            <img src="checkmark.png">
            Submited
        </div>
        <div class="Action">
            <div>
                <button class="Submit-btn">Submit</button>
            </div>
            <div>
                <button class="Next-btn">Next</button>
            </div>
        </div>
    `;

    // 3. Bind events now that the layout is guaranteed to render fully
    setupEventListeners();
};
const setupEventListeners = () => {
    const submit = newContainer.querySelector('.Submit-btn');
    const next = newContainer.querySelector('.Next-btn');

    // Safety check: Make sure both buttons actually exist in the HTML
    if (!submit || !next) {
        console.error("Could not find .Submit-btn or .Next-btn inside newContainer. Check your HTML template string structure.");
        return; 
    }
    console.log("setting listeners");
    submit.addEventListener("click", () => {
        const submittedDiv = newContainer.querySelector('.js-submited');
        if (submittedDiv) {
            submittedDiv.classList.add('js-submited-css');
        }
    });

    next.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestion();
    });
};

const start = document.body.querySelector('.Start-btn')
start.addEventListener("click", () => {
    oldContainer.replaceWith(newContainer);
    renderQuestion()
})