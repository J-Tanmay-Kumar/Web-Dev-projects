import { questions } from "./Questions.js";

// 1. Select the old container from the DOM
const oldContainer = document.body.querySelector('.Container');

// 2. Create the new container element
const newContainer = document.createElement('div');
newContainer.className = 'newContainer';

let currentQuestionIndex = 0;

const renderQuestion = () => {
    const currentData = questions[currentQuestionIndex];
    
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

    // 2. Inject the HTML cleanly
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

    if (!submit || !next) {
        console.error("Buttons not found.");
        return; 
    }

    submit.addEventListener("click", () => {
        // Use the :checked pseudo-class to find the selected radio button
        const selectedOption = newContainer.querySelector('input[name="quiz"]:checked');
        
        if (selectedOption) {
            const userAnswers = selectedOption.value;
            console.log("User selected answer:", userAnswers);
            
            // Check if the answer is correct
            const currentData = questions[currentQuestionIndex];
            if (userAnswers === currentData.answer) {
                console.log("Correct!");
            } else {
                console.log("Wrong answer.");
            }

            // Show submitted confirmation
            const submittedDiv = newContainer.querySelector('.js-submited');
            if (submittedDiv) {
                submittedDiv.classList.add('js-submited-css');
            }
        } else {
            alert("Please select an answer before submitting!");
        }
    });

    next.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestion();
    });
};

const start = document.body.querySelector('.Start-btn');
start.addEventListener("click", () => {
    oldContainer.replaceWith(newContainer);
    renderQuestion();
});