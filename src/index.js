import { createGameboard, renderAllShips, eventHandlers, updateCell } from "./render.js"
import { initializeGame, handlesPlayerAttacks, getPlayer, getComputer } from "./Gameplay.js"
import {} from "./style.css"
const playergameboard = document.getElementById("playergameboard")
const computergameboard = document.getElementById("computergameboard")
initializeGame()
createGameboard(playergameboard,"playergameboard")
createGameboard(computergameboard,"computergameboard")
const player = getPlayer()
const computer = getComputer()
renderAllShips(player.gameBoard, playergameboard)
renderAllShips(computer.gameBoard, computergameboard)
eventHandlers(computergameboard, (coordinates) => {
    const result = handlesPlayerAttacks(coordinates)
    if (result !== null) {
        const row = coordinates[0]
        const col = coordinates[1]
        updateCell(row, col, result, computergameboard)
    }
})
let restart = document.getElementById("restart")
let popup = document.getElementById("pop-up")
restart.addEventListener("click", ()=> {
    popup.close()
    window.location.reload()
})