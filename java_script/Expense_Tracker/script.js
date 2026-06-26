let expenseName = document.querySelector('.js-expense-name');
let expenseAmount = document.querySelector('.js-expense-amount');
let expenseDate = document.querySelector('.js-expense-date');
let expenseCategory = document.querySelector('.js-category');

const expense = JSON.parse(localStorage.getItem('Expense')) || [];
let currentEditingIndex = null;

// Add Expense
document.querySelector('.add-btn').addEventListener("click", () => {
    if ((expenseName.value === '') || (expenseAmount.value == '') || (expenseDate.value == '') || (expenseCategory.value == '')) {
        alert('please enter valid expense')
    } else {
        expense.push({
            name: expenseName.value,
            amount: expenseAmount.value,
            date: expenseDate.value,
            category: expenseCategory.value
        });
        renderexpense();
    }

    localStorage.setItem('Expense', JSON.stringify(expense));

    expenseName.value = '';
    expenseAmount.value = '';
    expenseDate.value = '';
    expenseCategory.value = '';
});

function renderexpense(data) {
    let tableHtml = `
    <table>
        <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Action</th>
        </tr>
    `;

    data.forEach((e, index) => {
        tableHtml += `
        <tr>
            <td>${e.name}</td>
            <td>${e.amount}</td>
            <td>${e.date}</td>
            <td>${e.category}</td>
            <td>
                <button class="js-edit-btn" data-index="${index}">Edit</button>
                <button class="js-del-btn" data-index="${index}">Delete</button>
            </td>
        </tr>
        `;
    });

    tableHtml += `</table>`;
    document.querySelector('.body').innerHTML = tableHtml;

    delAction();
    editAction();
    rendertotal();
}

function renderform(index) {
    let formhtml = `
    <h4>Edit Expenses</h4>

    <div class="top">
        <input type="text" id="Edit-expense-name" placeholder="Expense Name">
        <input type="number" id="Edit-expense-Amount" placeholder="Expense Amount">
    </div>

    <div class="mid">
        <input type="date" id="Edit-expense-Date">

        <select id="Edit-expense-category">
            <option value="food">Food</option>
            <option value="Travell">Travell</option>
            <option value="Shopping">Shopping</option>
            <option value="Grocery">Grocery</option>
        </select>
    </div>

    <button class="save-btn">Save</button>
    `;

    document.querySelector('.End').innerHTML = formhtml;

    // Fill form with existing values
    document.querySelector('#Edit-expense-name').value =
        expense[index].name;

    document.querySelector('#Edit-expense-Amount').value =
        expense[index].amount;

    document.querySelector('#Edit-expense-Date').value =
        expense[index].date;

    document.querySelector('#Edit-expense-category').value =
        expense[index].category;

    // Attach save listener AFTER form exists
    document.querySelector('.save-btn').addEventListener("click", saveEdit);
}

function saveEdit() {
    if (currentEditingIndex === null) return;

    expense[currentEditingIndex].name =
        document.querySelector('#Edit-expense-name').value;

    expense[currentEditingIndex].amount =
        document.querySelector('#Edit-expense-Amount').value;

    expense[currentEditingIndex].date =
        document.querySelector('#Edit-expense-Date').value;

    expense[currentEditingIndex].category =
        document.querySelector('#Edit-expense-category').value;

    localStorage.setItem('Expense', JSON.stringify(expense));
    renderexpense(expense);

    document.querySelector('.End').innerHTML = '';
}

function delAction() {
    const deleteBtns = document.querySelectorAll('.js-del-btn');

    deleteBtns.forEach((button) => {
        const index = button.dataset.index;

        button.addEventListener("click", () => {
            expense.splice(index, 1);
            localStorage.setItem('Expense', JSON.stringify(expense));
            renderexpense();
        });
    });
}

function editAction() {
    const editBtns = document.querySelectorAll('.js-edit-btn');

    editBtns.forEach((button) => {
        const index = button.dataset.index;

        button.addEventListener("click", () => {
            currentEditingIndex = index;
            renderform(index);
        });
    });
}

function rendertotal() {
    let total = 0;

    expense.forEach((e) => {
        total += Number(e.amount);
    });

    document.querySelector('.bottom').innerHTML = `Total: $${total}`;
}

let search;
let searchInput = document.querySelector('.js-search')
let matchingExpense = []
document.querySelector(".search-btn").addEventListener("click", () => {
    search = searchInput.value.trim();
    let normalizedSearch = search.toLowerCase();
    if (search === "") {
        alert('please enter valid search')
        return;
    }
    matchingExpense = []
    expense.forEach((e) => {
        let SavedExpense = e.name.toLowerCase();
        if (SavedExpense.includes(normalizedSearch)) {
            matchingExpense.push(e)
        }
    })
    renderexpense(matchingExpense)
    console.log(matchingExpense)
    searchInput.value = '';
})
renderexpense(expense);