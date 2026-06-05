const URL = "https://randomuser.me/api/?results=5";
let button = document.body.querySelector(".btn")

async function display() {
    try{
        let response = await fetch(URL);
        let data = await response.json()
        const userArrays = data.results;
        const HtmlContent = userArrays.map(user=>{
            return`
                <div class="user-card" style="border: 1px solid #4f46e5; margin: 10px; padding: 15px; border-radius: 10px;">
                    <img src="${user.picture.large}" alt="picture" style="border-radius: 50%;">
                    <h3>Name: ${user.name.first} ${user.name.last}</h3>
                    <p>Email: ${user.email}</p>
                </div>
            `;
        }).join('');
        document.querySelector(".card").innerHTML=HtmlContent;
    }catch(err){
        console.log(err)
    }
}

button.addEventListener("click",display)
