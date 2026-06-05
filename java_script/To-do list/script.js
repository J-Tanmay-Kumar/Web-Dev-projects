let button = document.body.querySelector(".btn")
let input = document.body.querySelector(".to-do-input") 

button.addEventListener("click", () => {

    let task = input.value
    input.value = "";
        
    if (task === "") {
        alert("please enter a valid task")
    } else {
        const li = document.createElement('li')
        const del = document.createElement('button')
        del.innerText = "DELETE"
        li.innerText = task;
        li.appendChild(del)
        document.getElementById("container").appendChild(li);
        del.addEventListener("click", () => {
        li.remove()
        })
    }


})