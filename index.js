let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true//playerX,player0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    countClick = 0;
}
let countClick = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        countClick += 1;
        console.log("box was clicked", countClick);
        box.innerHTML = "click";
        if (turn0) {
            //player0
            box.innerText = "O";

            turn0 = false;
        }
        else {//playerX
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerHTML = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const showTie=()=>{
    msg.innerHTML = `There is a tie among O and X `;
    msgContainer.classList.remove("hide");
    disableBoxes();

}

const checkWinner = () => {
    let isWinner=false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val == pos3Val) {
                console.log("Winner", pos1Val);
                console.log(countClick);
                showWinner(pos1Val);
                isWinner=true;
            }
        }
    }
    // isWinner ka use nahi karunga to 9th move agar succed ka hoga to vo run nahi karega
    if (countClick === 9 && isWinner===false) {
        showTie();
    }

}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);