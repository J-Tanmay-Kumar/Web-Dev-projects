let expenseName = document.body.querySelector('.js-expense-name')
let expenseAmount = document.body.querySelector('.js-expense-amount')
let expenseDate = document.body.querySelector('.js-expense-date')
let expenseCateogory = document.body.querySelector('.js-cateogory')

const expense=[]

document.body.querySelector('.add-btn').addEventListener("click", () => {
    let expenseInput = expenseName.value;
    console.log(expenseInput)
    let amountInput = expenseAmount.value;
    console.log(amountInput)
    let DateInput = expenseDate.value;
    console.log(DateInput);
    let cateogoryInput = expenseCateogory.value;
    console.log(cateogoryInput)
    
    expense.push(
        {
            name:expenseInput,
            amount:amountInput,
            date:DateInput,
            cateogory:cateogoryInput,   
        }
    )
    expenseName.value = '';
    expenseAmount.value = '';
    expenseDate.value = '';
    console.log(expense)
    let tableHtml=
       `
    <table> 
       <tr>
            <th>Expense-Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>cateogory</th>
            <th>Action</th>
        </tr>
        `;
    expense.forEach((e)=>{
            tableHtml=tableHtml+`
                    <tr>
                        <td>${e.name}</td>
                        <td>${e.amount}</td>
                        <td>${e.date}</td>
                        <td>${e.cateogory}</td>
                        <td>
                            <button>edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                </table>
            `
    })
    document.body.querySelector('.boby').innerHTML= tableHtml;
})


