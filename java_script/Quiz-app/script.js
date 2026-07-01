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
</div>
`;

// 4. Swap the old container out for the new container instantly
let start = document.body.querySelector('.Start-btn')
start.addEventListener("click", () => {
    oldContainer.replaceWith(newContainer);
})


