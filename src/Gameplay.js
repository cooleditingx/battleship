import { Players } from "./Player.js"
import { updateCell, displayMessage } from "./render.js"

let player
let computer
let currentTurn
let gameOver
let winner

export function initializeGame(){
    player = new Players("human")
    computer = new Players("computer")
    player.gameBoard.placeShipRandomly()
    computer.gameBoard.placeShipRandomly()
    currentTurn = "player"
    gameOver = false
    winner = null
}
export function handlesPlayerAttacks(coordinates){
    const computergameboard = document.getElementById("computergameboard")
    if (currentTurn !== "player") {
        return null
    }
    if (gameOver) {
        return null
    }
    const result = computer.gameBoard.receiveAttack(coordinates)
    if (result === false && 
        !computer.gameBoard.hits.includes(coordinates) && 
        !computer.gameBoard.missedAttacks.includes(coordinates)) {
        return null
    }
    let attackedCoords
    if (result === true) {
        attackedCoords = computer.gameBoard.hits[computer.gameBoard.hits.length - 1]
    } else {
        attackedCoords = computer.gameBoard.missedAttacks[computer.gameBoard.missedAttacks.length - 1]
    }
    updateCell(attackedCoords[0], attackedCoords[1], result, computergameboard)
    checkGameOver()
    if (!gameOver) {
        currentTurn = "computer"
        setTimeout(handleCompTurn, 100)
    }
    return result
}
function handleCompTurn(){
    const playergameboard = document.getElementById("playergameboard")
    const result = computer.makeRandomAttack(player.gameBoard)
    let attackedCoords
    if (result === true) {
        attackedCoords = player.gameBoard.hits[player.gameBoard.hits.length - 1]
    } else {
        attackedCoords = player.gameBoard.missedAttacks[player.gameBoard.missedAttacks.length - 1]
    }
    updateCell(attackedCoords[0], attackedCoords[1], result, playergameboard)
    checkGameOver()
    if (!gameOver) {
        currentTurn = "player"
    }
}
function checkGameOver(){
    if (computer.gameBoard.shipsSunk()) {
        gameOver = true
        winner = "player"
        displayMessage(`${winner}has Won`)
        endGame()
        return true
    }
    if (player.gameBoard.shipsSunk()) {
        gameOver = true
        winner = "computer"
        displayMessage(`${winner}has Won`)
        endGame()
        return true
    }
    return false
}
function endGame(){
    if (winner === "player") {
        displayMessage("You Win! All enemy ships destroyed!")
    } else {
        displayMessage("Computer Wins! All your ships were destroyed!")
    }
}
export function getPlayer(){
    return player
}
export function getComputer(){
    return computer
}
export function getCurrentTurn(){
    return currentTurn
}