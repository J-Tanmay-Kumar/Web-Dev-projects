const score = JSON.parse(localStorage.getItem('scored')) || {
    win: 0,
    lose: 0,
    tie: 0
}

// Game_function
function playGame(myMove) {
    let computermove = '';
    let result = '';

    const randommove = Math.random()
    if (randommove >= 0 && randommove < 1 / 3) {
        computermove = "rock"
    } else if (randommove >= 1 / 3 && randommove < 2 / 3) {
        computermove = "paper"
    } else if (randommove >= 2 / 3 && randommove < 1) {
        computermove = "scissors"
    }

    if (myMove === computermove) {
        result = "Tie";
    } else if ((myMove === "rock" && computermove === "paper") || (myMove === "paper" && computermove === "scissors") || (myMove === "scissors" && computermove === "rock")) {
        result = "you lose"
    } else if ((myMove === "rock" && computermove === "scissors") || (myMove === "paper" && computermove === "rock") || (myMove === "scissors" && computermove === "paper")) {
        result = 'you win';
    }


    if (result === 'you win') {
        score.win += 1;
    } else if (result === 'you lose') {
        score.lose += 1;
    } else if (result === 'Tie') {
        score.tie += 1;
    }

    localStorage.setItem('scored', JSON.stringify(score))
    ScoreBoard.innerHTML = `your pick ${myMove}<br>computer picked ${computermove}<br>${result}<br>
    Wins:${score.win} loses:${score.lose} ties:${score.tie}`

}

// Reset_button
const resetButton = () => {
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    ScoreBoard.innerHTML = `Wins:${score.win} Loses:${score.lose} Ties:${score.tie}`
    localStorage.removeItem('scored')
}

let resetScore = document.createElement('button')
resetScore.innerText = 'Reset-Score'
document.body.append(resetScore)

resetScore.addEventListener("click", () => {
    resetButton();
})

//Score_board 
let ScoreBoard = document.createElement('div')
document.body.append(ScoreBoard)
ScoreBoard.innerHTML = `Wins:${score.win} Loses:${score.lose} Ties:${score.tie}`


// Buttons_Action
let rock = document.body.querySelector(".rock-btn")
let paper = document.body.querySelector(".paper-btn")
let scissors = document.body.querySelector(".scissors-btn")
rock.addEventListener("click", () => {
    playGame("rock")
})

paper.addEventListener("click", () => {
    playGame("paper")
})

scissors.addEventListener("click", () => {
    playGame("scissors")
})

//Auto-play
let AutoElement = document.body.querySelector('.auto-btn')
let id = '';
AutoElement.addEventListener("click", () => {
    if (AutoElement.innerHTML === "Auto-play") {
        AutoElement.innerHTML = "stop-play"
        let myMove = '';
        const move = () => {
            const randommove = Math.random()
            if (randommove >= 0 && randommove < 1 / 3) {
                myMove = "rock"
            } else if (randommove >= 1 / 3 && randommove < 2 / 3) {
                myMove = "paper"
            } else if (randommove >= 2 / 3 && randommove < 1) {
                myMove = "scissors"
            }
            playGame(myMove)
        }
        id = setInterval(move, 2000)
    } else {
        AutoElement.innerHTML = 'Auto-play'
        clearInterval(id)
    }
})

// key-function
document.body.addEventListener("keydown",()=>{
    key(event)
})
const key = (event) => {
    if (event.key === "r") {
        playGame("rock")
    } else if (event.key === "p") {
        playGame("paper")
    } else if (event.key === "s") {
        playGame("scissors")
    }
}