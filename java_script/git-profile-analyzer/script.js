const URL = "https://api.github.com/users/octocat"

async function display() {
    let response = await fetch(URL)
    let data = await response.json();
    console.log(data)
}

const Search = document.body.querySelector(".search-submit-btn")

Search.addEventListener("click",()=>{
    display();
})