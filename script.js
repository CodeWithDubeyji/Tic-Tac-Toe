let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".new-btn");
let message = document.querySelector(".msg");
let turnMsg = document.querySelector(".turn");
let clickCount = 0;
let currPlayer = Math.random() < 0.5 ? 'O' : 'X';
turnMsg.innerText = `${currPlayer}'s turn`;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    currPlayer = Math.random() < 0.5 ? 'O' : 'X';
    clickCount = 0;

    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = 'white';
    }

    message.style.display = 'none';
    turnMsg.innerText = `${currPlayer}'s turn`;
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickCount++;
        if (currPlayer === 'O') {
            box.innerText = "O";
            box.style.color = '#8B1E3F';
        } else {
            box.innerText = "X";
            box.style.color = 'blue';
        }
        box.disabled = true;
        checkWinner();
        currPlayer = (currPlayer === 'X') ? 'O' : 'X';
        turnMsg.innerText = `${currPlayer}'s turn`;
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                message.style.display = 'block';
                message.innerText = `Congratulations, ${pos1Val} IS THE WINNER!!!!`;
                turnMsg.style.display = 'none';
                newBtn.style.display = 'block';
                boxes[pattern[0]].style.backgroundColor = 'lightgreen';
                boxes[pattern[1]].style.backgroundColor = 'lightgreen';
                boxes[pattern[2]].style.backgroundColor = 'lightgreen';
                disableBoxes();
                return;
            }else if (clickCount === 9) {
                message.style.display = 'block';
                turnMsg.style.display = 'none';
                message.innerText = `It's a draw!!`;
                newBtn.style.display = 'block';
            }
        }
    }
};

resetBtn.addEventListener("click", () => {
    resetGame();
    newBtn.style.display = 'none';
    turnMsg.style.display = 'block';
});

newBtn.addEventListener("click", () => {
    resetGame();
    newBtn.style.display = 'none';
    turnMsg.style.display = 'block';
});
