const gameBoard = document.querySelector(".gameBoard");
const gameInfo = document.querySelector(".gameInfo")
const startMessage = document.querySelector(".startMessage")

const player1NameInput = document.getElementById("player1NameInput")
const player2AddButton = document.getElementById("player2AddButton")
const player2NameInput = document.getElementById("player2NameInput")
const player2RemoveButton = document.getElementById("player2RemoveButton")

const player1Span = document.getElementById("player1Turn")
const player2Span = document.getElementById("player2Turn")
const player1Points = document.getElementById("player1Points")
const player2Points = document.getElementById("player2Points")

const startGameButton = document.getElementById("startGameButton")
const restartButton = document.getElementById("restartButton")
let startedGame = false
let  gameOver = false


const gameBoardLogic = () =>{
    let gameArray = [0,1,2,3,4,5,6,7,8]
    let player2Playing = false
    
   

const startGame=() =>{
        player2AddButton.addEventListener("click", ()=> {
        
            player2NameInput.classList.remove("hidden")
            player2RemoveButton.classList.remove("hidden")
            player2AddButton.classList.add("hidden")
            const player2Span = document.getElementById("player2Turn")
            player2Span.textContent= "Player 2"
            player2Playing = true;
        
        })
        player2RemoveButton.addEventListener("click", ()=>{
        
            player2NameInput.classList.add("hidden")
            player2RemoveButton.classList.add("hidden")
            player2AddButton.classList.remove("hidden")
            const player2Span = document.getElementById("player2Turn")
            player2Span.textContent= "Computer"
            player2Playing = false;
        
        
        })
        player1NameInput.addEventListener("input", e=> {
            player1Span.textContent=e.target.value
            
        })
        
        player2NameInput.addEventListener("input", e=> {
            player2Span.textContent=e.target.value
            
        })
        startGameButton.addEventListener("click", ()=>{
            gameBoard.classList.remove("hidden")
            startMessage.classList.add("hidden")
            player1Turn.classList.remove("hidden")
            player2Turn.classList.remove("hidden")
            Player1 = Player(player1Span.textContent,false, "Player1")
            if (player2Playing) Player2 = Player(player2Span.textContent, false, "Player2")
            else Player2=Player("Computer",true,"Player2")
            buildGameBoard(gameArray)
            let active = Player1
            chooseTurn()
        
        })
        
   

    }

const buildGameBoard =  (array) => {
        array.forEach(square => {
            const gameBoardspan = document.createElement("span");
            gameBoardspan.dataset.value = 0
            gameBoardspan.dataset.id = square
            gameBoardspan.dataset.checked = "false"
            
            gameBoard.appendChild(gameBoardspan)

            gameBoardspan.addEventListener("click", e=> humanPlayerTurn(active,e))
            restartButton.addEventListener("click", () => restartGame())
            
        
    });}  

const getPlayableArray = ()=> {
        let playableArray = Array.from(document.querySelectorAll(".gameBoard span"))
        playableArray = playableArray.filter(element=> element.dataset.value ==="0"?  true:false)
        return playableArray
    } 

const chooseTurn = () =>{
    updatePoints()
    checkVictory()    
        if (!gameOver){
            
        let playedArray = Array.from(document.querySelectorAll(".gameBoard span"));
        playedArray = playedArray.filter(element=> element.dataset.value !=="0")
        sum = playedArray.reduce((acc, curr)=>acc + Number(curr.dataset.value), 0 )
        
        sum === 1 ? active = Player2: active = Player1 
        changeActive()
        sum === 1 ? setTimeout(AiPlay, 200):""
        }
        
    } 


const updatePoints = () =>{
    player1Span.textContent= Player1.name;
    player2Span.textContent = Player2.name;
    player1Points.textContent = Player1.score
    player2Points.textContent = Player2.score

}
const changeActive = () =>{
    document.querySelector(".active").classList.remove("active")
    active===Player1? player1Span.classList.add("active"):player2Span.classList.add('active')
    
}  
const checkVictory = () =>{
    let victoryArray = Array.from(document.querySelectorAll(".gameBoard span"))
    victoryArrayValue = victoryArray.map(element => element.dataset.value)
  
    if (Math.abs(Number(victoryArrayValue[0]) +Number(victoryArrayValue[1]) + Number(victoryArrayValue[2])) === 3)    
        return victoryArrayValue[0] === "01"? endGame(Player1):endGame(Player2)
    else if (Math.abs(Number(victoryArrayValue[3]) +Number(victoryArrayValue[4]) + Number(victoryArrayValue[5])) === 3) 
            return victoryArrayValue[3] === "01"? endGame(Player1):endGame(Player2)
    else if (Math.abs(Number(victoryArrayValue[6]) +Number(victoryArrayValue[7]) + Number(victoryArrayValue[8])) === 3) 
            return victoryArrayValue[6] === "01"? endGame(Player1):endGame(Player2)
            
    else if (Math.abs(Number(victoryArrayValue[0]) +Number(victoryArrayValue[3]) + Number(victoryArrayValue[6])) === 3) 
            return victoryArrayValue[0] === "01"? endGame(Player1):endGame(Player2)
    else if (Math.abs(Number(victoryArrayValue[1]) +Number(victoryArrayValue[4]) + Number(victoryArrayValue[7])) === 3) 
            return victoryArrayValue[1] === "01"? endGame(Player1):endGame(Player2)
    else if (Math.abs(Number(victoryArrayValue[2]) +Number(victoryArrayValue[5]) + Number(victoryArrayValue[8])) === 3) 
            return victoryArrayValue[2] === "01"? endGame(Player1):endGame(Player2)

    else if (Math.abs(Number(victoryArrayValue[0]) +Number(victoryArrayValue[4]) + Number(victoryArrayValue[8])) === 3) 
            return victoryArrayValue[0] === "01"? endGame(Player1):endGame(Player2)
    else if (Math.abs(Number(victoryArrayValue[2]) +Number(victoryArrayValue[4]) + Number(victoryArrayValue[6])) === 3) 
            return victoryArrayValue[2] === "01"? endGame(Player1):endGame(Player2)
   
    let drawArray = victoryArrayValue.filter(element => element === "0"?  true:  false)
    
    if (drawArray.length === 0) return endGame("draw")

}

const endGame = (Winner) => {
    gameOver =true
    active = ""
    const victoryDiv = document.createElement("div")
    victoryDiv.className = "victoryDiv"
     Winner === "draw"? victoryDiv.textContent = "Draw!" : victoryDiv.textContent = `Congrats to ${Winner.name}!`, 
                                                                                                Winner.score +=1
     gameInfo.appendChild(victoryDiv)
     
     restartButton.classList.remove("hidden")
     
     

}
const restartGame = (victoryDiv) => {
    if (gameOver){
    gameOver=false
    const gameBoardSpan = document.querySelectorAll(".gameBoard span")
    gameBoardSpan.forEach(span=> {
        span.dataset.value = 0
        span.textContent=""
        span.dataset.checked = false

    })

    let victoryDiv = document.querySelector(".victoryDiv")
    gameInfo.removeChild(victoryDiv)
    restartButton.classList.add("hidden")
    active=Player1
    
    chooseTurn()

    }
}

const  AiPlay = () =>{
        if (!player2Playing &&active === Player2){
            let playableArray =getPlayableArray()
            let randomIndex = Math.floor(playableArray.length*Math.random())
            playableArray[randomIndex].dataset.value-= 1;
            playableArray[randomIndex].textContent = "X"
            playableArray[randomIndex].dataset.checked = true;
            chooseTurn()
        }
    
    }


const humanPlayerTurn = (Player, e) => {

    if (active===Player1|| (active === Player2 && !Player2.AIPlayer)){
    if (e.target.dataset.checked==="false" && Player!==""){
        Player.IDNumber=== "Player1" ? e.target.dataset.value += 1 : e.target.dataset.value -=1;
        
        Number(e.target.dataset.value) === 1? e.target.textContent = "O": e.target.textContent = "X"
        e.target.dataset.checked = true
       
        
    }
   chooseTurn()
}}    

return {startGame}
}


const Player = (name, AIPlayer, IDNumber) => {
    {name}
    {IDNumber}
    {AIPlayer}
    score = 0
    name === ""? name=IDNumber:""

return {name,IDNumber,AIPlayer, score}
}



const TestBoard = gameBoardLogic()

TestBoard.startGame()



 