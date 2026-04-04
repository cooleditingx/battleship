import { GameBoard, Ship } from "./Ship.js";
let ship = new Ship(3,0)
let hits = ship.hit()
test("hits should be incrementing", ()=> {
    expect(hits).toBe(1)
})
let isSunk = ship.isSunk()
test("whether the ship is sunk or not", ()=> {
    expect(isSunk).toBe(false)
    hits = ship.hit()
    hits = ship.hit()
    isSunk = ship.isSunk()
    expect(isSunk).toBe(true)
})

