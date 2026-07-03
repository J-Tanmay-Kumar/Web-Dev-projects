import { questions } from "./Questions.js";

// ==========================================
// 1. APPLICATION STATE
// ==========================================
const state = {
    currentQuestionIndex: 0,
    score: 0,
    hasSubmitted: false,
    
    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hasSubmitted = false;
    }
};

// ==========================================
// 2. DOM ELEMENT CACHING & SETUP
// ==========================================
const oldContainer = document.querySelector('.Container');
const startBtn = document.querySelector('.Start-btn');

// Create the new container once and keep it in memory
const newContainer = document.createElement('div');
newContainer.className = 'newContainer';

// ==========================================
// 3. CORE LOGIC / BUSINESS ACTIONS
// ==========================================
const handleSubmission = () => {
    // Prevent double submission for the same question
    if (state.hasSubmitted) return;

    const selectedOption = newContainer.querySelector('input[name="quiz"]:checked');
    if (!selectedOption) {
        alert("Please select an answer before submitting!");
        return;
    }

    state.hasSubmitted = true;
    const currentData = questions[state.currentQuestionIndex];
    const userAnswer = selectedOption.value;

    // Validate and update score
    if (userAnswer === currentData.answer) {
        state.score++;
        console.log("Correct! Current score:", state.score);
    } else {
        console.log("Wrong answer. Current score:", state.score);
    }

    // Update UI View for submission
    const submittedDiv = newContainer.querySelector('.js-submited');
    if (submittedDiv) submittedDiv.classList.add('js-submited-css');
};

const handleNextQuestion = () => {
    if (!state.hasSubmitted) {
        alert("Please submit your answer before moving to the next question!");
        return;
    }
    
    state.currentQuestionIndex++;
    state.hasSubmitted = false; // Reset submission lock for the next question
    renderQuestion();
};

// ==========================================
// 4. UI RENDERING (PURE VIEWS)
// ==========================================
const renderQuestion = () => {
    const currentData = questions[state.currentQuestionIndex];

    // Screen: Quiz Completed
    if (!currentData) {
        newContainer.innerHTML = `
            <h2>Quiz Completed!</h2>
            <h4>Total Score: ${state.score} / ${questions.length}</h4>
            <button class="Restart-btn">Restart Quiz</button>
        `;
        return;
    }

    // Build Options Template
    const optionsHTML = currentData.options.map(option => `
        <label><input type="radio" name="quiz" value="${option}" />${option}</label>
    `).join('');

    // Inject layout template cleanly
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
            <img src="checkmark.png" alt="Checked">
            Submitted
        </div>
        <div class="Action">
            <button class="Submit-btn">Submit</button>
            <button class="Next-btn">Next</button>
        </div>
    `;
};

// ==========================================
// 5. GLOBAL EVENT DELEGATION (Initialized ONCE)
// ==========================================
const initEventListeners = () => {
    // Start button swaps the screen out
    startBtn?.addEventListener("click", () => {
        oldContainer.replaceWith(newContainer);
        renderQuestion();
    });

    // Delegate clicks inside newContainer dynamically based on target classes
    newContainer.addEventListener("click", (event) => {
        const target = event.target;

        if (target.classList.contains("Submit-btn")) {
            handleSubmission();
        } 
        else if (target.classList.contains("Next-btn")) {
            handleNextQuestion();
        } 
        else if (target.classList.contains("Restart-btn")) {
            state.reset();
            renderQuestion();
        }
    });
};

// Run initialization
initEventListeners();