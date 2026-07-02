import { questions } from "./Questions.js";
// 1. Select the old container from the DOM
const oldContainer = document.body.querySelector('.Container');

// 2. Create the new container element
const newContainer = document.createElement('div');
newContainer.className = 'newContainer';

// 3. Inject the modern quiz structure using a template string
newContainer.innerHTML = `
<div class="question">
<h4>what is the capital of india</h4>
</div>
<div class="options">
<div class="Section-1">
<label><input type="radio" name="quiz" /> New Delhi</label>
<label><input type="radio" name="quiz" /> Mumbai</label>
</div>
<div class="Section-2">
<label><input type="radio" name="quiz" /> Kolkata</label>
<label><input type="radio" name="quiz" /> Chennai</label>
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

// 4. Swap the old container out for the new container instantly
let currentQuestionIndex = 0;
let start = document.body.querySelector('.Start-btn')
start.addEventListener("click", () => {
    oldContainer.replaceWith(newContainer);

    let submit = document.querySelector('.Submit-btn')
    submit.addEventListener("click", () => {
        document.querySelector('.js-submited').classList.add('js-submited-css')
    })


    let next = document.querySelector('.Next-btn')
    next.addEventListener('click',()=>{
        currentQuestionIndex++;
        renderQuestion()
    })

})


questions.forEach((question,currentQuestionIndex)=>{
    currentQuestionIndex;
})

const renderQuestion=()=>{
    console.log(questions[currentQuestionIndex])
}
