import { GameBoard } from "./GameBoard.js"

export class Players {
    constructor(playertype){
        this.gameBoard = new GameBoard()
        this.playertype = playertype
    }
    makeRandomAttack(enemyGameBoard){
        let valid = false
        let coordinates = []
        while (!valid){
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            coordinates = [x, y]
            let attacked = false
            enemyGameBoard.missedAttacks.forEach(coor => {
                if (coor[0] === coordinates[0] && coor[1] === coordinates[1]){
                    attacked = true
                }
            })
            enemyGameBoard.hits.forEach(coor => {
                if (coor[0] === coordinates[0] && coor[1] === coordinates[1]){
                    attacked = true
                }
            })
            if (!attacked){
                valid = true
            }
        }
        return enemyGameBoard.receiveAttack(coordinates)
    }
}