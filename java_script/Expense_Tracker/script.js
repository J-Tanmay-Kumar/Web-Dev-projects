let expenseName = document.body.querySelector('.js-expense-name')
let expenseAmount = document.body.querySelector('.js-expense-amount')
let expenseDate = document.body.querySelector('.js-expense-date')
let expenseCategory = document.body.querySelector('.js-category')

const expense = []

document.body.querySelector('.add-btn').addEventListener("click", () => {
    let expenseInput = expenseName.value;
    console.log(expenseInput)
    let amountInput = expenseAmount.value;
    console.log(amountInput)
    let DateInput = expenseDate.value;
    console.log(DateInput);
    let categoryInput = expenseCategory.value;
    console.log(categoryInput)

    expense.push(
        {
            name: expenseInput,
            amount: amountInput,
            date: DateInput,
            category: categoryInput,
        }
    )
    renderexpense()
    expenseName.value = '';
    expenseAmount.value = '';
    expenseDate.value = '';
    expenseCategory.value='';
    console.log(expense)
    
        const Deletebtn = document.querySelectorAll('.js-del-btn')
        Deletebtn.forEach((button,index)=>{
            const Index = button.dataset.index
            button.addEventListener("click",()=>{
                expense.splice(Index,1)
                renderexpense()
            })
        })
})

let tableHtml = '';
function renderexpense() {
    tableHtml=`
    <table> 
    <tr>
    <th>Expense-Name</th>
    <th>Amount</th>
                <th>Date</th>
                <th>cateogory</th>
                <th>Action</th>
                </tr>
                `
                expense.forEach((e,index) => {
        tableHtml+=`
        <tr>
        <td>${e.name}</td>
        <td>${e.amount}</td>
        <td>${e.date}</td>
        <td>${e.category}</td>  
        <td>
        <button>edit</button>
        <button class="js-del-btn" data-Index="${index}">Delete</button>
        </td>
        </tr>
        `
    })
    tableHtml+=
    `</table>`
    document.body.querySelector('.body').innerHTML = tableHtml;
}