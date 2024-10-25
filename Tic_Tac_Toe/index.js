const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const winningPosotions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
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
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "Y";
        sine = "X"
    }
    else{
        currentPlayer = "X";
        sine = "O";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPosotions.forEach((position) =>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[0]] === gameGrid[position[2]]) ){
            
            // check winner is X or Y
            if(gameGrid[position[0]] == "X") answer = "X";
            else answer = "Y";

            // for disable events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            // for winner box background highlight 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    })

    // for winner and new game
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    
    let gameTie = true;
    gameGrid.forEach((box) =>{
        if(box === "") gameTie = false
    });

    if(gameTie){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
        return;
    }
    
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


initGame();
newGameBtn.addEventListener("click", initGame);