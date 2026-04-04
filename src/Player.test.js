import { Players } from "./Player";
import { Ship } from "./Ship";

let player = new Players("computer")
test("Players stores player type correctly ", ()=> {
    expect(player.playertype).toBe("computer") 
})
let player2 = new Players("human")
test("Players stores player type correctly ", ()=> {
    expect(player2.playertype).toBe("human") 
})
let ship = new Ship(3,0)
player.gameBoard.placeShip(ship,[[0,0],[0,1],[0,2]])
test("players dont share the same gameboard",()=>{
    expect(player.gameBoard.shipArr.length).toBe(1)
    expect(player2.gameBoard.shipArr.length).toBe(1)//it should be 0 before load next test
})
let ship1 = new Ship(3,0)
player2.gameBoard.placeShip(ship,[[0,0],[0,1],[0,2]])
test("computer is making random attacks", ()=> {
    expect(player.makeRandomAttack(player2.gameBoard)).toBe(false)
    expect(player2.gameBoard.missedAttacks.length).toBe(1)
    expect(player2.gameBoard.hits.length).toBe(0)
})