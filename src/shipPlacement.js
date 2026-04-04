import { Ship } from "./Ship.js"

export function PlaceRanShips(gameBoard) {
    const shipLengths = [5, 4, 3, 3, 2]
    
    shipLengths.forEach(length => {
        let placed = false
        
        while (!placed) {
            const coords = generateRandCoor(length)
            placed = gameBoard.placeShip(new Ship(length), coords)
        }
    })
}
function generateRandCoor(length) {
    const isHorizontal = Math.random() < 0.5
    const coords = []
    let row, col
    if (isHorizontal) {
        row = Math.floor(Math.random() * 10)
        col = Math.floor(Math.random() * (11 - length))  // Ensure it fits
        for (let i = 0; i < length; i++) {
            coords.push([row, col + i])
        }
    } else {
        row = Math.floor(Math.random() * (11 - length))  // Ensure it fits
        col = Math.floor(Math.random() * 10)
        
        for (let i = 0; i < length; i++) {
            coords.push([row + i, col])
        }
    }
    return coords
}