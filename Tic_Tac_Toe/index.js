const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const winningPosotions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];



let currentPlayer;
let gameGrid;
let sine;

function initGame(){
    currentPlayer = "X";
    sine = "O";
    gameGrid = ["","","","","","","","",""];
    // clear all ui
    boxes.forEach(box, index => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "Y";
        sine = "X"
    }
    else{
        currentPlayer = "X";
        sine = "O";
    }
}

function checkGameOver(){
    newGameBtn.classList.add("active");
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = sine;
        gameGrid[index] = sine;
        boxes[index].style.pointerEvents = "none";

        swapTurn();

        checkGameOver();

    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initGame());