let expenseName = document.body.querySelector('.js-expense-name')
let expenseAmount = document.body.querySelector('.js-expense-amount')
let expenseDate = document.body.querySelector('.js-expense-date')
let expenseCategory = document.body.querySelector('.js-category')

const expense = JSON.parse(localStorage.getItem('Expense')) || [];

document.body.querySelector('.add-btn').addEventListener("click", () => {
    let expenseInput = expenseName.value;
    let amountInput = expenseAmount.value;
    let DateInput = expenseDate.value;
    let categoryInput = expenseCategory.value;


    expense.push(
        {
            name: expenseInput,
            amount: amountInput,
            date: DateInput,
            category: categoryInput,
        }
    )
    localStorage.setItem('Expense', JSON.stringify(expense))
    renderexpense()
    expenseName.value = '';
    expenseAmount.value = '';
    expenseDate.value = '';
    expenseCategory.value = '';
})

let tableHtml = '';
function renderexpense() {
    tableHtml = `
    <table> 
    <tr>
    <th>Expense-Name</th>
    <th>Amount</th>
    <th>Date</th>
    <th>cateogory</th>
    <th>Action</th>
    </tr>
    `
    expense.forEach((e, index) => {
        tableHtml += `
        <tr>
        <td>${e.name}</td>
        <td>${e.amount}</td>
        <td>${e.date}</td>
        <td>${e.category}</td>  
        <td>
        <button class="js-edit-btn">edit</button>
        <button class="js-del-btn" data-Index="${index}">Delete</button>
        </td>
        </tr>
        `
    })
    tableHtml +=
        `</table>`
    document.body.querySelector('.body').innerHTML = tableHtml;
    delAction()
    rendertotal()
}

function delAction() {
    const Deletebtn = document.querySelectorAll('.js-del-btn')
    Deletebtn.forEach((button) => {
        const Index = button.dataset.index
        button.addEventListener("click", () => {
            expense.splice(Index, 1);
            localStorage.setItem(
                'Expense',
                JSON.stringify(expense)
            );
            renderexpense()
            rendertotal()
        })
    })
}

function rendertotal() {
    let total = 0;
    expense.forEach((e) => {
        total += Number(e.amount)
    })
    document.body.querySelector('.bottom').innerHTML = `Total:$${total}`;
}

renderexpense()